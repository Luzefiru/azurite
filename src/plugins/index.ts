import { Plugins } from '../types';
import resolveWikiLinks from './resolveWikiLinks';
import removeMetadata from './removeMetadata';
import resolveCallouts from './resolveCallouts';
import addHeadTag from './addHeadTag';

/* add your HTML parser function plugins here */
const plugins: Plugins = {
  resolveWikiLinks,
  removeMetadata,
  resolveCallouts,
  addHeadTag,
};
export default plugins;
