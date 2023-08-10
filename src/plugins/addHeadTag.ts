/* adds <head> metadata and a link to a /stylesheet.css file */
const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="stylesheet.css" />
    <title>%title%</title>
  </head>
  <body>
    %content%
  </body>
</html>
`;

/**
 * Retrieves the text content inside the first <h1> tag in the {html}.
 *
 * Dependencies:
 *  - src/static/stylesheet.css file (optional)
 */
function extractFirstH1Content(html: string): string | null {
  const regex = /<h1>(.*?)<\/h1>/;
  const match = html.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null; // No <h1> content found
  }
}

const addTemplate = (html: string): string => {
  const firstH1Content = extractFirstH1Content(html);
  const htmlWithTitle = template.replace(
    /%title%/,
    firstH1Content || 'Untitled Note'
  );
  const newHTML = htmlWithTitle.replace(/%content%/, html);
  return newHTML;
};

export default addTemplate;
