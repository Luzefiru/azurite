const baseURL = '/azurite'; // change this for GitHub pages deployment based on your repository name

/* [[Linked Page]] -> <a href="/linked-page" /> */
const sanitize = require('sanitize-filename');
const slugifyLink = (pageName) => {
  pageName = pageName.trim();
  pageName = pageName.split('/').map(sanitize).join('/');
  pageName = pageName.replace(/\s+/g, '-');
  pageName = pageName.toLowerCase();
  return pageName;
};

const { cpSync } = require('fs');
const { join } = require('path');
const wikilinksPlugin = require('markdown-it-wikilinks')({
  baseURL: `${baseURL}/`,
  uriSuffix: '.html',
  postProcessPageName: slugifyLink,
});

module.exports = function (eleventyConfig) {
  /* plugins */
  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(wikilinksPlugin));
  /* global YAML front matter keys */
  eleventyConfig.addGlobalData('layout', 'layout.njk');
  eleventyConfig.addGlobalData('baseURL', baseURL);
  eleventyConfig.addGlobalData('assets', `${baseURL}/static/assets`);
  /* copy files to _site */
  eleventyConfig.addPassthroughCopy('static/assets/**/*');
  /* copy pages to be parsed to _site */
  eleventyConfig.addWatchTarget('static');
  cpSync(
    join(__dirname, 'static/pages/404.html'),
    join(__dirname, 'notes/404.html'),
    { force: true }
  );
  cpSync(
    join(__dirname, 'static/pages/index.html'),
    join(__dirname, 'notes/index.html'),
    { force: true }
  );
  return {
    dir: {
      input: 'notes',
      output: '_site',
      includes: '../static',
    },
    markdownTemplateEngine: 'liquid', // template engine for Markdown
    templateFormats: ['html', 'liquid', 'md'],
    pathPrefix: `${baseURL}/`, // must use in GitHub Pages
  };
};
