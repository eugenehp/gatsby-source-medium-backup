const { HTML_POST_QUALIFIER, logger } = require('./utils')
const { parseFile } = require('./parseFile')
const { html2Markdown } = require('./html2Markdown')
const { exportMarkdown } = require('./exportMarkdown')

const processPost = async (filename, content, destination, prefix, h1h2, h2h3, remove) => {
  const IS_POST = content.indexOf(HTML_POST_QUALIFIER) >= 0;

  if(IS_POST){
    const [basename, ext] = filename.split('.');
    const metadata = parseFile(basename, content, prefix);
    const markdown = html2Markdown(content, h1h2, h2h3);

    let filteredMarkdown = markdown

    remove.map( line => {
      filteredMarkdown = filteredMarkdown.split(line).join('')
    })

    const result = exportMarkdown(destination, basename, metadata, filteredMarkdown)
    if(result){
      logger(`\u001b[32msuccess\u001b[39m Converted medium post ${filename}.`)
      return result
    }
  }else{
    logger(`\u001b[31mskipped\u001b[39m This is not a medium post ${filename}, it's not a post.`)
  }

  return false;
}

module.exports.processPost = processPost