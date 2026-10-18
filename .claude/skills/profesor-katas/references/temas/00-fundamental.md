# Tema 00 · Expresiones básicas
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/00-fundamental.md

Apartados del apunte: Variables · Tipos de datos (Primitivos, OBJETOS: Objetos literales, Arrays, Funciones) · Operadores (Aritméticos, Lógicos, Comparación) · Directivas de control de flujo (condicionales, iterativas) · Hoisting.

## Ideas clave
- **Variables**: JavaScript es un lenguaje *dinámico y débilmente tipado*: las variables no están asociadas a ningún tipo.
- Tres formas de declarar: `let`, `const` y `var`. `let` permite reasignar; `const` no se puede reasignar y **debe incluir la asignación** al declararse.
- `let` y `const` no se pueden redeclarar con el mismo nombre en el mismo ámbito, ni usarse antes de declararse.
- **Tipos de datos**: dos grandes grupos, tipos PRIMITIVOS (un único dato simple) y tipos estructurales u OBJETOS. "7 PRIMITIVOS (2 de nueva incorporación) + OBJETOS".
- Primitivos: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.
  - Strings con comillas dobles, simples o backticks; los de backticks son *template literals* y permiten interpolar con `${}`.
  - `number` incluye enteros, flotantes, notación exponencial, `Infinity` y `NaN`.
  - `null`: ausencia **intencional** de valor ("aquí no hay nada, a propósito"). `undefined`: ausencia de valor, valor por defecto de lo no inicializado.
  - `symbol`: identificador único. `bigint`: enteros de precisión arbitraria (`103n`, `BigInt(103)`).
- `typeof` permite conocer el tipo de dato de una variable (ojo: `typeof null` es `"object"`).
- **Objetos literales**: diccionario clave-valor no ordenado; claves string, number o symbol. Notación *shorthand* `{ name, age }`. CRUD con notación punto y corchetes, y `delete`.
- **Arrays**: estructura ordenada; en esencia un objeto con claves indexadas (`typeof` → `"object"`). CRUD: `users[0]`, `at(0)`, `push`, `pop`, `length`.
- **Funciones**: también son objetos, invocables; `typeof` devuelve `"function"`.
- **Operadores**: aritméticos (`+ - * / % **`), `+` concatena strings, asignación combinada (`+=`, `/=`), pre/post incremento y decremento.
- **Lógicos** `&&` y `||` sobre valores no booleanos: se evalúan como *truthy* / *falsy*. Falsy: `0`, `NaN`, `false`, `""`, `null`, `undefined`; el resto es truthy.
- **Comparación**: igualdad débil (`==`, `!=`) e igualdad estricta/fuerte (`===`, `!==`). Los objetos se comparan por **referencia**.
- **Control de flujo**: `if/else` (1, 2 o n ramas, con o sin llaves), `switch` con `break`, expresión ternaria (también encadenada); bucles `for`, `while`, `do while`, `for of` (elementos de un iterable) y `for in` (claves enumerables propias y heredadas).
- **Hoisting**: el lenguaje registra las declaraciones antes de ejecutar; "mueve las declaraciones a la parte superior del ámbito". Afecta a `function` y a `var`. Con `let`/`const` existe la **Temporal Dead Zone (TDZ)**: acceder antes de la declaración da `ReferenceError`.

## Buenas prácticas que defiende el apunte
- **No usar `var`**: está desaconsejado porque permite redeclarar (el segundo valor pisa al primero sin aviso y un despiste pasa desapercibido) y por el *hoisting*, que esconde bugs que deberían detectarse de inmediato.
- Usar `const` cuando no se vaya a reasignar y `let` cuando sí.
- **Usar siempre la igualdad estricta** (`===`), porque la débil aplica *type coercion* antes de comparar.
- En `switch`, usar `break` para no ejecutar ramas posteriores.
- En `while`/`do while`, no olvidar actualizar la variable de control o habrá bucle infinito.
- Los operadores de asignación combinada requieren variables que NO sean `const`.

## Ejemplos canónicos
```js
const a;      // Error: const debe incluir el valor
const a = 3;
a = 14;       // Error de ejecución: no se puede reasignar

var d = 3;
var d = 14;   // Sin error: pisa el valor sin aviso
```

```js
let a;
a = 3 || 20;          // 3
a = 0 || 20;          // 20
a = 3 && 20;          // 20
a = 0 && 20;          // 0
a = 2 > 0 && "hello"; // "hello"
```

```js
const nums1 = [1, 2, 3];
const nums2 = [1, 2, 3];
const nums3 = nums1;
console.log(nums1 === nums2); // false, distintas referencias en memoria
console.log(nums1 === nums3); // true, misma referencia en memoria
```

```js
console.log(a); // undefined (hoisting de var)
var a = 5;

for (const p of products) {   // const vale: cada iteración tiene su propio ámbito
  console.log(p.name, p.price);
}
```

## Trampas y errores típicos
- `typeof null` devuelve `"object"`, y `typeof` de un array también es `"object"`.
- `5 == "5"` es `true` por *type coercion*; `5 === "5"` es `false`.
- Dos arrays/objetos con el mismo contenido no son `===`: se compara la referencia.
- `||` devuelve el primer valor truthy, no necesariamente un booleano; `&&` devuelve el primer falsy o el último valor.
- Olvidar `break` en un `switch` ejecuta las ramas siguientes (salvo que se quiera reutilizar cases a propósito).
- Con `var`, la variable declarada dentro de un `if` o un `for` "se escapa" del bloque (`console.log(i); // 3` tras el bucle) y una redeclaración interna pisa la externa.
- Usar `let`/`const` antes de su declaración: `ReferenceError` (TDZ), mientras que con `var` se obtiene `undefined` silencioso.
- `for in` itera también claves heredadas del prototipo (si son enumerables).

## Preguntas para comprobar que se ha entendido
- Si `const` impide reasignar, ¿por qué crees que debe llevar la asignación en la misma línea?
- ¿Qué devuelve `0 || 20` y por qué? ¿Y `0 && 20`? ¿Qué regla estás aplicando?
- ¿Por qué `[1, 2, 3] === [1, 2, 3]` es `false`? ¿Qué tendría que pasar para que fuera `true`?
- ¿Qué diferencia hay entre acceder a una variable `var` y a una `let` antes de su línea de declaración? ¿Cuál de los dos comportamientos te ayuda más a detectar bugs?
- ¿Cuándo elegirías `for of` y cuándo `for in`? ¿Qué recorre cada uno?
