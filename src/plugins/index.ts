import { Plugins } from '../types';
import resolveWikiLinks from './resolveWikiLinks';
import removeMetadata from './removeMetaData';

const plugins: Plugins = { resolveWikiLinks, removeMetadata }; // add your function plugins here
export default plugins;
