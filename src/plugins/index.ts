import { Plugins } from '../types';
import resolveWikiLinks from './resolveWikiLinks';
import removeMetadata from './removeMetadata';
import resolveCallouts from './resolveCallouts';

const plugins: Plugins = { resolveWikiLinks, removeMetadata, resolveCallouts }; // add your function plugins here
export default plugins;
