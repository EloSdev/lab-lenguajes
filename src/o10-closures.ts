

export type PriceRule = (price:number) => number

export const createDiscount = (rate:number): PriceRule => (price) => price * (1 - rate);

export const createOrderIdGenerator = (prefix: string): () => string => {
    let current = 0;
    return () => {
        current += 1;
        return `${prefix}-${current}`;
    };
};


const blackFriday = createDiscount(0.2);
const members = createDiscount(0.1);

console.log(blackFriday(10)); // → 8
console.log(members(10));     // → 9
console.log([10, 20, 15].map(blackFriday)); // → [8, 16, 12]

const nextOrderId = createOrderIdGenerator("TUE");
const nextGiftId = createOrderIdGenerator("REGALO");

console.log(nextOrderId()); // → "TUE-1"
console.log(nextOrderId()); // → "TUE-2"
console.log(nextGiftId());  // → "REGALO-1"
console.log(nextOrderId()); // → "TUE-3"

// ¿Por qué .map(blackFriday) va sin paréntesis?
// Porque queremos pasarle a map la función misma, para que la llame con cada precio.
// Con paréntesis, blackFriday() se ejecutaría ahora, sin precio (price sería undefined → NaN),
// y map recibiría ese número en lugar de una función. TS lo marca como error.
//
// ¿blackFriday es pura?
// Sí. Con la misma entrada devuelve siempre lo mismo (blackFriday(10) → 8 siempre) y no tiene
// efectos secundarios. Usa una variable del closure (rate), pero nunca cambia: es una función
// configurada  
//
// ¿Y nextOrderId?
// No. Sin argumentos devuelve algo distinto en cada llamada ("TUE-1", "TUE-2"…), así que rompe
// la condición 1 (misma entrada → misma salida), y además modifica current, que está fuera de
// ella, en el closure. Es estado encapsulado: impura, pero ese estado solo lo puede tocar ella.