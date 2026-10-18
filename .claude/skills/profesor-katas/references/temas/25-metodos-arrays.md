# Tema 25 · Métodos de arrays
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/25-metodos-arrays.md

## Ideas clave
- Los métodos de arrays se separan en dos grupos: los que **mutan** el array (lo cambian en el sitio y suelen devolver otra cosa: la nueva longitud o el elemento quitado) y los que **no lo tocan** (devuelven uno nuevo o un valor calculado).
- El apunte recorre cada operación: primero cómo se hace mutando, después su contraparte inmutable. Catálogo de ejemplo: `products` con `name`, `price`, `stock`.
- **Añadir: `push` y `unshift` → spread y `concat`**. `push`/`unshift` mutan y devuelven la nueva longitud. `concat` además desempaqueta un nivel de los arrays que recibe.
- **Quitar: `pop`, `shift` y `splice` → `slice` y `toSpliced`**. `pop`/`shift` devuelven el elemento quitado; `splice(inicio, cantidad)` muta y devuelve lo quitado. `slice(inicio, fin)`: `fin` no entra, negativos cuentan desde el final. `toSpliced` recibe lo mismo que `splice` pero devuelve el array resultante.
- **Reemplazar: `cart[i] = x` → `with`**: `with(índice, valor)` devuelve un array nuevo.
- **Ordenar e invertir: `sort` y `reverse` → `toSorted` y `toReversed`**. `sort` es "el más traicionero": muta y además devuelve el mismo array; sin comparador ordena como texto. Comparador: negativo si el primero va antes, positivo si después; para números, restar.
- **Transformar todos los elementos: bucle → `map`**: aplica una función a cada elemento y devuelve un array nuevo. El callback recibe el índice como segundo argumento.
- **"Por dentro no tiene misterio"**: `map` es el bucle de antes construyendo un array local; mutarlo es seguro porque nadie más lo conoce hasta que se devuelve (enlaza con tema 22, "Mutar dentro es aceptable").
- **Quedarse con algunos: bucle con `if` → `filter`**: recibe un **predicado** (función que devuelve `true`/`false`). Su implementación es el mismo bucle que `map` con un `if`.
- **Calcular un valor a partir de todos: acumulador → `reduce`**: función (acumulador, elemento) + valor inicial; lo que devuelve en cada vuelta es el acumulador de la siguiente. El resultado puede ser cualquier cosa. Sin valor inicial, el primer elemento hace de acumulador.
- **Comprobar condiciones: `some` y `every`**. Con array vacío: `some` → `false`, `every` → `true`.
- **Encadenar**: como cada método inmutable devuelve un array nuevo, se encadenan.
- `forEach` es **"el impuro de la familia"**: no devuelve nada, sólo sirve para efectos secundarios y no se encadena.

## Buenas prácticas que defiende el apunte
- Preferir la contraparte inmutable: spread/`concat`, `slice`/`toSpliced`, `with`, `toSorted`/`toReversed`, `map`, `filter`, `reduce`.
- Pasar siempre un comparador a `sort`/`toSorted` con números (`(a, b) => a - b`).
- En `map`, devolver un **objeto nuevo** por elemento (`({ ...product, price: ... })`), recordando los paréntesis para devolver un objeto literal desde una flecha.
- Extraer predicados y transformaciones con nombre (`inStock`, `byPrice`, `toLabel`) y encadenar.
- Si el objetivo es obtener un valor nuevo, no usar `forEach`: hay un método que lo devuelve.

## Ejemplos canónicos
```js
const prices = [10, 9, 1];
const sorted = prices.sort();
console.log(sorted);            // [1, 10, 9]. Ordena como texto
console.log(prices === sorted); // true. Es el mismo array
prices.toSorted((a, b) => a - b); // [1, 9, 10], sin mutar
```

```js
// Por dentro no tiene misterio
const map = (collection, transform) => {
  const result = [];
  for (const element of collection) result.push(transform(element));
  return result;
};
```

```js
// La trampa: un callback que muta
const updated = products.map((product) => {
  product.price = product.price * 1.21; // Muta el objeto original
  return product;
});
updated === products;       // false. El array es nuevo...
updated[0] === products[0]; // true. ...pero los objetos son los mismos
// Correcto:
products.map((product) => ({ ...product, price: product.price * 1.21 }));
```

```js
const total = products.reduce((sum, product) => sum + product.price, 0); // 1099
```

```js
const labels = products.filter(inStock).toSorted(byPrice).map(toLabel);
// ["Keyboard: 75 €", "Laptop: 999 €"]
```

## Trampas y errores típicos
- Guardar el resultado de `sort` en otra variable pensando que protege el original: es el mismo array.
- `sort()` sin comparador sobre números: `[1, 10, 9]`.
- **"La trampa: un callback que muta"**: `map` crea un array nuevo, pero los elementos son los objetos originales; mutarlos muta el catálogo (copia superficial del tema 21).
- Olvidar los paréntesis al devolver un objeto literal desde una flecha.
- Usar `forEach` cuando se quiere un valor nuevo.
- Olvidar los casos borde de `some`/`every` con array vacío.

## Preguntas para comprobar que se ha entendido
- ¿Qué devuelve `push`? ¿Y `pop`? ¿Por qué eso es una pista de que mutan?
- `map` usa `push` por dentro. ¿Por qué sigue siendo un método que no muta?
- Si `updated !== products`, ¿podemos asegurar que el catálogo no ha cambiado? ¿Por qué no?
- ¿Por qué `[].every(...)` es `true`?
- ¿Por qué se puede encadenar `filter().toSorted().map()` pero no `forEach`?
