const envCheck = require('./scripts/envcheck.js');
const cdk = require('@aws-cdk/core');
const MinesweeperSiteStack = require('./stacks/minesweeper');
const path = require('path');

envCheck([
  'APP_NAME',
  'CIRCLE_BRANCH',
  'DEPLOY_ENVIRONMENT_CONTEXT',
  'ROUTE_53_ZONE_ID',
  'DOMAIN_NAME',
  'CERTIFICATE_ARN'
]);

const ENV = process.env;
// Make the branch URL safe
const URI_SAFE_BRANCH = ENV.CIRCLE_BRANCH.replace(/[^A-Za-z0-9-\/]/g, '');
const STACK_URI = `${ENV.APP_NAME}-${ENV.DEPLOY_ENVIRONMENT_CONTEXT}-${URI_SAFE_BRANCH}`;

// For this to work, you need to have your certificate within route53, and setup
// via acm, a wildcard certificate. the wildcard setup for review branches
// on minesweeper as `*.review.minesweeper.mcgoooo.net` and you then use that as
// the certificate arn. this can not be done automatically unfortunately, from
// a cursory glance.

const options = {
  domainName: `${URI_SAFE_BRANCH}.${ENV.DEPLOY_ENVIRONMENT_CONTEXT}.${ENV.APP_NAME}.${ENV.DOMAIN_NAME}`,
  certificateArn: ENV.CERTIFICATE_ARN,
  route53ZoneId: ENV.ROUTE_53_ZONE_ID,
  rootDomainName: ENV.DOMAIN_NAME,
  stackUri: STACK_URI,
  dockerFile: path.resolve(__dirname, `../`)
};

const app = new cdk.App();
const stack = new MinesweeperSiteStack(app, STACK_URI, options);
cdk.Tags.of(stack).add('review-environment', 'true');

app.synth();
