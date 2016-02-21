import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import resolveObjectPath from '../../../util/resolveObjectPath/index.js';

import $get from '../../../projections/atoms/get/index.js';
import $set from '../set/index.js';

export default createPolymorphFunction(
    path => subject => {
        const target = $get(path, subject);

        if (!Array.isArray(target)) {
            console.warn(`Cannot pop an item from a ${typeof target}.`);
            return subject;
        }

        return $set(path, [...target.slice(0, -1)], subject);
    }
);
