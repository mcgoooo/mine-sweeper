
const core =  require('@aws-cdk/core');
const ecs_patterns = require('@aws-cdk/aws-ecs-patterns');
const path = require('path');

const albFargate = ecs_patterns.ApplicationLoadBalancedFargateService

class NextSiteFromLocalDockerFile extends core.Construct {
  constructor(parent, name) {
    super(parent, name)
    const dockerFilePath = path.resolve(__dirname, parent.dockerfileLocation)
    const localImage = ecs.ContainerImage.fromAsset(dockerFilePath)
    fargateDeploy(localImage, parent, {
      domainZone: parent.zone,
      domainName: parent.domainName,
      certificate: parent.certificate
    })
  }
}

const fargateDeploy = (image, stack, { domainZone, domainName, certificate, drain_timeout = 60 } ) => {
  const options = {
    cluster: stack.cluster,
    taskImageOptions: { image },
    domainZone,
    domainName,
    certificate
  }
  const deploy = new albFargate(stack, domainName, options);
  SetContainerDraintimeout(deploy, drain_timeout)
  return deploy
}


const SetContainerDraintimeout = (deploy, drain_timeout) => {
  deploy.targetGroup.setAttribute('deregistration_delay.timeout_seconds', drain_timeout)
}

getContainerfromLocalCode = (filePath) => {
  return ecs.ContainerImage.fromAsset(path.resolve(__dirname, filePath))
}




module.exports = {
  NextSiteFromLocalDockerFile
}
