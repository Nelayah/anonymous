// 使用 node-cache 作为 redis 替代方案
import * as NodeCache from 'node-cache';

const cache = new NodeCache();

export default cache;