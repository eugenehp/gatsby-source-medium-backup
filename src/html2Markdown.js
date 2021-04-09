const cheerio = require('cheerio');
const TurndownService = require('turndown')()

const { BODY_SELECTOR } = require('./utils')

const html2Markdown = (content) => {
  const $ = cheerio.load(content)

  const body = $(BODY_SELECTOR).html()

  // TODO: add images aligments like in medium
  TurndownService.keep(['figure'])
  
  const markdown = TurndownService
    .turndown(body)
    .replaceAll('####', '##') // original HTML file has title as H3 and sub sections as H4
    .replaceAll('###', '#') // change it to H1 and H2 respectively

  return markdown
}

module.exports.html2Markdown = html2Markdown