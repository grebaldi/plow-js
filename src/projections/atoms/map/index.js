import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import $get from '../get/index.js';

export default createPolymorphFunction(
    property => path => subject => {
        const object = $get(path, subject);

        if (object && typeof object === 'object') {
            if (Array.isArray(object)) {
                return object.map($get(property));
            }

            const result = {};

            Object.keys(object).forEach(key => {
                result[key] = $get(property, object[key]);
            });

            return result;
        }
    }
);
