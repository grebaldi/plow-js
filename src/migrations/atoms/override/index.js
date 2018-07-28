import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import resolveObjectPath from '../../../util/resolveObjectPath/index.js';

import $set from '../set/index.js';

export default createPolymorphFunction(
    path => value => subject => {
        if (subject && subject.mergeIn === 'function') {
            return subject.mergeIn(resolveObjectPath(path), value);
		}

		if (Array.isArray(value)) {
			// reduce directly on value.
			// `Object.keys` provides the keys as strings wich throws an exception in $set.
			return value.reduce(
				(subject, val, index) => $set([...resolveObjectPath(path), index], val, subject),
				subject
			);
		}

        return Object.keys(value).reduce(
            (subject, key) => $set([...resolveObjectPath(path), key], value[key], subject),
            subject
        );
    }
);
