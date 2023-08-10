# src/plugins

Plugins act as the final parsers after the raw markdown is compiled into HTML.

Plugins are:

- functions with this signature: `(html: string) => Promise<string> | string`.

# Example

```ts
/* plugins/example.ts */
const example = (html: string): string => {
  // parse the html and return new html back
  return html;
};

export default example;
```

```ts
/* plugins/index.ts */
import example from './example.ts';

const plugins = { example };
export default plugins;
```