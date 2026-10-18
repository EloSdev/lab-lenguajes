import type  { Coffee } from "./types";
import { finalPrice } from "./o04-opcionales";
import { coffees } from "./data";
import { formatPrice } from "./o02-funciones";

export interface CartItem {
  coffeeId: number;
  quantity: number;
}

export type Cart = CartItem[];


export const addToCart = (cart: Cart, coffeeId: number): Cart => 
    cart.some((item) => item.coffeeId === coffeeId)
        ? cart.map((item) => 
            item.coffeeId === coffeeId ? { ...item, quantity: item.quantity + 1} : item
        )
        : [...cart, { coffeeId, quantity: 1}];

export const removeFromCart = (cart: Cart, coffeeId: number): Cart =>
    cart.filter((item) => item.coffeeId !== coffeeId);


export const changeQuantity = (cart: Cart, coffeeId: number, quantity:number): Cart => 
    quantity <= 0
        ? removeFromCart(cart, coffeeId)
        : cart.map((item) => item.coffeeId === coffeeId ? {...item, quantity } : item );


export const cartTotal = (cart: Cart, list: Coffee[]): number =>
    cart.reduce((total,item) => {
        const coffee = list.find((c) => c.id === item.coffeeId)
        const lineTotal = coffee ? finalPrice(coffee) * item.quantity : 0;
        return total + lineTotal
    }, 0);



const empty: Cart = [];
const cart1 = addToCart(empty, 1);
const cart2 = addToCart(cart1, 4);
const cart3 = addToCart(cart2, 1);
const cart4 = changeQuantity(cart3, 4, 3);
const cart5 = removeFromCart(cart4, 1);
const cart6 = changeQuantity(cart5, 4, 0);

console.log(cart3); // → [{ coffeeId: 1, quantity: 2 }, { coffeeId: 4, quantity: 1 }]
console.log(cart4); // → [{ coffeeId: 1, quantity: 2 }, { coffeeId: 4, quantity: 3 }]
console.log(cart5); // → [{ coffeeId: 4, quantity: 3 }]
console.log(cart6); // → []

// Los carritos anteriores no han cambiado
console.log(empty); // → []
console.log(cart1); // → [{ coffeeId: 1, quantity: 1 }]

// Sólo se copia lo que cambia
console.log(cart3 === cart2);       // → false. Es un carrito nuevo
console.log(cart3[0] === cart2[0]); // → false. El café 1 cambió: es un objeto nuevo
console.log(cart3[1] === cart2[1]); // → true. El café 4 no cambió: se comparte

console.log(formatPrice(cartTotal(cart4, coffees))); // → "58.32 €"
console.log(formatPrice(cartTotal([{ coffeeId: 99, quantity: 1 }], coffees))); // → "0.00 €"