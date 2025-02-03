function getShoppingListStatus(statusCode) {
    switch(statusCode) {
        case false:
            return "In Progress";
        case true:
            return "Completed";
        default:
            return "unknown status";
    }
}

export default getShoppingListStatus;