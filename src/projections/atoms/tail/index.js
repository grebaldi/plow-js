import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';

import $get from '../get/index.js';

//
// Returns the head of an array
//
export default createPolymorphFunction(
    path => subject => {
        const target = $get(path, subject);

        if (target && typeof target.rest === 'function') {
            return target.rest();
        }

        if (!target || !Array.isArray(target)) {
            console.warn(`$tail expects the target to be an array, got ${typeof target} instead`);
            return null;
        }

        return target.slice(1);
    }
);
