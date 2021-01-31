(async function () {
  const AWS = require('aws-sdk');
  const {
    deleteStack,
    FilterStacksByTags
  } = require('./helpers/cloudformation')

  var cloudformation = new AWS.CloudFormation({region: process.env.AWS_DEFAULT_REGION})
  const { Stacks } = await cloudformation.describeStacks({}).promise()
  const reviewApps = FilterStacksByTags(Stacks, 'review-environment','true')
  console.log('REVIEW APPS BEING DELETED')
  console.log(reviewApps.map((stack)=>({
    name: stack.StackName,
    tags: stack.Tags.map((tag)=>`${tag.Key} - ${tag.Value}`)
  })))
  reviewApps.forEach((ra)=> deleteStack(ra.StackName, cloudformation))
})();
