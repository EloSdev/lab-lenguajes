# Tema 22 · Funciones puras
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/22-funciones-puras.md

## Ideas clave
- Una función es **pura** cuando cumple dos condiciones:
  1. **Con la misma entrada devuelve siempre la misma salida** (depende sólo de sus argumentos).
  2. **No tiene efectos secundarios**: no cambia sus argumentos, ni variables externas, ni el mundo exterior (consola, red, disco).
- Es el mismo concepto que una función matemática.
- **Transparencia referencial**: una llamada pura se puede sustituir por su resultado (`applyIva(100)` ↔ `121`). Es la prueba más rápida: si sustituir la llamada por su valor cambia algo, no es pura.
- **Cómo se rompe la pureza**: leer algo externo que puede cambiar (`taxRate`), mutar el argumento recibido (`cart.push`), escribir en una variable externa, escribir en consola, depender de `Math.random()` o de la fecha actual.
- **La versión pura**: con spread se devuelve un valor nuevo y el original queda intacto.
- **Qué ganamos con la inmutabilidad**:
  - **Entender la función sin salir de ella** (evita el problema de "dos variables, un mismo objeto").
  - **Probar sin preparar nada**: entrada conocida, salida esperada.
  - **Compartir sin miedo**: sin copias defensivas, como ya pasa con los primitivos.
  - **Saber si algo ha cambiado comparando referencias**: basta un `===`.
  - **Historial gratis**: guardar versiones es guardar referencias; deshacer es volver a la anterior.
- **"Misma referencia, mismo valor"**: si no hay cambio, devolver el mismo objeto para que la comparación de referencias "cuente la verdad en los dos sentidos". Es la base de las herramientas posteriores.
- **Lo que cuesta**: memoria y tiempo (copiar es proporcional al tamaño) y más código en estructuras anidadas (un spread por nivel).
- **Mutar dentro es aceptable**: la pureza se mide desde fuera.

## Buenas prácticas que defiende el apunte
- Devolver valores nuevos con spread en lugar de mutar argumentos.
- Cuando no hay cambio, devolver la misma referencia en vez de una copia.
- No hacer spread acumulativo dentro de un bucle: es "el error clásico".
- Es aceptable mutar un objeto **local** mientras se construye, porque nadie más tiene la referencia hasta que sale.
- Atenuantes del coste: la copia es superficial (lo anidado que no cambia se comparte) y el recolector de basura está diseñado para objetos pequeños de vida corta.

## Ejemplos canónicos
```js
// Impura: depende de algo externo
let taxRate = 0.21;
const applyTax = (price) => price * (1 + taxRate);
taxRate = 0.5;
applyTax(100); // 150. Misma entrada, distinta salida
```

```js
// Impura: muta el argumento
const addItem = (cart, item) => { cart.push(item); return cart; };
// Pura
const addItem = (cart, item) => [...cart, item];
```

```js
// Misma referencia si no hay cambio
const rename = (user, name) => (user.name === name ? user : { ...user, name });
rename(julia, "Julia") === julia;    // true
rename(julia, "Julia M.") === julia; // false
```

```js
// Historial gratis
const older = { ...julia, age: 31 };
const history = [julia, older]; // history[0] sigue siendo la versión anterior
```

```js
// Mutar dentro es aceptable
const doubleAll = (numbers) => {
  const result = [];          // Objeto local: nadie más lo conoce todavía
  for (const n of numbers) result.push(n * 2);
  return result;
};
```

## Trampas y errores típicos
- Leer una variable externa mutable dentro de la función (rompe la condición 1).
- Mutar el argumento y devolverlo: `cart === newCart` es `true` y el original ha cambiado.
- Usar `console.log`, `Math.random()` o la fecha actual dentro de una función que se quiere pura.
- `list = [...list, i]` en un bucle de 20000 vueltas: unos 200 millones de copias, más de un segundo frente a menos de un milisegundo con `push`.
- Confundir "mutar" con "impuro": lo que rompe la pureza no es mutar, es **mutar algo que llegó de fuera o que ya se ha compartido**.

## Preguntas para comprobar que se ha entendido
- ¿Cómo usarías la transparencia referencial para decidir si una función es pura?
- `doubleAll` usa `push`. ¿Es pura? ¿Por qué?
- ¿Por qué `rename` devuelve `user` cuando el nombre no cambia en lugar de `{ ...user, name }`? ¿Qué se gana al comparar con `===`?
- ¿Qué tiene que ver la inmutabilidad con poder implementar "deshacer"?
- ¿Por qué `list = [...list, i]` en un bucle es tan lento, y qué dos cosas atenúan el coste de la inmutabilidad en el caso normal?
