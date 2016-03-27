import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import $get from '../get/index.js';

//
// Returns a structure of values in `subject`, addressed by a property path or a mapper function
//
export default createPolymorphFunction(
    mapper => path => subject => {
        const object = $get(path, subject);

        if (object && typeof object === 'object') {
            if (typeof object.map === 'function') {
                return object.map($get(mapper));
            }

            const result = {};

            Object.keys(object).forEach(key => {
                result[key] = $get(mapper, object[key]);
            });

            return result;
        }
    }
);
