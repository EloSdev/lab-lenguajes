import { coffees } from "./data";
import type { Coffee } from "./types";
import { coffeeCard } from "./o03-destructuring";
import { formatPrice } from "./o02-funciones";



export const availableCoffees = (list: Coffee[]): Coffee[] =>
    list.filter((coffee) => coffee.stock > 0);

export const catalogLabels = (list: Coffee[]): string[] => 
    list
        .filter((coffee) => coffee.stock > 0)
        .toSorted((a,b) => a.price - b.price)
        //.sort((a,b) => a.price - b.price) // Lo he cambiado a sort y no he apreciado ningún cambio, la salida es la misma, entiendo que es porque ya se filtra antes
        .map(coffeeCard);
// 🔍 Con sort en lugar de toSorted, la última línea (el catálogo original) no cambia: filter crea un
// array nuevo y sort muta esa copia local, no coffees. Pero si sort va ANTES que filter, muta el
// array que recibe la función y coffees queda ordenado por precio: Brasil, Colombia, Guatemala,
// Sumatra, Etiopía, Kenia. Por eso toSorted: es seguro esté donde esté dentro de la cadena.


export const stockValue = (list: Coffee[]): number =>
    list.reduce((total, coffee) => total + coffee.price * coffee.stock, 0);



console.log(availableCoffees(coffees).map((coffee) => coffee.name));
// → ["Etiopía Yirgacheffe", "Colombia Huila", "Brasil Cerrado", "Guatemala Antigua"]

console.log(catalogLabels(coffees));
// → ["Brasil Cerrado (Brasil) · 10.50 €",
//    "Colombia Huila (Colombia) · 12.90 €",
//    "Guatemala Antigua (Guatemala) · 13.20 €",
//    "Etiopía Yirgacheffe (Etiopía) · 14.90 €"]

console.log(formatPrice(stockValue(coffees))); // → "585.60 €"

console.log(coffees.some((c) => c.stock === 0));  // → true
console.log(coffees.every((c) => c.notes.length > 0));     // → true
console.log(coffees.find((c) => c.id === 4)?.name ?? "No existe");  // → "Brasil Cerrado"
console.log(coffees.find((c) => c.id === 99)?.name ?? "No existe"); // → "No existe"

// Y la comprobación final: el catálogo sigue en su orden original
console.log(coffees.map((coffee) => coffee.name));
// → ["Etiopía Yirgacheffe", "Colombia Huila", "Kenia AA",
//    "Brasil Cerrado", "Guatemala Antigua", "Sumatra Mandheling"]
