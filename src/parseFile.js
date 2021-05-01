const cheerio = require('cheerio');
const {
  TITLE_SELECTOR,
  AUTHOR_SELECTOR,
  CANONICAL_SELECTOR,
  TIMESTAMP_SELECTOR,
  FOOTER_SELECTOR
} = require('./utils')

/*
  Parses HTML and returns metadata:
  ```json
    {
      title: 'How to build a react-native plugin in 2021',
      author: 'Eugene Hauptmann',
      authorLink: 'https://medium.com/@eugenehauptmann',
      canonical: 'https://medium.com/@eugenehauptmann/how-to-build-a-react-native-plugin-in-2021-60704edc0c28',
      timestamp: '2021-04-06T00:58:51.984Z',
      exportDate: 'April 6, 2021'
    }
  ```
*/
const parseFile = (basename, content, prefix) => {
  const [date, slug] = basename.split('_');

  const $ = cheerio.load(content)
  const title = $(TITLE_SELECTOR).text();
  const author = $(AUTHOR_SELECTOR).text();
  const authorLink = $(AUTHOR_SELECTOR).attr('href');
  const canonical = $(CANONICAL_SELECTOR).attr('href');
  const timestamp = $(TIMESTAMP_SELECTOR).attr('datetime')
  const footer = $(FOOTER_SELECTOR).text().split('on')[1]
  const exportDate = footer.substr(1, footer.length - 2)

  const metadata = {
    title, 
    date,
    slug: prefix ? `${prefix}/${slug}` : slug,
    author,
    authorLink,
    canonical,
    timestamp,
    exportDate,
  }

  return metadata
}

module.exports.parseFile = parseFile