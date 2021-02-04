# minesweeper infra

infra for review app environments for the minesweeper codebase


### github comment on review app deploy
![Screenshot 2021-02-04 at 19 01 24](https://user-images.githubusercontent.com/248888/106942509-2a382580-671c-11eb-8f94-8a3b1536abf5.png)

### review app url setup
![Screenshot 2021-02-04 at 19 01 33](https://user-images.githubusercontent.com/248888/106942514-2c01e900-671c-11eb-858e-a6240fe74c76.png)

### circleci tasks, including auto deletion
![Screenshot 2021-02-04 at 19 06 35](https://user-images.githubusercontent.com/248888/106942520-2dcbac80-671c-11eb-8b70-2774c5741ae9.png)


### motivation

My old [CEO](https://twitter.com/cameronp) told me, companies that work well have _individual problems and shared code_ and ones that don't have _shared problems and individual code_ giving developers real life aws sandboxes is part of that for me.

another part of the motivation is to show the powers of aws CDK, and a learnings for myself. I have spent a lot of time in my life getting similar stacks built, so it would be good to have a working example, top to bottom to show, and understand myself how to put all the constituent parts together.

### what does it do

it uses amazon cdk, to make an entirely new stack per deployment. It then
will also, [delete every review environment](https://github.com/mcgoooo/mine-sweeper/blob/master/infra/stack-deletion/review-app-older-than.js#L17:L17) stack that is more than two hours
since last deployment. this is triggered via [circleci](https://github.com/mcgoooo/mine-sweeper/blob/master/.circleci/config.yml#L58:L59) and that runs on cron every hour.

the review apps have a consistent url structure `<branch_name>.review.minesweeper.net`, and apart from setting up the acm cname, everything is fully automatic, it generally creates a whole new stack in under ten minutes.

it deploys the local code, via the cdk toolkit as an image, it will automatically upload the docker image from local, and then start a new fargate cluster, vpc, application load balancer, route 53 cname etc

### caveats

The app is currently setup in a way where it will make a seperate cluster, and a seprate vpc per review app, this may not be what you want, but it is done this way for ease of use and understanding of what is going on.

this would not work on a production environment, and you should really have a seperate script that creates them. while these scripts can easily be adjusted, its been built for review apps and clarity and brevity.

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
