# Tema 02 · Destructuring
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/02-destructuring.md

Apartados del apunte: Destructuring en objetos · Destructuring en arrays · Valores por defecto · Destructuring en bucles · Destructuring sobre `null` y `undefined`.

## Ideas clave
- El **destructuring (desestructuración)** permite extraer valores de arrays u objetos y asignarlos a variables en una sola expresión, en lugar de acceder a cada valor uno por uno.
- **Destructuring en objetos**:
  - El orden de izquierda a derecha es `propertyName: variableName` (renombrado): `const { name: name } = student`.
  - Notación *shorthand*: `const { name, surname } = student`.
  - **Anidado**: `const { country: { name: countryName, iso } } = student`.
  - Se puede extraer a la vez el objeto anidado y sus propiedades (`..., country } = student`).
  - Se puede aplicar en **parámetros de una función**: `({ name, surname }) => ...`.
- **Destructuring en arrays**: extrae desde el primer índice; **el orden importa**. Un índice inexistente da `undefined`.
  - La coma permite **omitir elementos intermedios**: `([, second]) => second`.
  - Admite destructuring anidado: `const [, [, center]] = matrix`.
  - Como los arrays son objetos, se puede usar la sintaxis de objeto para índices concretos: `const { 0: {...}, 2: {...} } = users`.
- **Valores por defecto** con `=`: `const { name = "Unknown" } = user`, con renombrado `{ name: username = "Unknown" }`, en arrays `[r, g, b, alpha = 1]` y en parámetros `({ name, age = 18 }) => ...`.
- El valor por defecto **sólo se activa con `undefined`**; con `null` se queda `null`.
- **Destructuring en bucles**: directamente en el `for of`: `for (const { name, price } of products)`.
- **Destructuring sobre `null` y `undefined`**: una propiedad inexistente da `undefined` sin error, pero desestructurar un valor que **es** `null`/`undefined` lanza `TypeError`.

## Buenas prácticas que defiende el apunte
- Preferir destructuring a crear una variable por línea con accesos `obj.prop`.
- Renombrar (`name: countryName`) cuando dos propiedades se llamarían igual, en vez de chocar con el nombre.
- Usar un valor por defecto `= {}` en un objeto anidado opcional para evitar el `TypeError` cuando falta (`undefined`).
- No recurrir a `var` para "arreglar" la redeclaración: funciona, pero la última asignación pisa la anterior sin aviso.

## Ejemplos canónicos
```js
const { name, country: { name: countryName, iso } } = student;
console.log(countryName); // "Spain"
console.log(iso);         // "ES"
console.log(name);        // "Evan"
```

```js
const rgb = [255, 100, 50];
const [red, green, blue, other] = rgb; // other: undefined
const getGreen = ([, second]) => second;
console.log(getGreen(rgb)); // 100
```

```js
const { age, name = "Unknown" } = user;   // name: "Unknown"
const [red, green, blue, alpha = 1] = rgb; // alpha: 1

const draft = { id: null };
const { id = 0 } = draft;
console.log(id); // null  -> el defecto sólo se activa con undefined
```

```js
const { country: { iso } = {} } = student; // iso: undefined, sin error

const draft = { country: null };
const { country: { iso } = {} } = draft;
//                 ^^^ TypeError: el valor por defecto no se activa con `null`
```

## Trampas y errores típicos
- Confundir el orden del renombrado: es `propiedad: variable`, no al revés.
- Reutilizar el mismo nombre de variable en un destructuring anidado (`{ name, country: { name: name } }`): `SyntaxError` con `const`/`let`; con `var` "funciona" pero `name` acaba valiendo `"Spain"`.
- En arrays olvidar que el orden de las variables determina qué elemento se extrae.
- Esperar que el valor por defecto sustituya a `null`: no lo hace.
- Desestructurar una propiedad anidada cuyo padre no existe (`const { country: { iso } } = student` sin `country`): `TypeError`. Igual con `const { id } = null` o `= undefined`.

## Preguntas para comprobar que se ha entendido
- En `const { name: username } = user`, ¿qué variable se crea y de qué propiedad sale su valor?
- ¿Cómo extraerías sólo el tercer elemento de un array sin declarar variables para los dos primeros?
- Con `const { id = 0 } = { id: null }`, ¿qué vale `id`? ¿Y si el objeto fuera `{}`? ¿Por qué la diferencia?
- ¿Por qué `const { surname } = student` no falla aunque no exista `surname`, pero `const { country: { iso } } = student` sí?
- ¿Cuándo te protege `= {}` en un destructuring anidado y cuándo no?
