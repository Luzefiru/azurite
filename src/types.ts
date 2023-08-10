export type PluginFunction = (html: string) => string;

export interface Plugins {
  [index: string]: PluginFunction;
}
