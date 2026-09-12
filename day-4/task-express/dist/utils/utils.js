export function handlenotFound(res, message) {
    return res.status(404).json({
        message: message
    });
}
export function handleError(res, message) {
    return res.status(400).json({
        message: message
    });
}
