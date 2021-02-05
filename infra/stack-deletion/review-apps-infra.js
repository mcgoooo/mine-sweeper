;(async function () {
  const AWS = require("aws-sdk")
  const envCheck = require("../scripts/envcheck")
  const {
    deleteStack,
    FilterStacksByTags,
    logStacks,
  } = require("../helpers/aws/cloudformation")

  try {
    var cloudformation = new AWS.CloudFormation({
      region: process.env.AWS_DEFAULT_REGION,
    })
    const { Stacks } = await cloudformation.describeStacks({}).promise()
    const reviewInfra = FilterStacksByTags(
      Stacks,
      "review-environment-infra",
      "true"
    )

    if (reviewInfra.length > 0) {
      console.log("REVIEW APPS INFRA BEING DELETED")
      logStacks(reviewInfra)
      reviewInfra.forEach((ra) => deleteStack(ra.StackName, cloudformation))
    } else {
      console.log("no old review infra to delete")
    }
  } catch (error) {
    console.log(error)
  }
})()
