import { produce } from "immer";

interface Subscription {
  customer: { name: string; address: { city: string; zip: string } };
  plan: { name: "Básico" | "Popular" | "Pro"; bagsPerMonth: number };
  deliveries: string[];
}

const subscription: Subscription = {
  customer: { name: "Lucía", address: { city: "Málaga", zip: "29005" } },
  plan: { name: "Popular", bagsPerMonth: 2 },
  deliveries: ["2026-09-05", "2026-10-05"],
};

const movedSpread: Subscription = {
    ...subscription,
    customer: {
        ...subscription.customer,
        address: {
            ...subscription.customer.address,
            city: "Sevilla",
            }
        },
    };


const movedImmer = produce(subscription, (draft) => {
    draft.customer.address.city = "Sevilla"
})

const upgraded = produce(subscription, (draft) => {
    draft.plan.name = "Pro";
    draft.plan.bagsPerMonth = 3;
    draft.deliveries.push("2026-11-05"); // En el borrador push está permitido: el original no cambia
});

console.log(movedSpread.customer.address.city);  // → "Sevilla"
console.log(movedImmer.customer.address.city);   // → "Sevilla"
console.log(subscription.customer.address.city); // → "Málaga". Intacto

console.log(movedImmer.customer === subscription.customer); // → false. Cambió
console.log(movedImmer.plan === subscription.plan);         // → true. No cambió: se comparte

console.log(upgraded.plan);           // → { name: "Pro", bagsPerMonth: 3 }
console.log(upgraded.deliveries);     // → ["2026-09-05", "2026-10-05", "2026-11-05"]
console.log(subscription.plan);       // → { name: "Popular", bagsPerMonth: 2 }
console.log(subscription.deliveries); // → ["2026-09-05", "2026-10-05"]

console.log(produce(subscription, () => {}) === subscription); // → true
console.log(Object.isFrozen(upgraded.plan));                   // → true

// 📝 ¿Spread o Immer?
// Para este cambio, Immer es más legible: draft.customer.address.city = "Sevilla" es una línea,
// mientras que con spread hacen falta tres niveles anidados, y si se olvida uno se comparte el
// objeto original y se acaba mutando sin querer.
// Usaría spread cuando el cambio es superficial (uno o dos niveles, como el carrito de la O6),
// porque no necesita ninguna librería y se ve exactamente qué se copia. Usaría Immer cuando el
// estado es un árbol y el cambio está dentro, o cuando hay que hacer varios cambios a la vez
// (como upgraded). 
// "Spread cuando el cambio es superficial, e Immer cuando el estado es un árbol".
