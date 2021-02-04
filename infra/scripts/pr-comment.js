;(async function () {
  const { Octokit } = require("@octokit/rest")
  const comment = `bleep bloop bloop: i am a bot
  @mcgoooo's custom aws review enviroment is [here](https://${process.env.CIRCLE_BRANCH}.review.minesweeper.mcgoooo.net)
  the review enviroment will self destruct after not being updated for two hours as @mcgoooo is cheap :rocket:`
  const options = {
    owner: "mcgoooo",
    repo: "mine-sweeper",
    issue_number: 34,
  }
  try {
    const octokit = new Octokit({ auth: process.env.GH_TOKEN })
    const response = await octokit.issues.listComments(options)
    const hasEnvironmentComment = response.data.some((el) =>
      el.body.includes("bleep bloop")
    )
    if (hasEnvironmentComment)
      return console.log("not creating comment, as we have it already")
    octokit.issues.createComment({
      ...options,
      body: comment,
    })
    console.log("comment created")
  } catch (error) {
    console.log(error)
  }
})()
