/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const markdownPages = `${__dirname}/src/markdown-pages`

module.exports = {
  /* Your site config here */
  plugins: [
    // '',
    {
      resolve: require.resolve(`../`),
      options: {
        source: `${__dirname}/medium-export.zip`,
        destination: markdownPages,
        prefix: 'blog', // blog/post-title,
        h1h2: true,
        // h2h3: true
      },
    },

    // markdown
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: markdownPages,
        name: `markdown-pages`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
