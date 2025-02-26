export const ITEMs_PER_PAGE=9

export function discountedPrice(item){
    return (item.price * (1 - item.discountPercentage / 100)).toFixed(2)
}