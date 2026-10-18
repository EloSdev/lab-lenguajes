import type{ Roast } from "./types";
import { coffees } from "./data";

export const formatPrice = (price: number, currency = "€"):string =>
    `${price.toFixed(2)} ${currency}`;


export const stockStatus = (stock: number):string => {
    if (stock === 0){
        return "Agotado";
    } else if (stock < 5){
        return "Últimas unidades";
    }else {
        return "Disponible"
    }
};


export const roastLabel = (roast: Roast): string => {
    switch (roast){
        case "light":
            return "Tueste claro";
        case "medium":
            return "Tueste medio";
        case "dark":
            return "Tueste oscuro"; // si quito este caso del case y llamo a roastLabel("dark") la función no devuelve nada cuando tendría que devolver un string -> "error TS2366: Function lacks ending return statement and return type does not include 'undefined'."
    }
};


console.log(formatPrice(14.9)); // -> "14.90 €"
console.log(formatPrice(14.9, "$")); // ->  "14.90 $"
console.log(formatPrice(10)); // -> "10.00 €"

for (const coffee of coffees){
    console.log(`${coffee.name} · ${roastLabel(coffee.roast)} · ${stockStatus(coffee.stock)}`)
}

// Etiopía Yirgacheffe · Tueste claro · Disponible
// Colombia Huila · Tueste medio · Últimas unidades
// Kenia AA · Tueste claro · Agotado
// Brasil Cerrado · Tueste oscuro · Disponible
// Guatemala Antigua · Tueste medio · Disponible
// Sumatra Mandheling · Tueste oscuro · Agotado
// 🔍 Al quitar el case "dark", estas dos líneas salían "Brasil Cerrado · undefined · Disponible"
// y "Sumatra Mandheling · undefined · Agotado": roastLabel("dark") no llegaba a ningún return.