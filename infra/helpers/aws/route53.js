const route53 = require('@aws-cdk/aws-route53');

const lookupZone = (core, id, name) => {
  return route53.HostedZone.fromHostedZoneAttributes(core, 'Zone', {
    hostedZoneId: id,
    zoneName: name
  })
}

module.exports = {
  lookupZone
}
