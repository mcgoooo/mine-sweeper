const ec2 = require('@aws-cdk/aws-ec2');
const ecr = require('@aws-cdk/aws-ecr');

const ecs = require('@aws-cdk/aws-ecs');

const ecs_patterns = require('@aws-cdk/aws-ecs-patterns');
const cdk = require('@aws-cdk/core');
const path = require('path');

// TODO

// this will be used for taggin based deploy's, but for the moment
// quick and dirty via initial-setup while we get CI working

// const app = new cdk.App();
// const stack = new cdk.Stack(app, 'minesweeper');
// const repository = new ecr.Repository(stack, 'minesweeper-repo', {
//   imageScanOnPush: false
// });


// const image = new ecs.EcrImage(repository, 'deploy-0')

// // todo implement tagging
// // repository.addLifecycleRule({ tagPrefixList: ['prod'], maxImageCount: 9999 });
// // repository.addLifecycleRule({ maxImageAge: cdk.Duration.days(30) });

// const vpc = new ec2.Vpc(stack, 'MyVpc', { maxAzs: 2 });
// const cluster = new ecs.Cluster(stack, 'Cluster', { vpc });


// new ecs_patterns.ApplicationLoadBalancedFargateService(stack, "FargateService", {
//   cluster,
//   taskImageOptions: {
//     image
//   },
// });

// app.synth();
