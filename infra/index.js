const envCheck = require("./scripts/envcheck.js")
const cdk = require("@aws-cdk/core")
const MinesweeperSiteStack = require("./stacks/minesweeper")
const ClusterStack = require("./stacks/cluster")

const path = require("path")
const { stackUri, fullDomainName } = require("./scripts/pr-utils")
const ENV = process.env

envCheck([
  "APP_NAME", // minesweeper
  "CIRCLE_BRANCH", // branch name
  "DEPLOY_ENVIRONMENT_CONTEXT", // review, staging, production etc.
  "ROUTE_53_ZONE_ID", // id of your domain
  "DOMAIN_NAME", // mcgoooo.net
  "CERTIFICATE_ARN", // ARN of the fullDomainName() from ACM, see comment below
  "DELETE_REVIEW_APPS_AFTER_IN_MINUTES", // delete review apps after they havent been updated for
  "PR_NUMBER", // pr number on github, so we can comment with the deploy url
  "GH_TOKEN", // github api token
  "CIRCLE_PROJECT_REPONAME", // mine-sweeper
])

// For this to work, you need to have your certificate within route53, and setup
// via ACM, a wildcard certificate. the wildcard setup for review envrionments
// on minesweeper is `*.review.minesweeper.mcgoooo.net`.
// this can not be done automatically unfortunately, from a cursory glance.
// https://aws.amazon.com/blogs/security/easier-certificate-validation-using-dns-with-aws-certificate-manager/
const options = {
  certificateArn: ENV.CERTIFICATE_ARN,
  route53ZoneId: ENV.ROUTE_53_ZONE_ID,
  rootDomainName: ENV.DOMAIN_NAME,
  stackUri: stackUri(),
  fullDomainName: fullDomainName(),
  dockerFile: path.resolve(__dirname, `../minesweeper-fargate/`),
}

const app = new cdk.App()
const baseInfra = new ClusterStack(app, "minesweeper-review")

const stack = new MinesweeperSiteStack(app, stackUri(), {
  ...options,
  cluster: baseInfra.cluster,
})

cdk.Tags.of(stack).add("review-environment", "true")
cdk.Tags.of(baseInfra).add("review-environment-infra", "true")
app.synth()
