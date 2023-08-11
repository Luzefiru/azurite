const baseURL = '/azurite/'; // change this for GitHub pages deployment based on your repository name

const wikilinksPlugin = require('markdown-it-wikilinks')({
  baseURL,
});

module.exports = function (eleventyConfig) {
  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(wikilinksPlugin));
  return {
    dir: {
      input: 'notes',
      output: '_site',
      includes: '_includes',
    },
    markdownTemplateEngine: 'liquid', // template engine for Markdown
    templateFormats: ['html', 'liquid', 'md'],
    pathPrefix: baseURL, // must use in GitHub Pages
  };
};
