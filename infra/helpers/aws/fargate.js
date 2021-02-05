const ecs = require("@aws-cdk/aws-ecs")
const core = require("@aws-cdk/core")
const ecs_patterns = require("@aws-cdk/aws-ecs-patterns")
const albFargate = ecs_patterns.ApplicationLoadBalancedFargateService

class NextSiteFromLocalDockerFile extends core.Construct {
  constructor(stack, name) {
    super(stack, name)
    this.service = new albFargate(
      stack,
      `${name}-fargate-service`,
      localDockerFileOptions(stack)
    )
    this.service.targetGroup.setAttribute(
      "deregistration_delay.timeout_seconds",
      "10"
    )
  }
}

localDockerFileOptions = (stack) => ({
  ...stack.fargateOptions(),
  taskImageOptions: {
    image: ecs.ContainerImage.fromAsset(stack.dockerFile),
  },
})

module.exports = {
  NextSiteFromLocalDockerFile,
}
