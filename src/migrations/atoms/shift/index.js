import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';

import $get from '../../../projections/atoms/get/index.js';
import $set from '../set/index.js';

export default createPolymorphFunction(
    path => subject => {
        const target = $get(path, subject);

        if (target && !Array.isArray(target) && typeof target.shift === 'function') {
            return $set(path, target.shift(), subject);
        }

        if (!Array.isArray(target)) {
            console.warn(`Cannot shift an item from a ${typeof target}.`);
            return subject;
        }

        return $set(path, [...target.slice(1)], subject);
    }
);
