/**
 * Adds the callout's name as a class the <p> tag of the callout for styling.
 *
 * Example:
 *
 * `<p>[!info] ... </p>` -> `<p class="info"> ... </p>`.
 *
 * Dependencies:
 *  - src/static/stylesheet.css file (optional)
 */
const styleCallouts = (html: string): string => {
  const calloutRegEx = /\[!(\w+)\]([\s\S]*?)<\/p>/g;

  // Replace the callout tags with modified <p> tags
  const modifiedHTML = html.replace(
    calloutRegEx,
    (match, calloutName, content) => {
      return `<p class="${calloutName}">${content}</p>`;
    }
  );

  return modifiedHTML;
};

export default styleCallouts;
