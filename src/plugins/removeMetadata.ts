/**
 * Removes all the text before the first <h1> tag.
 */
const removeMetadata = (html: string): string => {
  return html.replace(/^(.*?)(?=<h1>)/s, '');
};

export default removeMetadata;
