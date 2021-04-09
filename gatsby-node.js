const fs = require('fs')
const { processPost } = require('./src/processPost')
const { getPostsFromZip } = require('./src/getPostsFromZip')
const { setVerbose, green, UTF8 } = require('./src/utils');

exports.onPreInit = async (_, pluginOptions) => {
  const before = new Date().getTime();
  const {source, destination} = pluginOptions

  if(pluginOptions.verbose){
    setVerbose(pluginOptions.verbose)
  }

  // create destination folder if it doesn't exist
  if(!fs.existsSync(destination))
    fs.mkdirSync(destination)

  let counter = 0;
  let markdownPagesCreated = 0;

  await getPostsFromZip(source, async (filename, buffer) => {
    const content = (await buffer).toString(UTF8)
    if(await processPost(filename, content, destination)) {
      markdownPagesCreated++
    }
    counter++
  })

  const after = new Date().getTime();
  const timePassed = (after-before)/1000 // in seconds

  console.log(`${green('success')} ${counter} medium post were processed. Created ${markdownPagesCreated} markdown pages - ${timePassed}s`)
}