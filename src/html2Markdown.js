const cheerio = require('cheerio');
const TurndownService = require('turndown')()

const { BODY_SELECTOR } = require('./utils')

const IMAGES_ROW = `section-inner sectionLayout--outsetRow`
const copyParentForImageRows = (content, node) => {
  const element = $(node.outerHTML);
  let shouldCopy = false;

  if(element.attr('class') === IMAGES_ROW){
    console.log(`div.${IMAGES_ROW}`)
    element.children().each( (index, child) => {
      const {tagName} = child;

      if(index === 0 && tagName === 'figure') shouldCopy = true;
      console.log('\t', tagName)
      if(tagName !== 'figure')
        shouldCopy = false;
    })
  }

  return shouldCopy ? node.outerHTML : content
}

const html2Markdown = (content) => {
  const $ = cheerio.load(content)

  const body = $(BODY_SELECTOR).html()

  TurndownService.addRule('Row', {
      filter: ['div'],
      replacement: copyParentForImageRows
  })

  TurndownService.keep(['figure'])
  
  const markdown = TurndownService
    .turndown(body)
    .replaceAll('####', '##') // original HTML file has title as H3 and sub sections as H4
    .replaceAll('###', '#') // change it to H1 and H2 respectively

  return markdown
}

module.exports.html2Markdown = html2Markdown