import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import resolveObjectPath from '../../../util/resolveObjectPath/index.js';

//
// Returns a value from an object structure, addressed by `path`
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

        return subject => {
            if (subject && typeof subject.getIn === 'function') {
                return subject.getIn(resolveObjectPath(path));
            }

            return resolveObjectPath(path).reduce(
                (subject, part) => subject && subject[part],
                subject
            );
        }
    }
);
