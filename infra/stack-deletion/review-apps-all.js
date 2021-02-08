;(async function () {
  const AWS = require("aws-sdk")
  const {
    deleteStack,
    FilterStacksByTags,
    logStacks,
  } = require("../helpers/aws/cloudformation")

  var cloudformation = new AWS.CloudFormation({
    region: process.env.AWS_DEFAULT_REGION,
  })
  const { Stacks } = await cloudformation.describeStacks({}).promise()
  const reviewApps = FilterStacksByTags(Stacks, "review-environment", "true")

  if (reviewApps.length > 0) {
    console.log("REVIEW APPS BEING DELETED")
    logStacks(reviewApps)
    reviewApps.forEach((ra) => deleteStack(ra.StackName, cloudformation))
  } else {
    console.log("no old review apps to delete")
  }
})()
