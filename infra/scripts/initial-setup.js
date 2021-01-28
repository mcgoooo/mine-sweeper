
const ecr = require('@aws-cdk/aws-ecr');
const ecs = require('@aws-cdk/aws-ecs');
const ec2 = require('@aws-cdk/aws-ec2');
const ecs_patterns = require('@aws-cdk/aws-ecs-patterns');
const cdk = require('@aws-cdk/core');
const path = require('path');

const app = new cdk.App();
const stack = new cdk.Stack(app, 'minesweeper');
const repo = new ecr.Repository(stack, 'minesweeper', {
  imageScanOnPush: false
});
const vpc = new ec2.Vpc(stack, 'MyVpc', { maxAzs: 2 });
const cluster = new ecs.Cluster(stack, 'Cluster', { vpc });

const fargateDeploy = (image) => {
  return new ecs_patterns.ApplicationLoadBalancedFargateService(stack, "FargateService", {
    cluster,
    taskImageOptions: {
      image: image
    }
  });
}


exports.app = app
exports.stack = stack
exports.repo = repo
exports.cluster = cluster
exports.fargateDeploy = fargateDeploy


