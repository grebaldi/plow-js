import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import $get from '../get/index.js';

//
// Counts values in objects, arrays or strings
//
export default createPolymorphFunction(
    path => subject => {
        const object = $get(path, subject);

        if (!object) {
            return 0;
        }

        if (Array.isArray(object) || typeof object === 'string') {
            return object.length;
        }

        if (typeof object === 'object') {
            return Object.keys(object).length;
        }

        return 0;
    }
);
