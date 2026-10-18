//import type { Coffee, Roast } from "./types";
//import { coffees } from "./data";


/*const badRoast: Coffee = {
    id: 7,
    name: "badCoffee",
    origin: "Madrid",
    notes: ['salado', 'pocho'],
    roast: "extra",
    price: 9.99,
    stock: 10,
    discount: 0.5
}*/

// Error 1: roast fuera de la unión
// error TS2322: Type '"extra"' is not assignable to type 'Roast'.
// Por qué: Roast es una unión cerrada de tres literales ("light" | "medium" | "dark") y "extra" no es uno de ellos.


/*const noPrice: Coffee = {
    id: 7,
    name: "noPrice",
    origin: "Barcleona",
    notes: ['afrutado', 'dulce'],
    roast: "light",
    stock: 10,
    discount: 0.5
}*/

// Error 2: café sin precio
// error TS2741: Property 'price' is missing in type '{ id: number; name: string; origin: string; notes: string[]; roast: "light"; stock: number; discount: number; }' but required in type 'Coffee'.
// Por qué: price no lleva ? en la interfaz Coffee, así que es obligatoria.


//coffees[0].id= 2;

// Error 3: cambiar id
// error TS2540: Cannot assign to 'id' because it is a read-only property.
// Por qué: id es readonly. Es solo una comprobación de TypeScript al compilar: se borra en el JS
// final, así que si esta línea se ejecutara (Vite no comprueba tipos), el id sí cambiaría.