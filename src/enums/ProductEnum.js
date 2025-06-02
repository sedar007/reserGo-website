const ProductEnum = {
    HOTEL: "Hôtel",
    RESTAURANT: "Restaurant",
    EVENT: "Évènementiel"
};

const productTypeToSlug = {
    [ProductEnum.HOTEL]: 'hotels',
    [ProductEnum.RESTAURANT]: 'restaurants',
    [ProductEnum.EVENT]: 'events',
};

function getProductSlug(type) {
    return productTypeToSlug[type] || 'all-product';
}

export { ProductEnum, getProductSlug };