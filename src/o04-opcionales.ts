import type { Customer, Grind, Coffee } from "./types";
import { customers, coffees } from "./data";
import { formatPrice } from "./o02-funciones";



const getCity = (customer: Customer): string => customer.address?.city ?? "Sin dirección";

const getGrind = (customer: Customer): Grind =>
    customer.preferences?.grind ?? "grano";


const wantsNewsletter = (customer: Customer): boolean => 
    customer.preferences?.newsletter ?? true ;

const wantsNewsletter2 = (customer: Customer): boolean =>
    customer.preferences?.newsletter || true;

export const finalPrice = (coffee: Coffee): number =>
    coffee.price * (1 - (coffee.discount ?? 0 )) ;



for (const customer of customers) {
  console.log(
    `${customer.name} · ${getCity(customer)} · ${getGrind(customer)} · newsletter: ${wantsNewsletter(customer)}`,
  );
}

// → Lucía · Málaga · molido · newsletter: false
// → Marcos · Sin dirección · grano · newsletter: true
// → Ana · Madrid · grano · newsletter: true

console.log(wantsNewsletter2(customers[0])); // trampa con Lucía; Devuelve true porque false es 'falsy', entonces devuelve el valor a la derecha, true en este caso

console.log(formatPrice(finalPrice(coffees[0]))); // → "13.41 €" (10 % de descuento)
console.log(formatPrice(finalPrice(coffees[1]))); // → "12.90 €" (sin descuento)
console.log(formatPrice(finalPrice(coffees[2]))); // → "15.50 €" (descuento 0)
console.log(formatPrice(finalPrice(coffees[4]))); // → "11.22 €" (15 %)

