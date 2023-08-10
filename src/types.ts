export type PluginFunction = (html: string) => string | Promise<string>;

export interface Plugins {
  [index: string]: PluginFunction;
}
