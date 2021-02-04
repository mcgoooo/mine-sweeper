const deleteStack = (StackName, cloudformation) => {
  cloudformation.deleteStack({ StackName }, (err, data) => {
    if (err) {
      console.log(err)
      process.exit(1)
    } else {
      console.log(data)
    }
  })
}

const FilterStacksByTags = (stacks, tagName, tagValue) =>
  stacks.filter(
    (stack) =>
      stack.Tags &&
      stack.Tags.filter((tag) => tag.Key == tagName && tag.Value == tagValue)
        .length > 0
  )

const FilterStacksNotUpdatedInTheLast = (minutes, stacks) => {
  return stacks.filter((stack) => {
    return !lessThanMinutesAgo(minutes, stack.LastUpdatedTime)
  })
}

const lessThanMinutesAgo = (minutes, date) => {
  const HOUR = 1000 * 60 * minutes
  const anHourAgo = Date.now() - HOUR
  return date > anHourAgo
}

const logStacks = (stacks) => {
  console.log(
    stacks.map((stack) => ({
      name: stack.StackName,
      tags: stack.Tags.map((tag) => `${tag.Key} - ${tag.Value}`),
    }))
  )
}

module.exports = {
  deleteStack,
  FilterStacksByTags,
  FilterStacksNotUpdatedInTheLast,
  logStacks,
}
