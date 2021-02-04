const route53 = require("@aws-cdk/aws-route53")

const getZone = (stack, id, name) => {
  return route53.HostedZone.fromHostedZoneAttributes(stack, "Zone", {
    hostedZoneId: id,
    zoneName: name,
  })
}

module.exports = {
  getZone,
}
