;(async function () {
  const AWS = require("aws-sdk")
  const envCheck = require("../scripts/envcheck")
  const {
    deleteStack,
    FilterStacksByTags,
    FilterStacksNotUpdatedInTheLast,
    logStacks,
  } = require("../helpers/aws/cloudformation")

  try {
    envCheck(["DELETE_REVIEW_APPS_AFTER_IN_MINUTES"])

    var cloudformation = new AWS.CloudFormation({
      region: process.env.AWS_DEFAULT_REGION,
    })
    const { Stacks } = await cloudformation.describeStacks({}).promise()
    const reviewApps = FilterStacksByTags(Stacks, "review-environment", "true")

    const oldReviewApps = FilterStacksNotUpdatedInTheLast(
      parseInt(process.env.DELETE_REVIEW_APPS_AFTER_IN_MINUTES),
      reviewApps
    )
    if (oldReviewApps.length > 0) {
      console.log("REVIEW APPS BEING DELETED")
      logStacks(oldReviewApps)
      oldReviewApps.forEach((ra) => deleteStack(ra.StackName, cloudformation))
    } else {
      console.log("no old review apps to delete")
    }
  } catch (error) {
    console.log(error)
  }
})()
