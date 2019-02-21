const series = async function (tasks: any) {
    return tasks.reduce((chain: any, nextPromise: any) => {
        return chain.then(nextPromise);
    }, Promise.resolve());
};

export { series }