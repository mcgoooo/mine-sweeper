const initial = require('./scripts/initial-setup');
const ecs = require('@aws-cdk/aws-ecs');
const path = require('path');

const localImage = ecs.ContainerImage.fromAsset(path.resolve(__dirname, '../'))
initial.fargateDeploy(localImage)

initial.app.synth();
