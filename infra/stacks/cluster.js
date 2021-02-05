const ecs = require("@aws-cdk/aws-ecs")
const ec2 = require("@aws-cdk/aws-ec2")
const cdk = require("@aws-cdk/core")

class ClusterStack extends cdk.Stack {
  constructor(parent, name) {
    super(parent, name)
    this.vpcUri = `${name}-vpc`
    this.clusterUri = `${name}-cluster`

    this.setCluster()
  }

  setCluster() {
    const vpc = new ec2.Vpc(this, this.vpcUri, { maxAzs: 2 })
    this.cluster = new ecs.Cluster(this, this.clusterUri, { vpc })
  }
}

module.exports = ClusterStack
