const asyncHandler = (fn) => (req, res, next) =>
	Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;

/**
 * when wrapping the functions of the controller then
 * it understands how the next function works
 * so we needs not call next explicitly right
 *
 */
