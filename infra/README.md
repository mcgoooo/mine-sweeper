# minesweeper infra

infra for review app environments for the minesweeper codebase

### motivation

My old [CEO](https://twitter.com/cameronp) told me, companies that work well have _individual problems and shared code_ and ones that don't have _shared problems and individual code_ giving developers real life aws sandboxes is part of that for me.

another part of the motivation is to show the powers of aws CDK, and a learnings for myself. I have spent a lot of time in my life getting similar stacks built, so it would be good to have a working example, top to bottom to show, and understand myself how to put all the constituent parts together.

### what does it do

it uses amazon cdk, to make a `minesweeper-review` stack, which has a public vpc and a cluster
it will then make a task per review app, and set up the alb and route53 domain per review app, and use the `minesweeper-review` cluster and stack

It then will also, [delete every review environment](https://github.com/mcgoooo/mine-sweeper/blob/a1521834c5608475d7d85305c0ff8c0581d80659/.circleci/config.yml#L72) stack that is more than two hours since last deployment. this is triggered via circleci and that runs on cron every hour. it will also, at 9pm delete the `minesweeper-review` stack to save money.

the review apps have a consistent url structure `<branch_name>.review.minesweeper.net`, and apart from setting up the acm cname, everything is fully automatic, it generally creates a whole new stack in about five minutes

it deploys the local code, via the cdk toolkit as an image, it will automatically upload the docker image from local, and then start a new fargate cluster, vpc, application load balancer, route 53 cname etc

### caveats

The app is currently setup in a way where it will make a seperate cluster, and a seprate vpc per review app, this may not be what you want, but it is done this way for ease of use and understanding of what is going on.

### how to get started

please check the `index.js` file, this lists all the things needed for a deployment, and is also commented. Make sure to have the [aws cdk toolkit](https://github.com/aws/aws-cdk) installed and run cdk bootstrap, as well as the [aws sdk](https://aws.amazon.com/sdk-for-javascript/)

to deploy once you have all this simply run `cdk deploy` and to destroy the stack run `cdk destroy`, pelase check out the circleci [config](https://github.com/mcgoooo/mine-sweeper/blob/master/.circleci/config.yml) as well.

the following environments are necesarry, and referenced in the `index.js`

```
  "APP_NAME"                        - e.g. minesweeper
  "CIRCLE_BRANCH"                   - the git branch
  "DEPLOY_ENVIRONMENT_CONTEXT"      - review, staging, production
  "ROUTE_53_ZONE_ID"                - id of your domain name in route 53
  "DOMAIN_NAME"                     - e.g. mcgoooo.net
  "CERTIFICATE_ARN"                 - arn of the subdomain CNAME certificate within certificate manager
                                    - example subdomain used here :- `*.review.minesweeper.mcgoooo.net`
```
