# Tema 03 · Rest operator
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/03-operador-rest.md

Apartados del apunte: Rest en parámetros de función · Rest en destructuring de arrays · Rest en destructuring de objetos · Rest y destructuring en parámetros · Rest y spread.

## Ideas clave
- El **operador rest (`...`)** agrupa "el resto" de valores en un único array u objeto. Llegó en ES6 (2015) para parámetros de función y arrays; desde ES2018 también funciona con propiedades de objetos.
- **Rest en parámetros de función**: es la alternativa actual a `arguments` (que sólo existe en funciones `function`). Agrupa en un array los argumentos recibidos y **funciona también en funciones flecha**.
  - A diferencia de `arguments`, el parámetro rest es **un array de verdad**: tiene todos sus métodos.
  - Si no se pasa nada, el parámetro rest es un array vacío (`[]`).
  - Se pueden aislar parámetros iniciales y agrupar el resto: `(greeting, ...names)`.
  - El parámetro rest **siempre debe ser el último, y sólo puede haber uno**.
- **Rest en destructuring de arrays**: extrae los primeros elementos y agrupa los restantes en un nuevo array (`const [first, ...others] = numbers`). Si no quedan elementos, array vacío.
- **Rest en destructuring de objetos**: extrae las propiedades que interesan y agrupa las restantes en un **nuevo objeto**. **El objeto original no se modifica**.
- **Rest y destructuring en parámetros**: combinación muy habitual, p. ej. `({ country, ...others }) => others`, para eliminar propiedades sin modificar el original ("quedarnos con lo que nos interesa").
- **Rest y spread**: la misma sintaxis `...` sirve para la operación contraria, *spread* (el apunte la deja para otra sección). Se distinguen por **dónde aparece**:
  - Donde se **declaran** variables o parámetros es **rest**: agrupa varios valores en uno.
  - Donde se **crean** valores o se invoca una función es **spread**: expande un valor en varios.

## Buenas prácticas que defiende el apunte
- Usar el parámetro rest en lugar de `arguments`: es un array real y vale para arrow functions.
- Para "quitar" propiedades de un objeto, usar destructuring + rest en vez de modificar (`delete`) el original: se obtiene un objeto nuevo y el original queda intacto.

## Ejemplos canónicos
```js
const sum = (...nums) => {
  let total = 0;
  for (const num of nums) {
    total += num;
  }
  return total;
};
console.log(sum(1, 2, 3)); // 6   (nums = [1, 2, 3])
console.log(sum());        // 0   (nums = [])
```

```js
const greetAll = (greeting, ...names) => {
  for (const name of names) console.log(`${greeting}, ${name}!`);
};
const greetAll = (...names, greeting) => {};
//                ^^^^^^^^ SyntaxError: el parámetro rest debe ser el último
```

```js
const [first, ...others] = ["one", "two", "three"];
console.log(first);  // "one"
console.log(others); // ["two", "three"]
```

```js
const { country, ...others } = student;
console.log(others);  // { name: "Evan", surname: "Smith" }
console.log(student); // intacto, sigue teniendo country

const excludeCountry = ({ country, ...others }) => others;
```

## Trampas y errores típicos
- Poner el rest en una posición que no sea la última, o usar dos rest: `SyntaxError`.
- Pensar que el rest de objetos modifica el original: crea un objeto nuevo.
- Esperar `undefined` cuando no quedan elementos: el rest da un array vacío `[]` (o un objeto con lo que quede).
- Confundir rest con spread: misma sintaxis `...`, significado opuesto; hay que mirar si estamos **declarando** (rest) o **creando/invocando** (spread).

## Preguntas para comprobar que se ha entendido
- ¿Qué ventaja concreta tiene `...nums` frente a `arguments`? ¿En qué tipo de función sólo funciona la segunda?
- ¿Qué vale `names` en `greetAll("Hello")`? ¿Por qué no se rompe el `for of`?
- ¿Por qué el lenguaje obliga a que el parámetro rest sea el último?
- Tras `const { country, ...others } = student`, ¿qué contiene `student`? ¿Y `others`?
- Viendo `...` en una línea de código, ¿qué pregunta te haces para saber si es rest o spread?
