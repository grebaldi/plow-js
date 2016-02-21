import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';

import $get from '../get/index.js';

//
// Returns the last item of an array
//
export default createPolymorphFunction(
    path => subject => {
        const target = $get(path, subject);

        if (!target || !Array.isArray(target)) {
            console.warn(`$last expects the target to be an array, got ${typeof target} instead`);
            return null;
        }

        return target[target.length - 1];
    }
);
