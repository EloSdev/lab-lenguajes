# Tema 13 · Unión, intersección y tipos literales
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/13-union-interseccion-literales.md

## Ideas clave
- Dos operadores para combinar tipos: la **unión** (`|`), que admite un tipo **u** otro, y la **intersección** (`&`), que exige un tipo **y** otro. El resultado es un tipo nuevo que se puede nombrar con un alias.
- **Unión**: el valor puede ser de cualquiera de los tipos. Evita recurrir a `any` (p. ej. un id que llega como `number` desde la BD y como `string` desde la URL).
- **Sólo lo que tienen en común**: dentro de la función sólo se puede hacer lo válido para **todos** los miembros de la unión. Para lo específico hay que comprobar el tipo (`typeof`): en cada rama TypeScript **reduce la unión** al tipo comprobado.
- **Unión con `null`**: la más habitual; un valor que puede no existir (relacionado con `strictNullChecks`). Se declara en el retorno (`Order | null`) y TypeScript obliga a contemplarlo.
- **Uniones y arrays**: los paréntesis importan. `(string | number)[]` mezcla elementos; `string[] | number[]` es uno u otro, sin mezclar.
- **Intersección**: el valor cumple todos los tipos a la vez; con objetos, tiene las propiedades de todos. Forma de componer parecida a `extends`.
- **Propiedades en conflicto**: misma propiedad con tipos distintos -> la propiedad pasa a ser `never`; el error aparece al crear un valor, no al declarar. Con `extends` el conflicto se detecta en la propia declaración.
- **Intersección de primitivos**: sólo tiene sentido con objetos; `string & number` es `never`.
- **Tipo literal**: un valor concreto usado como tipo (`"pending"`, `5`). Unido a otros literales limita un valor a un **conjunto cerrado de opciones**.
- Inferencia: con `const` TypeScript infiere el **literal**; con `let` infiere `string` (porque puede cambiar).
- **`keyof`: las claves como unión de literales**. Construye la unión de nombres de propiedades de un tipo y la mantiene al día.
- `User[keyof User]` es la unión de los tipos de todas las propiedades (`string | number`).

## Buenas prácticas que defiende el apunte
- Preferir uniones a `any` para no perder la comprobación de tipos.
- Usar `?.` y `??` como forma más directa de contemplar el caso `null`.
- Uniones de literales como **alternativa a los enumerados**: no generan código, no hay que importar nada y el editor autocompleta igual.
- Anotar la variable (`let current: OrderStatus = "pending"`) para que conserve el tipo literal.
- **Componer interfaces con `extends`** y reservar la intersección para los alias (que no tienen `extends`), porque `extends` detecta antes los conflictos.
- Tipar el nombre de propiedad con `keyof` en lugar de `string`.

## Ejemplos canónicos
```ts
const normalizeId = (id: string | number): number => {
  if (typeof id === "string") {
    return parseInt(id, 10); // Aquí `id` es string
  }
  return id; // Aquí `id` es number
};
```

```ts
type Product = Entity & Timestamps & { name: string; price: number };

type Conflict = { id: number } & { id: string }; // `id` es never
const bad: Conflict = { id: 1 };
//                      ^^ [ts] Type 'number' is not assignable to type 'never'.
```

```ts
type OrderStatus = "pending" | "shipped" | "delivered";

const initial = "pending"; // Tipo "pending"
setStatus(initial);        // OK
let current = "pending";   // Tipo string
setStatus(current);
//        ^^^^^^^ [ts] Argument of type 'string' is not assignable to parameter of type 'OrderStatus'.
```

```ts
const getField = (user: User, field: keyof User): User[keyof User] => user[field];
getField(julia, "age");
//              ^^^^^ [ts] Argument of type '"age"' is not assignable to parameter of type 'keyof User'.
```

```ts
for (const key in car) {
  console.log(car[key as keyof Car]); // "Toyota", "Corolla", 2022
}
```

## Trampas y errores típicos
- Usar un método de un solo miembro de la unión sin estrechar: `Property 'toFixed' does not exist on type 'string | number'`.
- Acceder a un valor posiblemente `null`: `'order' is possibly 'null'`.
- Confundir `(string | number)[]` con `string[] | number[]`.
- Esperar que una intersección con propiedades en conflicto falle al declararla: falla al crear el valor (la propiedad es `never`).
- Intersecar primitivos (`string & number`) esperando algo útil: es `never`.
- Declarar con `let` un valor que debe ser literal: se infiere `string` y no encaja en la unión.
- Indexar un objeto con un `string`: `Element implicitly has an 'any' type...`. Pasa también con `for...in`, donde `key` es `string`; se resuelve con la aserción `key as keyof Car`.
- El mensaje de error muestra `keyof User` en lugar de la unión, pero es lo mismo.
- `getField` con `keyof User` sólo sirve para `User`; generalizarla requiere genéricos.

## Preguntas para comprobar que se ha entendido
- Dentro de una función que recibe `string | number`, ¿por qué no puedes llamar a `toFixed`? ¿Cómo lo resuelves?
- ¿Qué diferencia hay entre `(string | number)[]` y `string[] | number[]`? Pon un valor válido para uno y no para el otro.
- ¿Por qué el curso recomienda `extends` para interfaces y deja `&` para los alias?
- ¿Por qué `const initial = "pending"` encaja en `OrderStatus` y `let current = "pending"` no?
- ¿Qué tipo devuelve `getField(julia, "name")` en la versión con `keyof User`, y por qué no es exactamente `string`?
