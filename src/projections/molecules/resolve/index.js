import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';

import $get from '../../../projections/atoms/get/index.js';

//
// Returns a value from an object structure, addressed by a path that is a
// value within the same object
//
export default createPolymorphFunction(
    path => {
        //
        // This function returns the path, if it is neither
        // an array nor a string nor a number
        //
        if (typeof path !== 'string' && typeof path !== 'number' && !Array.isArray(path)) {
            return path;
        }

        return subject => $get($get(path, subject), subject)
    }
);
