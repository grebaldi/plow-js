import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import resolveObjectPath from '../../../util/resolveObjectPath/index.js';

import $set from '../set/index.js';

export default createPolymorphFunction(
    path => value => subject => {
        return Object.keys(value).reduce(
            (subject, key) => $set([...resolveObjectPath(path), key], value[key], subject),
            subject
        );
    }
);
