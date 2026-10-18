import type { Coffee } from "./types";

// 1
let shippingCost = 3.5;
export const totalWithShipping = (amount: number): number => amount + shippingCost;
// Impura porque depende de algo externo para cambiar; la salida depende del valor de shippingCost

// 2
export const applyDiscount = (coffee: Coffee, rate: number): Coffee => {
  coffee.price = coffee.price * (1 - rate);
  return coffee;
};
// Impura, muta el argumento

// 3
export const namesInCapitals = (list: Coffee[]): string[] =>
  list.map((coffee) => coffee.name.toUpperCase());
// Pura, porque se devuleve un array de strings nuevo, solo se lee el name y toUpperCase(), es decir los cafés originales quedan intactos

// 4
export const sortByPrice = (list: Coffee[]): Coffee[] =>
  list.sort((a, b) => a.price - b.price);
// Impura por que sort modifica el array que recibe


// 5
export const createOrderId = (): string => `ORD-${Date.now()}`;
// Impura, porque depende de la hora actual; dará un valor distinto en cada llamada

// 6
export const buildTags = (coffee: Coffee): string[] => {
  const tags: string[] = [];
  for (const note of coffee.notes) {
    tags.push(`#${note}`);
  }
  return tags;
};
// Pura, el push se hace dentro del array interno de tags(local) y mutar dentro es aceptable



// VERSIONES PURAS

//1
export const totalWithShippingPure = (amount: number, shippingCost: number): number => amount + shippingCost;

//2
export const applyDiscountPure = (coffee: Coffee, rate:number): Coffee => ({ ...coffee, price: coffee.price * (1-rate) });
     

//4
export const sortByPricePure = (list: Coffee[]): Coffee[] =>
  list.toSorted((a, b) => a.price - b.price);
 

//5
export const createOrderIdPure = (timestamp: number): string => `ORD-${timestamp}`;