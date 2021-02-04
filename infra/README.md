# minesweeper infra

This is the review app environments for the minesweeper codebase, which was mainly an excuse to play about with amazon cdk, and to make what is close to my preferred deployment environment.

### motivation

By this, in an ideal world, a developer has a new stack per pull request for me. this enables developers more freedom to solve the problems at hand. ultimately, sometimes it is valuable to be able to boot up the whole stack, and not just rely on contract testing etc, and perfect world solutions.

It also helps product engineers show a solution to a problem across the whole stack and for prototyping. I strongly believe that the microservice world sometimes makes it harder for product and design, as it is hard to prototype across the whole stack.

My old [CEO](https://twitter.com/cameronp) told me, companies that work well have _individual problems and shared code_ and ones that don't have _shared problems and individual code_ giving developers sandboxes is part of that for me.

another part of the motivation is to show the powers of aws CDK, and a learnings for myself. I have spent a lot of time in my life getting simialr stacks built, so it would be good to have a working example, top to bottom to show.

### what does it do

it uses amazon cdk, to make an entirely new stack per deployment. It then
will also, [delete every review environment](https://github.com/mcgoooo/mine-sweeper/blob/master/infra/stack-deletion/review-app-older-than.js#L17:L17) stack that is more than two hours
since last deployment. this is triggered via [circleci](https://github.com/mcgoooo/mine-sweeper/blob/master/.circleci/config.yml#L58:L59) and that runs on cron every hour.

the review apps have a consistent url structure, and apart from setting up the acm cname, everything is fully automatic.

it deploys the local code, via the cdk toolkit as an image, it will automatically upload the docker image from local, and then start a new fargate cluster, vpc, application load balancer, route 53 cname etc

### caveats

The app is currently setup in a way where it will make a seperate cluster, and a seprate vpc per review app, this may not be what you want, but it is done this way for ease of use and understanding of what is going on.

this would not work on a production environment, and you should really have a seperate script that creates them. while these scripts can easily be adjusted, its been built for review apps and clarity and brevity.

### how to get started

please check the index file, this lists all the things needed for a deployment, and is also commented. Make sure to have the [aws cdk toolkit](https://github.com/aws/aws-cdk) installed and run cdk bootstrap, as well as the [aws sdk](https://aws.amazon.com/sdk-for-javascript/)

to deploy once you have all this simply run `cdk deploy` and to destroy the stack run `cdk destroy`, pelase check out the circleci [config](https://github.com/mcgoooo/mine-sweeper/blob/master/.circleci/config.yml) as it has mainly been setup to work there
