const baseURL = '/azurite'; // change this for GitHub pages deployment based on your repository name

const { cpSync } = require('fs');
const { join } = require('path');
const sanitize = require('sanitize-filename');

/**
 * Resolves WikiLinks to slugged anchor tags.
 *
 * [[Linked Page]] -> <a href="/linked-page" />
 */
function slugifyLink(pageName) {
  pageName = pageName.trim();
  pageName = pageName.split('/').map(sanitize).join('/');
  pageName = pageName.replace(/\s+/g, '-');
  pageName = pageName.toLowerCase();
  return pageName;
}

/**
 * 11ty custom filter to extract the text content of the first H1 of a given HTML {content}.
 */
function extractFirstH1Text(content) {
  const regex = /<h1>(.*?)<\/h1>/;
  const match = content.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return 'Untitled Note';
  }
}

/**
 * Executes before building the notes/ directory.
 */
function precompileSteps() {
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
}

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
  /* copy files to _site */
  eleventyConfig.addPassthroughCopy('static/assets/**/*');
  /* custom filters */
  eleventyConfig.addFilter('extractFirstH1Text', extractFirstH1Text);
  /* copy pages to be parsed to _site */
  eleventyConfig.addWatchTarget('static');
  precompileSteps();
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
