# Tema 01 · Funciones
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/01-funciones.md

Apartados del apunte: Funciones clásicas · Funciones flecha · Parámetros por defecto.

## Ideas clave
- **Funciones clásicas**: las funciones son un tipo especial de objeto que puede ser invocado y ejecutar instrucciones. Declaran entre 0 y n parámetros y, opcionalmente, un valor de retorno (`return`).
- Dos formas clásicas:
  - **Función como declaración**: `function applyIva(price) { ... }`.
  - **Función anónima como expresión**: `const applyIva = function (price) { ... };`.
- Se puede invocar una función sin argumentos o con argumentos en exceso: JavaScript no lo impide.
- La variable especial `arguments` **sólo existe en funciones `function`**.
- **Hoisting**: las funciones creadas como expresión no se pueden invocar antes de la línea donde se asignan (a diferencia de las declaraciones `function`).
- **Funciones flecha** (*arrow functions*): `const applyIva = (price) => { ... };`.
  - Forma simplificada: con un solo parámetro se pueden quitar los paréntesis; si sólo hay una sentencia de retorno se quitan las llaves y el `return`: `price => price * 1.21`.
  - Para devolver un objeto literal sin `return`, hay que **envolverlo entre paréntesis**.
  - No tienen `arguments`; el equivalente es el **operador rest** (tema 03).
- **Parámetros por defecto**: se activan cuando no se pasa el argumento o cuando se pasa explícitamente `undefined`. Funcionan igual en `function` y en funciones flecha.

## Buenas prácticas que defiende el apunte
- Usar la forma simplificada de las arrow functions cuando el cuerpo es una única expresión de retorno.
- Al devolver objetos sin `return`, encerrar el objeto entre paréntesis para que las llaves no se confundan con las del cuerpo de la función.
- En arrow functions, en lugar de `arguments`, usar el operador rest.
- Aprovechar la notación *shorthand* al construir objetos a partir de parámetros (`{ name, surname, age }`).

## Ejemplos canónicos
```js
// Función como declaración
function applyIva(price) {
  const iva = 0.21;
  return price * (1 + iva);
}
console.log(applyIva(200)); // 242
```

```js
const result = applyIva(200);
//             ^^^^^^^^ ReferenceError: no accesible antes de ser declarada
const applyIva = function (price) {
  const iva = 0.21;
  return price * (1 + iva);
};
```

```js
// Arrow function simplificada
const applyIva = price => price * 1.21;

// Devolver un objeto: entre paréntesis
const toObject = (name, surname, age) => ({ name, surname, age });
```

```js
function greet(name = "Unknown") {
  console.log(`Hello, ${name}!`);
}
greet("Jake");    // "Hello, Jake!"
greet();          // "Hello, Unknown!"
greet(undefined); // "Hello, Unknown!"
greet(null);      // "Hello, null!"
```

## Trampas y errores típicos
- Invocar una función expresión (`const f = function ...` o arrow) antes de su línea: `ReferenceError`. Sólo las declaraciones `function` se pueden usar antes (hoisting).
- Escribir `() => { name, surname }` pensando que devuelve un objeto: las llaves se interpretan como cuerpo de función. Hay que usar `() => ({ ... })`.
- Usar `arguments` dentro de una arrow function: no existe.
- Creer que el parámetro por defecto se aplica con `null`: sólo se activa con `undefined` o con el argumento ausente (`greet(null)` → `"Hello, null!"`).
- En JS pasar menos o más argumentos de los declarados no da error; los que faltan quedan `undefined`.

## Preguntas para comprobar que se ha entendido
- ¿Por qué puedes llamar a una función `function` antes de declararla, pero no a una `const f = function ...`?
- ¿Qué devuelve `const f = () => { a: 1 }` al invocarla? ¿Cómo lo arreglarías?
- Si llamas a `greet(null)` con `name = "Unknown"` por defecto, ¿qué se imprime y por qué?
- ¿Qué dos simplificaciones permite una arrow function y bajo qué condiciones exactas?
- Si necesitas recoger todos los argumentos dentro de una función flecha, ¿qué usarías en lugar de `arguments`?
