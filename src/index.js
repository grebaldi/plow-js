import * as projections from './projections/index.js';
import * as migrations from './migrations/index.js';
import * as connections from './connections/index.js';
import * as effects from './effects/index.js';

export const $and = projections.$and;
export const $contains = projections.$contains;
export const $count = projections.$count;
export const $get = projections.$get;
export const $head = projections.$head;
export const $last = projections.$last;
export const $map = projections.$map;
export const $not = projections.$not;
export const $or = projections.$or;
export const $tail = projections.$tail;
export const $resolve = projections.$resolve;
export const $transform = projections.$transform;

export const $add = migrations.$add;
export const $drop = migrations.$drop;
export const $override = migrations.$override;
export const $pop = migrations.$pop;
export const $remove = migrations.$remove;
export const $set = migrations.$set;
export const $shift = migrations.$shift;
export const $unshift = migrations.$unshift;
export const $merge = migrations.$merge;
export const $toggle = migrations.$toggle;

export const $all = connections.$all;
export const $summarize = connections.$summarize;
export const $traverse = connections.$traverse;

export const $log = effects.$log;

export * from './util/index.js';
