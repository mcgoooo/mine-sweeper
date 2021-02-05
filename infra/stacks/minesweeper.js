const ecs = require("@aws-cdk/aws-ecs")
const ec2 = require("@aws-cdk/aws-ec2")
const { Certificate } = require("@aws-cdk/aws-certificatemanager")
const { getZone } = require("../helpers/aws/route53")

const { NextSiteFromLocalDockerFile } = require("../helpers/aws/fargate")
const GetCertFromArn = Certificate.fromCertificateArn
const cdk = require("@aws-cdk/core")

class MinesweeperSiteStack extends cdk.Stack {
  constructor(parent, name, props) {
    super(parent, name, props)
    this.domainName = props.fullDomainName
    this.stackUri = props.stackUri
    this.dockerFile = props.dockerFile
    this.cluster = props.cluster

    this.domainZone = getZone(this, props.route53ZoneId, props.rootDomainName)
    this.certificate = GetCertFromArn(
      this,
      `${this.stackUri}-subdomain-cert`,
      props.certificateArn
    )

    this.nextSite = new NextSiteFromLocalDockerFile(
      this,
      `${this.stackUri}-next`
    )
  }
  fargateOptions() {
    return {
      cluster: this.cluster,
      domainZone: this.domainZone,
      domainName: this.domainName,
      certificate: this.certificate,
    }
  }
}

module.exports = MinesweeperSiteStack
