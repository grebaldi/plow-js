import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';

import $get from '../../../projections/atoms/get/index.js';
import $contains from '../../../projections/atoms/contains/index.js';
import $set from '../../atoms/set/index.js';
import $add from '../../atoms/add/index.js';
import $remove from '../../atoms/remove/index.js';

//
// Helper function to create empty values for various types
//
const getEmptyValue = value => {
    if (typeof value === 'string') {
        return '';
    }

    return null;
};

//
// Performs different toggle mechanisms, depending on what type lies behind
// path in subject
//
// 1. Boolean: Will turn true to false and false to true
// 2. Array: Will add a value if not present and remove it otherwise
// 3. Other: Will set the target to value if it doesn't equal value or to fallback otherwise. If fallback is not set,
//           it will be replaced by a type-dependent empty value
//
export default createPolymorphFunction(
    path => value => {
        const $target = $get(path);

        //
        // Check for opportunity of boolean toggle
        //
        if (typeof value === 'object') {
            const target = $target(value);

            if (typeof target === 'boolean') {
                return $set(path, !target, value);
            }
        } else if (typeof value === 'undefined') {
            return value;
        }

        return fallback => {
            //
            // Check for opportunity of array item toggle
            //
            if (typeof fallback === 'object') {
                const target = $target(fallback);

                //
                // Handle Immutable JS
                //
                if (target && typeof target.delete === 'function') {
                    if ($contains(value, path, fallback)) {
                        // List
                        if (typeof target.push === 'function') {
                            return $remove(path, value, fallback);
                        }

                        // Sets
                        return $set(path, target.delete(value), fallback);
                    }

                    // List
                    if (typeof target.push === 'function') {
                        return $set(path, target.push(value), fallback);
                    }

                    // Sets
                    if (typeof target.add === 'function') {
                        return $set(path, target.add(value), fallback);
                    }
                }

                if (Array.isArray(target)) {
                    if ($contains(value, path, fallback)) {
                        return $remove(path, value, fallback);
                    }

                    return $add(path, value, fallback);
                }

                //
                // Perform value toggle with empty fallback
                //
                return $set(path, target === value ? getEmptyValue(value) : value, fallback);
            } else if (typeof fallback === 'undefined') {
                return fallback;
            }

            return subject => {
                //
                // Perform value toggle
                //
                (typeof fallback === 'undefined') && (fallback = getEmptyValue(value));
                return $set(path, $target(subject) === value ? fallback : value, subject);
            }
        }
    }
);
