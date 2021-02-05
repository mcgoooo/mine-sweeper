const ENV = process.env
const {
  prCommentsIncludeText,
  enviromentLocationComment,
} = require("./comments")

const safeBranchName = () => ENV.CIRCLE_BRANCH.replace(/[^A-Za-z0-9-\/]/g, "")

const fullDomainName = () =>
  [
    safeBranchName(),
    ENV.DEPLOY_ENVIRONMENT_CONTEXT,
    ENV.APP_NAME,
    ENV.DOMAIN_NAME,
  ].join(".")

const stackUri = () =>
  [ENV.APP_NAME, ENV.DEPLOY_ENVIRONMENT_CONTEXT, safeBranchName()].join("-")

const prOptions = () => ({
  owner: "mcgoooo",
  repo: ENV.CIRCLE_PROJECT_REPONAME,
  issue_number: ENV.PR_NUMBER,
})

module.exports = {
  safeBranchName,
  stackUri,
  fullDomainName,
  prOptions,
  prCommentsIncludeText,
  enviromentLocationComment,
}
