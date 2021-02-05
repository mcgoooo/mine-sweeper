;(async function () {
  const { Octokit } = require("@octokit/rest")
  const octokit = new Octokit({ auth: process.env.GH_TOKEN })

  const {
    prCommentsIncludeText,
    enviromentLocationComment,
    fullDomainName,
    prOptions,
  } = require("./pr-utils")

  try {
    const { data: comments } = await octokit.issues.listComments(prOptions())
    const hasComment = prCommentsIncludeText(comments, fullDomainName())
    console.log("adding comment to github with the review environment")
    if (hasComment) return console.log("already commented 🚀")

    octokit.issues.createComment({
      owner: "mcgoooo",
      repo: process.env.CIRCLE_PROJECT_REPONAME,
      issue_number: process.env.PR_NUMBER,
      body: enviromentLocationComment(fullDomainName()),
    })
    console.log("comment created")
  } catch (error) {
    console.log(error)
  }
})()
