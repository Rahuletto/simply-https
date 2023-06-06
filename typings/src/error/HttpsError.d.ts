export declare type errOptions = {
    function?: string;
    error?: string;
};
export declare class HttpsError extends Error {
    /**
     * Emit errors and provide sufficient details to help users debug easily
     * @param {String} function
     * @param {String} error
     */
    constructor(options?: errOptions);
}
