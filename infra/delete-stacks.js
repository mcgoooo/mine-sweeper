const AWS = require('aws-sdk')

var cloudformation = new AWS.CloudFormation({region: 'us-east-1'});


cloudformation.describeStacks({}, function(err, data) {
  if (err) {
    console.log(err);
    process.exit(1)
  } else {
    const stacks = data.Stacks
    const reviewApps = (stacks.filter((stack)=>
      stack.Tags &&
      stack.Tags.length != 0 &&
      stack.Tags.filter(
        (tag)=> tag.Key == 'review-environment' && tag.Value == 'true'
      )
    ))
    console.log('REVIEW APPS TO BE DELETED')
    console.log(reviewApps)
    console.log('REVIEW APPS WILL BE DELETED in twenty seconds')

    reviewApps.forEach((ra)=>{
        cloudformation.deleteStack({StackName: ra.StackName},(err, data)=>{
          if (err) {
            console.log(err);
            process.exit(1)
          } else {
            console.log(data)
          }
        })
      })

  }
});

(async () => {
  try {
      var text = await main();
      console.log(text);
  } catch (e) {
      // Deal with the fact the chain failed
  }
})();
