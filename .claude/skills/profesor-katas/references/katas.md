# Mapa de katas

Las funciones exactas, las restricciones y la salida esperada están en `docs/enunciado_proyecto.md`; aquí solo está lo necesario para orientarse: fichero, temas que leer (`references/temas/`) y en qué fijarse al revisar.

Orden de dependencias: **O1 primero** (sin `types.ts` no compila nada). O2 → O3/O4 (reutilizan `formatPrice`); O4 → O6 (`finalPrice`); O3 → O5 (`coffeeCard`).

## Obligatorios (50 % + 10 % el README)

| Kata | Fichero | Temas | Puntos de revisión |
|---|---|---|---|
| O1 · Tipar el catálogo | `src/types.ts`, `src/o01-tipos.ts` | 10, 11, 12, 13 | `Roast` como unión de literales, no `enum`. `id` con `readonly`. `discount?`, `address?`, `preferences?` con `grind?`/`newsletter?` opcionales. `Address` como interfaz propia. Exportar todo. En `o01-tipos.ts`, los 3 errores provocados quedan comentados con el mensaje de TS. |
| O2 · Funciones básicas | `src/o02-funciones.ts` | 00, 01 | Parámetro por defecto `currency = "€"`. `toFixed(2)` + template literal. `if/else` en `stockStatus` (orden de las condiciones: 0 antes que < 5). `switch` exhaustivo sin `default` en `roastLabel`: el 🔍 de quitar un `case` y ver "Function lacks ending return statement". `for...of`. |
| O3 · Destructuring y rest | `src/o03-destructuring.ts` | 02, 03 | Destructuring **en el parámetro** en `coffeeCard`, reutilizando `formatPrice` importado. `[first, ...others]` en `mainNote`. `{ stock, ...rest }` en `toPublicCoffee` (comprobad con `npx tsc` si el `stock` sin usar da aviso y entended por qué). `sumAll(...amounts)` con `reduce` y valor inicial 0. 📝: el `...` de `sumAll(...coffees.map(...))` es spread, no rest. |
| O4 · Opcionales | `src/o04-opcionales.ts` | 04 | `?.` y `??` sin ningún `if`. `finalPrice` con descuento `?? 0`. 🪤: `wantsNewsletter` con `\|\|` da `true` para Lucía porque `false` es falsy; `??` solo reemplaza `null`/`undefined`. |
| O5 · Métodos de arrays | `src/o05-arrays.ts` | 25 | Ni un bucle. `filter → toSorted → map` encadenado en `catalogLabels`. `reduce` con valor inicial en `stockValue`. `some`, `every`, `find` + `?.name ?? "No existe"`. 🔍: con `sort` el catálogo original queda reordenado (muta). |
| O6 · Carrito inmutable ⭐ | `src/o06-carrito.ts` | 20, 21, 25 | La más importante (es cómo se gestiona el estado en React). Nada de `push`, `splice`, `++` ni asignaciones. `addToCart`: `some`/`find` + `map` que devuelve `{ ...item, quantity: item.quantity + 1 }` solo para el que cambia y **el mismo objeto** para los demás (`cart3[1] === cart2[1]` → `true`); si no está, `[...cart, { coffeeId, quantity: 1 }]`. `removeFromCart` con `filter`. `changeQuantity` reutiliza `removeFromCart` si `quantity <= 0`. `cartTotal` con `reduce` + `find` + `finalPrice`, contando 0 si no existe el café. |
| O7 · ¿Pura o impura? | `src/o07-pureza.ts` | 22 | Por cada función: pura/impura y qué condición rompe (depende de estado externo, muta la entrada, no es determinista). 1 lee `shippingCost` mutable de fuera; 2 muta el café; 3 es pura; 4 `sort` muta la lista; 5 `Date.now()` no es determinista; 6 es pura ("Mutar dentro es aceptable": el array es local). Escribir versiones puras de las impuras (parámetro extra, spread, `toSorted`, inyectar el valor). |
| O8 · Uniones, Record y genéricos | `src/o08-uniones-genericos.ts` | 13, 14, 15 | `OrderStatus` unión de literales. `Record<OrderStatus, string>`: el 🔍 de borrar `delivered` da error porque falta una clave. `normalizeId` con guarda `typeof`. `findById<T extends { id: number }>` con `find(...) ?? null`. 🔍: el tipo inferido es `Coffee \| null` y `Customer \| null`. |
| O9 · Tipos de utilidad | `src/o09-utilidad.ts` | 15, 21 | Derivar de `Coffee`, nunca copiar a mano. `Pick` para `CoffeePreview`, y `toPreview` construye un objeto nuevo solo con esas 3 propiedades (no devolver el café entero). `Omit<Coffee, "id">` para `NewCoffee`; `Math.max(...list.map(c => c.id)) + 1`. `updateCoffee` con `{ ...coffee, ...changes }` y `Partial<NewCoffee>` (el id no se puede cambiar). `countByRoast` → `Record<Roast, number>` con `reduce` sin mutar la entrada. |
| O10 · Closures | `src/o10-closures.ts` | 23 | `type PriceRule = (price: number) => number`. `createDiscount` devuelve una función que recuerda `rate`. `createOrderIdGenerator` con `let count` en el closure; cada generador su propia cuenta. 📝: `.map(blackFriday)` pasa la función, no la llama; `blackFriday` es pura, `nextOrderId` no (cada llamada devuelve algo distinto). |
| O11 · Immer | `src/o11-immer.ts` | 21, 26 | `movedSpread` con un spread por nivel (`subscription`, `customer`, `address`). `movedImmer` y `upgraded` con `produce`: dentro del borrador sí se muta (`push` permitido). Entender por qué `movedImmer.plan === subscription.plan` y por qué el resultado está congelado (`Object.isFrozen`). 📝: cuándo spread y cuándo Immer. |
| O12 · README + bitácora | `README.md`, `bitacora.md` | — | Cómo arrancar y dónde se ve la salida; captura de la consola; `npx tsc` limpio; respuestas 📝/🔍 (o enlaces a los comentarios); checklist O/P/D; al menos 3 entradas "Prompt / Qué me dio / Qué corregí y por qué". Lo valioso es lo que hubo que corregir de la IA. |

