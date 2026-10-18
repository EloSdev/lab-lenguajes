# Tema 20 · `const` y la mutabilidad
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/20-const-y-mutabilidad.md

## Ideas clave
- `const` es "una variable que no se puede **reasignar**"; se suele leer como "un valor que no cambia", y **no es lo mismo**. La diferencia entre reasignar y mutar es la base de la sesión.
  - **Reasignar**: hacer que la variable apunte a otro valor (`user = otroObjeto`).
  - **Mutar**: modificar el contenido del valor al que apunta (`user.age = 31`).
- **`const` protege la variable, no el valor**: sólo impide la reasignación. El objeto sigue siendo normal y modificable; **añadir propiedades también es mutar**.
- Con los **arrays** pasa lo mismo: `push`, la asignación por índice o `sort` mutan, y `const` no lo impide.
- Esto es **JavaScript puro**: TypeScript no cambia nada en ejecución; `const` y `readonly` son comprobaciones del compilador.
- **Los primitivos son inmutables** (string, number, boolean…): ninguna operación los cambia "por dentro"; todas **devuelven un valor nuevo**.
- **`i++` es una reasignación**: `++` y `+=` calculan un valor nuevo y reasignan la variable. Con strings, concatenar crea un string nuevo y lo asigna.
- **Dos variables, un mismo objeto**: con un primitivo, la segunda variable recibe una **copia del valor**; con un objeto recibe **la misma referencia** ("no hay dos objetos, hay dos nombres para el mismo").
- Al pasar un objeto a una función, el parámetro es **otra referencia al mismo objeto**: la función puede modificar el original.
- **Raíz del problema con la mutación**: cualquier parte del programa con la referencia puede cambiar el objeto, y el resto se entera tarde o nunca.

## Buenas prácticas que defiende el apunte
- No leer `const` como "constante/inmutable": razonar siempre en términos de reasignar vs. mutar.
- Ser consciente de que asignar un objeto a otra variable o pasarlo a una función **no lo copia**.
- No confiar en `const`/`readonly` para la inmutabilidad en ejecución (el apunte plantea la mutación como el problema a resolver en la sesión).

## Ejemplos canónicos
```js
const user = { name: "Julia", age: 30 };

user = { name: "Evan", age: 25 }; // TypeError: Assignment to constant variable.
user.age = 31;        // Modificamos el objeto, no la variable
user.city = "Málaga"; // Añadir propiedades también es mutar
```

```js
const numbers = [1, 2, 3];
numbers.push(4);      // Mutación
numbers[0] = 10;      // Mutación
numbers = [];         // TypeError: Assignment to constant variable.
```

```js
const word = "julia";
const shout = word.toUpperCase(); // "JULIA"; `word` sigue siendo "julia"
word[0] = "J"; // TypeError: Cannot assign to read only property '0' of string 'julia'

const total = 0;
total++; // TypeError: Assignment to constant variable.
```

```js
const julia = { name: "Julia", age: 30 };
const copy = julia; // No es una copia: las dos variables apuntan al mismo objeto
copy.age = 31;
console.log(julia.age);      // 31
console.log(julia === copy); // true, misma referencia
```

```js
const addYear = (person) => {
  person.age++; // Reasigna una propiedad, es decir, muta el objeto que recibe
};
addYear(julia);
console.log(julia.age); // 31. La función ha modificado el objeto original
```

## Trampas y errores típicos
- Creer que `const` hace inmutable un objeto o un array.
- Creer que `++`/`+=` modifican el número "por dentro": son reasignaciones, por eso fallan con `const`.
- Esperar que `word[0] = "J"` cambie el string. En modo estricto lanza `TypeError`; **sin modo estricto no lanza error, pero tampoco hace nada**.
- Pensar que `const copy = julia` crea una copia: es la misma referencia.
- No darse cuenta de que una función que recibe un objeto puede mutar el original (`person.age++`).
- Pensar que TypeScript protege en ejecución: el objeto sigue siendo mutable cuando el código corre.

## Preguntas para comprobar que se ha entendido
- Explica con tus palabras la diferencia entre reasignar y mutar. ¿Cuál de las dos impide `const`?
- Si `const numbers = [1, 2, 3]`, ¿qué líneas fallan: `numbers.push(4)`, `numbers[0] = 10`, `numbers = []`? ¿Por qué?
- ¿Por qué `total++` falla con `const total = 0` pero `user.age = 31` no falla con `const user`?
- Tras `const copy = julia; copy.age = 31;`, ¿cuánto vale `julia.age`? ¿Y si fueran números en `let a = 1; let b = a; b = 2`?
- ¿Por qué el apunte dice que la mutación es "la raíz del problema"? Piensa en `addYear`.
