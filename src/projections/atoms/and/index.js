const reduceOps = ops => subject => ops.reduce(
    (subject, nextOp) => subject === false ? subject : nextOp(subject),
    subject
);

//
// Performs all passed operations until one of them returns false
//
export default (...ops) => {
    if (typeof ops[ops.length - 1] !== 'function') {
        return reduceOps(ops.slice(0, -1))(ops[ops.length - 1]);
    }

    return reduceOps(ops);
};
