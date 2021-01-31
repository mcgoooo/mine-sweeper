const ecs = require('@aws-cdk/aws-ecs');
const ec2 = require('@aws-cdk/aws-ec2');
const cdk = require('@aws-cdk/core');
const { Certificate } = require('@aws-cdk/aws-certificatemanager');
const { lookupZone: getZone } = require('./helpers/aws/route53')
const { NextSiteFromLocalDockerFile } = require('./helpers/aws/fargate')

const envCheck = require('./scripts/envcheck.js')
const requriedEnv = [
  'APP_NAME',
  'CIRCLE_BRANCH',
  'DEPLOY_ENVIRONMENT_CONTEXT',
  'ROUTE_53_ZONE_ID',
  'DOMAIN_NAME',
  'CERTIFICATE_ARN'
]
envCheck(requriedEnv)

const ENV = process.env
const URI_SAFE_BRANCH = process.env.CIRCLE_BRANCH.replace(/[^A-Za-z0-9-\/]/g,'')
const STACK_URI = `${ENV.APP_NAME}-${ENV.DEPLOY_ENVIRONMENT_CONTEXT}-${URI_SAFE_BRANCH}`
const DOMAIN_NAME =  `${URI_SAFE_BRANCH}.${ENV.DEPLOY_ENVIRONMENT_CONTEXT}.${ENV.APP_NAME}`

class MinesweeperSiteStack extends cdk.Stack {
  constructor(parent, name, props) {
    super(parent, name, props);
    this.cluster = new ecs.Cluster(this, 'minesweeper-review-cluster', { vpc: this.setVpc() });
    this.setDomainUp()

    this.dockerfileLocation = "../"
    this.nextSite = new NextSiteFromLocalDockerFile(this, 'minesweeper-review-next');
  }

  setVpc(){
    // i think this should be outside the app, need to research more
    return this.vpc = new ec2.Vpc(this, 'minesweeper-review-vpc', { maxAzs: 2 });
  }

  setDomainUp(){
    this.certificate = Certificate.fromCertificateArn(this,
      'subdomain-cert',
      ENV.CERTIFICATE_ARN
    )
    this.zone = getZone(this, ENV.ROUTE_53_ZONE_ID, DOMAIN_NAME)
    this.domainName = DOMAIN_NAME
  }
}

const app = new cdk.App();
const stack = new MinesweeperSiteStack(app, STACK_URI);
cdk.Tags.of(stack).add("review-environment", "true")

app.synth();
