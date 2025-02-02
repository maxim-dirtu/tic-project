function getShoppingListStatus(statusCode) {
    switch(statusCode) {
        case 1:
            return "in progress";
        case 2:
            return "completed";
        default:
            return "unknown status";
    }
}

export default getShoppingListStatus;