import { formatPrice } from "./o02-funciones";
import type { Coffee } from "./types";
import { coffees } from "./data";

export  const coffeeCard = ({name,origin,price}: Coffee): string => `${name} (${origin}) · ${formatPrice(price)}`;

export const mainNote = ( { notes }:Coffee):string => {
    const [first, ...others] = notes;
    return `${first} y ${others.length} más`;
}

export const toPublicCoffee = ({stock,...publicCoffee}:Coffee): Omit<Coffee,"stock"> => publicCoffee
// 🔍 stock no se usa y npx tsc no da "declared but never read": hace falta escribirlo para sacarlo
// del ...publicCoffee, y TypeScript no marca como sin usar las propiedades que van al lado de un rest.

export const sumAll = (...amounts: number[]): number =>
    amounts.reduce((total,amount) => total + amount, 0);



console.log(coffeeCard(coffees[0])); // -> "Etiopía Yirgacheffe (Etiopía) · 14.90 €"
 
console.log(mainNote(coffees[0])); // → "floral y 2 más"
console.log(mainNote(coffees[1])); // → "caramelo y 1 más"

console.log(toPublicCoffee(coffees[1]))
// -> {
//  id: 2,
//  name: 'Colombia Huila',
//  origin: 'Colombia',
//  notes: [ 'caramelo', 'manzana roja' ],
//  roast: 'medium',
//  price: 12.9
//}

console.log(coffees[1].stock); // → 3


console.log(sumAll(1,2,3)); // -> 6
console.log(sumAll()); // -> 0
console.log(sumAll(...coffees.map((coffee) => coffee.stock))); // -> 48; Este es spread y no agrupa sino que expande el array, separa los elementos
