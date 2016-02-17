const reduceOps = ops => subject => ops.reduce(
    (subject, nextOp) => nextOp(subject),
    subject
);

//
// Performs all passed operations like a reversed compose
//
export default (...ops) => {
    if (typeof ops[ops.length - 1] !== 'function') {
        return reduceOps(ops.slice(0, -1))(ops[ops.length - 1]);
    }

    return reduceOps(ops);
};
