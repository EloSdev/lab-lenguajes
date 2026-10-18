import { coffees, customers } from "./data";

export type OrderStatus = "pending" | "roasting" | "shipped" | "delivered";

export const statusLabel: Record <OrderStatus, string> = {
    pending: "Pendiente",
    roasting: "Tostando",
    shipped: "Enviado",
    delivered: "Entregado", // Property 'delivered' is missing in type '{ pending: string; roasting: string; shipped: string; }' but required in type 'Record<OrderStatus, string>'.
};

export const statusMessage = (status:OrderStatus): string => `Tu pedido está: ${statusLabel[status]}`

export const normalizeId = (id: string | number): number => {
    if (typeof id === "number") {
        return id;
    }
    return Number(id);
}

export const findById = <T extends { id: number }>(items: T[], id: number): T | null => {
  return items.find((item) => item.id === id ) ?? null;
};





console.log(statusMessage("roasting")); // → "Tu pedido está: Tostando"

console.log(normalizeId("4")); // → 4
console.log(normalizeId(4));   // → 4

console.log(findById(coffees, normalizeId("4"))?.name ?? "No encontrado"); // → "Brasil Cerrado" ; Devuelve Coffee | Null
console.log(findById(customers, 3)?.email ?? "No encontrado");            // → "ana@mail.com" ; Devuelve Customer | Null
console.log(findById(coffees, 99)?.name ?? "No encontrado");              // → "No encontrado"

