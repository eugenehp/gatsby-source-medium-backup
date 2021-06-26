const fs = require('fs')
const { processPost } = require('./src/processPost')
const { getPostsFromZip } = require('./src/getPostsFromZip')
const { setVerbose, green, UTF8 } = require('./src/utils');

exports.onPreInit = async (_, pluginOptions) => {
  const before = new Date().getTime();
  const {source, destination} = pluginOptions
  const prefix = pluginOptions['prefix'] ? pluginOptions['prefix'] : null;
  const h1h2 = pluginOptions['h1h2'] ? pluginOptions['h1h2'] : false;
  const h2h3 = pluginOptions['h2h3'] ? pluginOptions['h2h3'] : false;
  const remove = pluginOptions['remove'] ? pluginOptions['remove'] : []

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
    if(await processPost(filename, content, destination, prefix, h1h2, h2h3, remove)) {
      markdownPagesCreated++
    }
    counter++
  })

  const after = new Date().getTime();
  const timePassed = (after-before)/1000 // in seconds

  console.log(`${green('success')} ${counter} medium post were processed. Created ${markdownPagesCreated} markdown pages - ${timePassed}s`)
}