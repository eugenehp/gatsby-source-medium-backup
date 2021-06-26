const setVerbose = (flag = false) => {
  process.env.DEBUG_MEDIUM = flag
}

const logger = (...data) => process.env.DEBUG_MEDIUM ? console.log(...data) : null
const green = (text) => `\u001b[32m${text}\u001b[39m`
const red = (text) => `\u001b[31m${text}\u001b[39m`

const HTML_POST_QUALIFIER = "graf graf--h3 graf--leading graf--title"
const TITLE_SELECTOR = "h3.graf.graf--h3.graf--leading.graf--title"
const AUTHOR_SELECTOR = "a.p-author.h-card"
const CANONICAL_SELECTOR = "a.p-canonical"
const TIMESTAMP_SELECTOR = "body > article > footer > p:nth-child(1) > a:nth-child(2) > time"
// const BODY_SELECTOR = "section.section.section--body.section--first.section--last > div.section-content"
const BODY_SELECTOR = "body > article > section.e-content"
const FOOTER_SELECTOR = "body > article > footer > p:nth-child(3)"

const UTF8 = 'utf8'

module.exports = {
  setVerbose,
  logger,
  green,
  red,

  HTML_POST_QUALIFIER,
  TITLE_SELECTOR,
  AUTHOR_SELECTOR,
  CANONICAL_SELECTOR,
  TIMESTAMP_SELECTOR,
  BODY_SELECTOR,
  FOOTER_SELECTOR,

  UTF8
}