import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';

import $get from '../../../projections/atoms/get/index.js';

//
// Logs and returns the subject
//
export default createPolymorphFunction(
    path => {
        if (typeof path !== 'string') {
            console.log('[Plow JS Log]', 'no path given');
            console.log('[Plow JS Log]', path);
            return path;
        }

        return subject => {
            const target = $get(path, subject);

            console.log('[Plow JS Log]', path);
            console.log('[Plow JS Log]', target);
            return subject;
        }
    }
);
