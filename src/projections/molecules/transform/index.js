import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';

import $traverse from '../../../connections/atoms/traverse/index.js';

//
// Transforms the subject into a new shape
//
export default createPolymorphFunction(
    shape => subject => {
        if (Object.keys(shape).length === 0) {
            return {};
        }

        return $traverse(val => typeof val === 'function' ? val(subject) : val, shape);
    }
);
