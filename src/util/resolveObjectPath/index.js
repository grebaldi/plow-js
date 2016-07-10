//
// Resolves dot-separated string paths to arrays
//
export default path => {
    if (Array.isArray(path)) {
        return path;
    }

    if (typeof path === 'number') {
        return [path];
    }

    return path.split('.').map(part => {
        const partAsInteger = parseInt(part);

        if (!isNaN(partAsInteger) && String(partAsInteger) === part) {
            return partAsInteger;
        }

        return part;
    });
};
