# gatsby-source-medium-backup

[![GitHub license](https://img.shields.io/github/license/eugenehp/gatsby-source-medium-backup.svg?color=blue&style=for-the-badge)](./LICENSE)
[![npm](https://img.shields.io/npm/v/gatsby-source-medium-backup.svg?color=green&style=for-the-badge)](https://www.npmjs.com/package/gatsby-source-medium-backup)
[![npm downloads](https://img.shields.io/npm/dw/gatsby-source-medium-backup.svg?label=npm%20downloads&style=for-the-badge)](https://npmcharts.com/compare/gatsby-source-medium-backup?minimal=true)
[![total npm downloads](https://img.shields.io/npm/dt/gatsby-source-medium-backup.svg?label=total%20npm%20downloads&style=for-the-badge)](https://npmcharts.com/compare/gatsby-source-medium-backup?minimal=true)
[![GitHub watchers](https://img.shields.io/github/watchers/eugenehp/gatsby-source-medium-backup.svg?style=for-the-badge)](https://github.com/eugenehp/gatsby-source-medium-backup/watchers)
[![GitHub stars](https://img.shields.io/github/stars/eugenehp/gatsby-source-medium-backup.svg?label=GitHub%20stars&style=for-the-badge)](https://github.com/eugenehp/gatsby-source-medium-backup/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/eugenehp/gatsby-source-medium-backup.svg?style=for-the-badge)](https://github.com/eugenehp/gatsby-source-medium-backup/network/members)
[![open bugs](https://img.shields.io/github/issues-raw/eugenehp/gatsby-source-medium-backup/bug.svg?color=d73a4a&label=open%20bugs&style=for-the-badge)](https://github.com/eugenehp/gatsby-source-medium-backup/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3Abug)
[![total open issues](https://img.shields.io/github/issues-raw/eugenehp/gatsby-source-medium-backup.svg?label=total%20open%20issues&style=for-the-badge)](https://github.com/eugenehp/gatsby-source-medium-backup/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/eugenehp/gatsby-source-medium-backup.svg?style=for-the-badge)](https://github.com/eugenehp/gatsby-source-medium-backup/pulls)

[![Packagephobia](https://badgen.net/packagephobia/install/gatsby-source-medium-backup)](https://packagephobia.com/result?p=gatsby-source-medium-backup)
[![Bundlephobia](https://badgen.net/bundlephobia/min/gatsby-source-medium-backup)](https://bundlephobia.com/result?p=gatsby-source-medium-backup@0.0.1)

Gatsby plugin to import your medium posts from a backup as markdown files.

## Installation

We assume you've already [created gatsby website](https://www.gatsbyjs.com/docs/tutorial/part-zero/#create-a-gatsby-site) using command like this:

```shell
gatsby new example https://github.com/gatsbyjs/gatsby-starter-hello-world
```

### Install dependencies

```shell
cd example
npm i -s gatsby-source-filesystem gatsby-transformer-remark gatsby-source-medium-backup
```

### Configure your gatsby plugins

Go to `gatsby-config.js` and configure folder for your processed markdown pages first:

```javascript
const markdownPages = `${__dirname}/src/markdown-pages`
```

Then inside the `plugins` section add `gatsby-source-medium-backup` first and specify location of  your medium backfile inside `source`:

```javascript
{
  resolve: 'gatsby-source-medium-backup',
  options: {
    source: `${__dirname}/medium-export.zip`,
    destination: markdownPages,
  },
},
```

Add markdown generation **after** above plugin!

```javascript
// markdown
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: markdownPages,
    name: `markdown-pages`,
  },
},
`gatsby-transformer-remark`,
```

### Download your medium archive

[Here](https://help.medium.com/hc/en-us/articles/115004745787-Download-your-information)'s official guide from Medium.

1. On your homepage, click on your profile picture and click Settings.
2. Scroll down to the Download your information section.
3. Click Download . zip and confirm by clicking Export.
4. A link to download your archive will be sent to you by email when it is finished.

### Configure your gatsby blog posts generation

This section essentially follows original guideline for adding markdown pages [here](https://www.gatsbyjs.com/docs/how-to/routing/adding-markdown-pages/)

1. Create [`./src/templates/blogTemplate.js`](./src/templates/blogTemplate.js), which will be used as a page template for your blog posts.
2. Configure your [`./gatsby-node.js`](./gatsby-node.js) to generate blog posts using markdown files during the build time.

### Now run your gatsby

```shell
cd example
gatsby develop
```

Navigate to [http://localhost:8000/404](http://localhost:8000/404) and you'll see your markdown pages generated.

<img width="900" alt="Screen Shot 2021-04-08 at 20 26 36" src="https://user-images.githubusercontent.com/1857263/114124179-b8f62980-98a8-11eb-890c-94feb7eeedcf.png">


## Troubleshooting

1. Make sure to put absolute path for your medium archive.

2. This plugin generate following metadata for each post:

```json
{
  "title": "How to build a react-native plugin in 2021",
  "author": "Eugene Hauptmann",
  "authorLink": "https://medium.com/@eugenehauptmann",
  "canonical": "https://medium.com/@eugenehauptmann/how-to-build-a-react-native-plugin-in-2021-60704edc0c28",
  "timestamp": "2021-04-06T00:58:51.984Z",
  "exportDate": "April 6, 2021"
}
```

## Sponsorship

Thank you to our sponsors:

[<img width="300px" src="https://user-images.githubusercontent.com/1857263/114124204-c4e1eb80-98a8-11eb-80ab-64683c24bbc5.png" alt="Reactive Lions™" target="_blank">](https://www.reactivelions.com)

## License

[MIT](./LICENSE)

Copyright (c) 2021 Eugene Hauptmann
