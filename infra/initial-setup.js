const ecs = require('@aws-cdk/aws-ecs');
const route53 = require('@aws-cdk/aws-route53');
const core =  require('@aws-cdk/core');
const path = require('path');
const ecr = require('@aws-cdk/aws-ecr');
const ec2 = require('@aws-cdk/aws-ec2');
const ecs_patterns = require('@aws-cdk/aws-ecs-patterns');
const cdk = require('@aws-cdk/core');
const app = new cdk.App();


const APP_NAME = 'minesweeper'
const BRANCH_NAME = process.env.CIRCLE_BRANCH.replace(/[^A-Za-z0-9]/g,'')
const CONTEXT = "review"
const ROUTE_53_ZONE_ID = 'Z06041793JVH1PH47I7M9'
const DOMAIN_NAME = "mcgoooo.net"
const DOCKERFILE_LOCATION = '../'
const DRAINING_TIMEOUT = '60'
const STACK_URI = `${APP_NAME}-${CONTEXT}-${BRANCH_NAME}`
const isReview = CONTEXT == 'review'

const SetContainerDraintimeout = (deploy, drain_timeout) => {
  deploy.targetGroup.setAttribute('deregistration_delay.timeout_seconds', drain_timeout)
}

const lookupZone = (core, id, name) => {
  return route53.HostedZone.fromHostedZoneAttributes(core, 'Zone', {
    hostedZoneId: id,
    zoneName: name
  })
}

getContainerfromLocalCode = (filePath) => {
  return ecs.ContainerImage.fromAsset(path.resolve(__dirname, filePath))
}

const albFargate = ecs_patterns.ApplicationLoadBalancedFargateService

const fargateDeploy = (image, stack, { domainZone, domainName} ) => {
  const options = {
    cluster: stack.cluster,
    taskImageOptions: { image },
    domainZone,
    domainName
  }
  const deploy = new albFargate(stack, domainName, options);
  SetContainerDraintimeout(deploy, DRAINING_TIMEOUT)
  return deploy
}



 class NextSite extends core.Construct {
  constructor(parent, name) {
    super(parent, name)
    const localImage = getContainerfromLocalCode(DOCKERFILE_LOCATION)
    this.zone = lookupZone(this, ROUTE_53_ZONE_ID, 'mcgoooo.net')

    const deploy = fargateDeploy(localImage, parent, {
      domainZone: this.zone,
      domainName: `${CONTEXT}.${BRANCH_NAME}.${APP_NAME}`
    })
  }
}


class MinesweeperSiteStack extends cdk.Stack {
  constructor(parent, name, props) {
    super(parent, name, props);
    const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 2 });
    this.cluster = new ecs.Cluster(this, 'Cluster', { vpc });
    this.nextSite = new NextSite(this, 'NextSite');
 }
}

const stack = new MinesweeperSiteStack(app, STACK_URI,{
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
    context: CONTEXT
  }
});
if (isReview) cdk.Tags.of(stack).add("review-environment", "true")


app.synth();
