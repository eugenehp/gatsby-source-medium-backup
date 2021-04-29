const fs = require('fs')
const unzipper = require('unzipper')

const getPostsFromZip = async (source, processPostFn) => {
  await fs.createReadStream(source)
  .pipe(unzipper.Parse())
  .on('entry', async (entry) => {
    if (
      entry.path.startsWith('posts/')
      && !entry.path.startsWith('posts/draft_') // don't process drafts
    ) {
      const filename = entry.path.replace('posts/', '')
      await processPostFn(filename, entry.buffer())
    } else {
      entry.autodrain();
    }
  })
  .promise()
}

module.exports.getPostsFromZip = getPostsFromZip