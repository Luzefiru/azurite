const baseURL = '/azurite/'; // change this for GitHub pages deployment based on your repository name

const wikilinksPlugin = require('markdown-it-wikilinks')({
  baseURL,
});

module.exports = function (eleventyConfig) {
  /* plugins */
  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(wikilinksPlugin));
  /* global YAML front matter keys */
  eleventyConfig.addGlobalData('layout', 'layout.njk');
  /* copy files to _site */
  eleventyConfig.addPassthroughCopy({ 'static/404.html': '404.html' });
  return {
    dir: {
      input: 'notes',
      output: '_site',
      includes: '../static',
    },
    markdownTemplateEngine: 'liquid', // template engine for Markdown
    templateFormats: ['html', 'liquid', 'md'],
    pathPrefix: baseURL, // must use in GitHub Pages
  };
};
