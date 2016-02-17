import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';

import $set from '../../../migrations/atoms/set/index.js';

const traverse = actor => subject => {
    if (typeof subject === 'object') {
        return Object.keys(subject).reduce(
            (subject, key) => $set(key, traverse(actor)(subject[key]), subject),
            subject
        );
    }

    return actor(subject);
};

//
// Deeply applies the actor function to each member of the subject
//
export default createPolymorphFunction(traverse);
