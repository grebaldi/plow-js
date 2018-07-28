import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import resolveObjectPath from '../../../util/resolveObjectPath/index.js';

import $set from '../../atoms/set/index.js';

const merge = (path, value, subject) => Object.keys(value).reduce(
    (subject, key) => {
		if (Array.isArray(value)) {
			if (key.match(/^\d+$/)) {
				key = parseInt(key);
			} else {
				throw new TypeError(`Array key must be of type number or able to be parsed to number! Got key: ${key} of type ${typeof key}.`);
			}
		}
        if (typeof value[key] === 'object') {
            return merge([...path, key], value[key], subject);
        }

        return $set([...resolveObjectPath(path), key], value[key], subject);
    },
    subject
);

//
// Deeply merges two objects
//
export default createPolymorphFunction(
    path => value => subject => (subject && typeof subject.mergeDeepIn === 'function') ?
        subject.mergeDeepIn(resolveObjectPath(path), value) :
        merge(
            resolveObjectPath(path),
            value,
            subject
        )
);
