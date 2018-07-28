import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import resolveObjectPath from '../../../util/resolveObjectPath/index.js';

import $set from '../../atoms/set/index.js';

const merge = (path, value, subject) => Object.keys(value).reduce(
    (subject, key) => {
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
