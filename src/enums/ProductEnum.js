const ProductEnum = {
    HOTEL: "Hôtel",
    RESTAURANT: "Restaurant",
    EVENT: "Évènementiel"
};

const productTypeToSlug = {
    [ProductEnum.HOTEL]: 'hotel',
    [ProductEnum.RESTAURANT]: 'restaurant',
    [ProductEnum.EVENT]: 'event',
};

function getProductSlug(type) {
    return productTypeToSlug[type] || 'all-product';
}

export { ProductEnum, getProductSlug };