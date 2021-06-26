const cheerio = require('cheerio');
const TurndownService = require('turndown')()

const { BODY_SELECTOR } = require('./utils')

const IMAGES_ROW = `section-inner sectionLayout--outsetRow`
const copyParentForImageRows = (content, node, options) => {
  const $ = cheerio.load("")
  const element = $(node.outerHTML);
  let shouldCopy = false;

  if(element.attr('class') === IMAGES_ROW){
    element.children().each( (index, child) => {
      const {tagName} = child;

      if(index === 0 && tagName === 'figure') shouldCopy = true;
      if(tagName !== 'figure')
        shouldCopy = false;
    })
  }

  return shouldCopy ? node.outerHTML : content
}

const html2Markdown = (content, h1h2, h2h3) => {
  const $ = cheerio.load(content, {recognizeSelfClosing: true, xmlMode: true})

  let body = $(BODY_SELECTOR).html()
  body = `<body>${body}</body>`

  const title = $(body).find('h3').first().text()
  let counter = 1;

  $('img').replaceWith( function(){
    const src = $(this).attr('src');
    let alt = $(this).attr('alt');
    const figcaption = $(this).parent().find('figcaption').first().text()
    
    if(!alt){
      $(this).attr('alt', figcaption.length > 0 ? figcaption : `Image ${counter++} – ${title}`);
    }

    alt = $(this).attr('alt');

    // console.log($(this).html())

    return this;
  })

  body = $(BODY_SELECTOR).html()

  TurndownService.addRule('Row', {
    filter: ['div'],
    replacement: copyParentForImageRows
  })

  TurndownService.keep(['figure', 'pre'])
  
  const markdown = TurndownService
    .turndown(body)

  if(h1h2){
    return markdown
      .replaceAll('####', '##') // original HTML file has title as H3 and sub sections as H4
      .replaceAll('###', '#') // change it to H1 and H2 respectively
  }

  if(h2h3){
    return markdown
      .replaceAll('####', '###') // original HTML file has title as H3 and sub sections as H4
      .replaceAll('###', '##') // change it to H1 and H2 respectively
  }

  return markdown
}

module.exports.html2Markdown = html2Markdown