## Opcionales (20 %)

| Kata | Temas | Puntos de revisión |
|---|---|---|
| P1 · Tests con Vitest | 22 | `npm install -D vitest`; convertir las salidas de O5 y O6 en `expect`. Incluir tests de "no muta el original" y de referencias (`toBe` frente a `toEqual`). Ejecutar con `npx vitest run`. |
| P2 · Deshacer en el carrito | 22 ("Historial gratis"), 23 | Closure con un array de carritos (historial de referencias), reutilizando `addToCart`. `undo` no debe pasar del carrito vacío inicial. |
| P3 · Agrupar con reduce | 25, 21 | `Record<Roast, Coffee[]>`, acumulador nuevo en cada vuelta con spread, sin `push`. Valor inicial con las tres claves. |
| P4 · sortBy genérico | 14 | `<T, K extends keyof T>`, `T[K]`, `toSorted`, `localeCompare` para textos. Que `sortBy(coffees, "color")` dé error de TS. |
| P5 · `unknown` | 10, 13 | `isCoffee(data: unknown)` con `typeof`, `Array.isArray`, `in`, comprobando tipos de cada propiedad. Sin `as Coffee`. El ejemplo debe dar `false`. Bonus: tipo predicado `data is Coffee`. |
| P6 · myMap y myFilter | 14, 25 ("Por dentro no tiene misterio") | Genéricos `<T, U>`, sin usar los nativos; el array resultado es local (mutarlo dentro es aceptable). Pasar el `index` al callback. |
| P7 · Tipos del TFM | 11–15, 22 | Interfaces, una unión de literales, `Omit`/`Partial` para crear/editar y tres funciones puras. |

## Desafíos (15 %)

| Kata | Temas | Puntos de revisión |
|---|---|---|
| D1 · Catálogo en la landing | 22, 25 | Funciones puras que reciben datos y devuelven HTML (texto); una sola función final toca el DOM (`querySelector` + `innerHTML` o `createElement`). |
| D2 · Uniones discriminadas | 13 | `switch (method.type)` con estrechamiento por `case`; `default` con `assertNever(value: never): never` para que TS avise si falta un caso. |
| D3 · Coste de la inmutabilidad | 20, 21, 22 | 20 000 vueltas con `list = [...list, i]` frente a `push`, medido con `performance.now()`. Explicar por qué spread en bucle es O(n²) y `map` no (crea un único array). |
| D4 · Reducer con Immer | 13, 26 | `CartAction` unión discriminada; `cartReducer` con `produce`, mutando el borrador en cada `case` y devolviendo `[]` en `"clear"`; `actions.reduce(cartReducer, [])`. |
| D5 · myReduce | 14, 25 | `myReduce<T, A>` sin `Array.prototype.reduce`/`reduceRight` (bucle `for...of` con acumulador local). Reescribir `stockValue` y `countByRoast` con él. |
