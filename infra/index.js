const ecs = require('@aws-cdk/aws-ecs');
const route53 = require('@aws-cdk/aws-route53');
const core =  require('@aws-cdk/core');
const path = require('path');
const ecr = require('@aws-cdk/aws-ecr');
const ec2 = require('@aws-cdk/aws-ec2');
const ecs_patterns = require('@aws-cdk/aws-ecs-patterns');
const cdk = require('@aws-cdk/core');
const app = new cdk.App();
const envCheck = require('./scripts/envcheck.js')
const requriedEnv = [
  'APP_NAME',
  'CIRCLE_BRANCH',
  'DEPLOY_ENVIRONMENT_CONTEXT',
  'ROUTE_53_ZONE_ID',
  'DOMAIN_NAME',
]
envCheck(requriedEnv)

const APP_NAME = process.env.APP_NAME
const BRANCH_NAME = process.env.CIRCLE_BRANCH.replace(/[^A-Za-z0-9]/g,'')
const CONTEXT = process.env.DEPLOY_ENVIRONMENT_CONTEXT
const ROUTE_53_ZONE_ID = process.env.ROUTE_53_ZONE_ID
const DOMAIN_NAME =  process.env.DOMAIN_NAME

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

 class NextSiteFromLocalDockerFile extends core.Construct {
  constructor(parent, name) {
    super(parent, name)
    const localImage = getContainerfromLocalCode(DOCKERFILE_LOCATION)
    fargateDeploy(localImage, parent, {
      domainZone: parent.zone,
      domainName: parent.domainName
    })
  }
}

class MinesweeperSiteStack extends cdk.Stack {
  constructor(parent, name, props) {
    super(parent, name, props);
    this.vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 2 });
    this.domainName = `${CONTEXT}.${BRANCH_NAME}.${APP_NAME}`
    this.cluster = new ecs.Cluster(this, 'Cluster', { vpc: this.vpc });
    this.zone = lookupZone(this, ROUTE_53_ZONE_ID, DOMAIN_NAME)
    this.nextSite = new NextSiteFromLocalDockerFile(this, 'NextSite');
  }
}

const stack = new MinesweeperSiteStack(app, STACK_URI);

if (isReview) cdk.Tags.of(stack).add("review-environment", "true")
if (isReview) cdk.Tags.of(stack).add("ephemeral-deletable", "true")

app.synth();
