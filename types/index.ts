export type burgerCardPropsType = {
    burgerName: string;
    eventHandler:Function;
}

export type codeInputPropsType = {
    label: string;
    codeLength: number;
    eventHandler:Function;
}

export type orderCardPropsType = {
    burger: string,
    size: string,
    quantity: number,
    price: number,
}


export type orderSummaryItemType = {
    name: string,
    size: 'Small' | 'Medium' | 'Large',
    quantity: number,
    price:number,
}

export type actionType = {
    burger: 'Hamburger' | 'Cheese Burger'  | 'Chilli Cheese Burger',
    size: 'Small' | 'Medium' | 'Large',
    type: 'dec' | 'inc',
    promo: boolean
}