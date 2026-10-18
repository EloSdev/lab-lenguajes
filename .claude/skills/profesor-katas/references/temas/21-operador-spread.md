# Tema 21 · Operador spread
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/21-operador-spread.md

## Ideas clave
- `...` es la misma sintaxis que el operador rest pero hace lo contrario: **expande** los elementos de un array o las propiedades de un objeto donde se esperan varios valores.
- Regla para distinguirlos: donde se **declaran** variables o parámetros es rest; donde se **construye** un array, un objeto o se **invoca** una función es spread.
- Es la herramienta para **crear valores nuevos a partir de otros sin mutarlos**.
- **Spread en arrays**: `[...original]` crea un array distinto (`original === copy` es `false`). Sirve para añadir al final, al principio o combinar arrays sin tocar los originales (frente a `push`, que muta).
- **Spread en objetos**: `{ ...julia }` copia cada propiedad en un objeto nuevo.
- Si tras el spread escribimos una propiedad ya existente, la nueva la sustituye: así se "modifica" un objeto sin mutarlo. Como en CSS, **prevalece la última**.
- **El orden importa**: gana la última propiedad escrita; si el spread va al final, sobrescribe lo anterior.
- Con dos spreads se combinan objetos: `updateUser` queda en una línea.
- **Spread en argumentos de función**: `Math.max(...numbers)` pasa cada elemento como argumento independiente.
- **La copia es superficial** (_shallow copy_): copia un solo nivel; los objetos anidados se comparten por referencia.
- Para cambiar algo anidado sin mutar hay que hacer **spread en cada nivel del camino**.
- Con arrays de objetos igual: `[...users]` es un array nuevo, pero los usuarios son los mismos objetos.
- **Otras formas de copiar**: `Object.assign({}, ...)` (anterior a spread, también superficial) y `structuredClone` (copia en profundidad).

## Buenas prácticas que defiende el apunte
- Usar spread para "modificar" creando un objeto/array nuevo con el cambio, en lugar de mutar.
- Para estructuras anidadas, hacer spread en cada nivel del camino hasta el cambio.
- Con `Object.assign`, pasar siempre un objeto vacío como primer argumento; si no, muta ese primer objeto.
- `structuredClone` para copia profunda, sabiendo sus dos límites: es más lento que una copia superficial y no admite funciones.
- "En la práctica, la copia superficial con spread es la habitual: casi siempre cambiamos un nivel concreto y compartimos el resto."

## Ejemplos canónicos
```js
const numbers = [1, 2, 3];
const extended = [...numbers, 4];   // [1, 2, 3, 4]
const prepended = [0, ...numbers];  // [0, 1, 2, 3]
console.log(numbers);               // [1, 2, 3]. Intacto
```

```js
const julia = { name: "Julia", age: 30 };
const older = { ...julia, age: 31 };        // { name: "Julia", age: 31 }
const stillThirty = { age: 31, ...julia };  // { age: 30, name: "Julia" }. Gana el de julia
```

```js
const updateUser = (user, changes) => ({ ...user, ...changes });
```

```js
// La copia es superficial
const copy = { ...julia };              // julia tiene address: { city: "Málaga", ... }
copy.address.city = "Sevilla";
console.log(julia.address.city);        // "Sevilla". Objeto anidado compartido

// Spread en cada nivel
const moved = { ...julia, address: { ...julia.address, city: "Sevilla" } };
```

```js
const clone = structuredClone(julia);
console.log(clone.address === julia.address); // false
structuredClone({ name: "Julia", greet() {} }); // DataCloneError
```

## Trampas y errores típicos
- Creer que `{ ...obj }` copia en profundidad: modificar `copy.address.city` muta el original (`julia.address === copy.address` es `true`).
- Poner el spread después de la propiedad que se quería cambiar: `{ age: 31, ...julia }` deja `age: 30`.
- `[...users]` no clona los usuarios: son los mismos objetos.
- `Object.assign(julia, { age: 31 })` muta `julia` si el primer argumento no es un objeto vacío.
- `structuredClone` sobre un objeto con métodos lanza `DataCloneError`.

## Preguntas para comprobar que se ha entendido
- Viendo `...` en una línea de código, ¿cómo sabes si es rest o spread?
- ¿Qué imprime `{ age: 31, ...julia }` y por qué? ¿Qué regla de CSS se parece?
- Si haces `const copy = { ...julia }` y cambias `copy.address.city`, ¿qué pasa con `julia`? ¿Cómo lo evitarías sin `structuredClone`?
- ¿Por qué el apunte considera la copia superficial "la habitual" aunque exista `structuredClone`?
- ¿Cuándo `Object.assign` deja de ser equivalente a un spread?
