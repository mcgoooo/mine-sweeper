const prCommentsIncludeText = (comments, text) =>
  comments.some((el) => el.body.includes(text))

const enviromentLocationComment = (url) => {
  const minutes = process.env.DELETE_REVIEW_APPS_AFTER_IN_MINUTES
  return `bleep bloop bloop: i am a bot
  @mcgoooo's custom aws review enviroment is [here](https://${url})
  the review enviroment will self destruct after not being updated for ${minutes}
  minutes as @mcgoooo is cheap :rocket:`
}

module.exports = {
  prCommentsIncludeText,
  enviromentLocationComment,
}
