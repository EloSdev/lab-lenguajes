# Tema 23 · Funciones como valores y closures
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/23-funciones-como-valores-y-closures.md

## Ideas clave
- En JavaScript **una función es un valor más**: se puede pasar como argumento, devolver desde otra función y guardar en variables.
- **Funciones como valores**: la función que pasamos como argumento y que la otra invoca cuando le conviene se llama **_callback_**. `repeat` no sabe qué hace `action`; quien llama decide el comportamiento.
- **Ojo con los paréntesis**: sin ellos pasamos la función; con ellos la ejecutamos y pasamos lo que devuelve.
- Una función puede **devolver otra función** (`operationFor`).
- **Ámbito léxico: qué ve una función**: puede leer las variables del ámbito donde está escrita; en sentido contrario no, lo declarado dentro no existe fuera.
- **Qué es un closure**: una función devuelta que usa variables de la función que la creó; esas variables no desaparecen al terminar la exterior. La función + las variables que retiene = closure (cierre). El motor las mantiene vivas mientras alguna función las use.
- Cada llamada a `createCounter` crea sus propias variables: **cada closure es independiente**.
- **Estado encapsulado**: devolviendo un objeto con varias funciones, todas comparten las variables y nadie más puede tocarlas. No son puras, pero es **estado mutable con un único dueño**: la forma de tener estado en JavaScript sin exponerlo.
- **Funciones configuradas**: si lo capturado no cambia nunca, la función devuelta sí es pura. Técnica de recibir argumentos en varias llamadas = **currificación**; forma `configurar(opciones)(datos)` (reaparece en Immer).
- **Un closure captura la variable, no el valor**: lee el valor en el momento de ejecutarse.

## Buenas prácticas que defiende el apunte
- Pasar la función (`run(sayHi)`), no su resultado (`run(sayHi())`).
- Usar closures para encapsular estado privado en lugar de exponerlo como propiedad.
- Usar funciones configuradas para crear funciones especializadas a partir de una general (`withTax(0.21)`).
- En bucles con callbacks diferidos, usar `let` declarado en el propio `for`: cada vuelta crea una variable nueva (ámbito por vuelta).

## Ejemplos canónicos
```js
const sayHi = () => console.log("Hi");
const run = (action) => action();
run(sayHi);   // "Hi"
run(sayHi()); // "Hi" y después TypeError: action is not a function
```

```js
const createCounter = () => {
  let count = 0;
  return () => { count++; return count; };
};
const counter = createCounter();
counter(); counter(); // 1, 2
console.log(count);   // ReferenceError: count is not defined
```

```js
// Estado encapsulado
const createCounter = () => {
  let count = 0;
  return { increase: () => { count++; }, decrease: () => { count--; }, value: () => count };
};
counter.count; // undefined. Sólo existe dentro del closure
```

```js
// Función configurada (currificación)
const withTax = (rate) => (price) => price * (1 + rate);
const withSpanishVat = withTax(0.21);
withSpanishVat(100); // 121
```

```js
for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 3, 3, 3
for (let i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 0, 1, 2
let k;
for (k = 0; k < 3; k++) setTimeout(() => console.log(k));     // 3, 3, 3
```

## Trampas y errores típicos
- Añadir paréntesis al pasar un callback: se ejecuta en el momento y se pasa `undefined`.
- Intentar acceder desde fuera a una variable interna (`separator`, `count`): `ReferenceError`; o como propiedad (`counter.count`): `undefined`.
- Creer que el closure guarda una copia del valor: `greeting = "Buenas"` después de crear `greet` cambia el resultado.
- La sorpresa clásica del bucle con `var` + `setTimeout` (3, 3, 3).
- Atribuir esa trampa al hoisting: la causa real es **compartir una variable entre los callbacks**; con `let` declarada fuera del bucle pasa exactamente lo mismo.

## Preguntas para comprobar que se ha entendido
- ¿Qué diferencia hay entre `run(sayHi)` y `run(sayHi())`, y qué recibe `run` en cada caso?
- Si `createCounter` ya ha terminado, ¿dónde "vive" `count` y por qué no desaparece?
- Las funciones de `counter` no son puras. ¿Por qué el apunte dice que aun así no sufren el problema de "dos variables, un mismo objeto"?
- ¿Cuándo es pura la función devuelta por un closure? Pon el ejemplo de `withTax`.
- ¿Por qué el bucle con `var` imprime 3, 3, 3? ¿Es culpa del hoisting? ¿Qué demuestra el ejemplo con `let k` fuera del bucle?
