const fs = require('fs')
const { UTF8 } = require('./utils')

const exportMarkdown = (destination, basename, metadata, markdown) => {
  const destinationFile = `${destination}/${basename}.md`

  let markdownData = "---\n"
  Object.keys(metadata).map( key => {
    value = metadata[key]
    markdownData += `${key}: "${value}"\n`
  })
  markdownData += "---\n\n"
  markdownData += markdown

  try{
    fs.writeFileSync(destinationFile, markdownData, UTF8)
    return true
  }catch(err){
    console.log(`Can't write markdown file to ${destinationFile}`, err)
  }

  return false
}

module.exports.exportMarkdown = exportMarkdown