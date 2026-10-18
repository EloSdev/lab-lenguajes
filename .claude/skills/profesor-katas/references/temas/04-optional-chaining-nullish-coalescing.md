# Tema 04 · Optional chaining y nullish coalescing
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/04-optional-chaining-nullish-coalescing.md

Apartados del apunte: Optional chaining · Optional chaining en arrays y funciones · Nullish coalescing · Combinando ambos operadores · Asignación con operadores lógicos.

## Ideas clave
- Ambos operadores llegaron juntos en **ES2020**. Resuelven dos situaciones habituales con datos que pueden no existir (p. ej. del servidor): **acceder a propiedades de forma segura** y **asignar valores por defecto**.
- **Optional chaining (`?.`)**: acceder con punto a una propiedad de `null`/`undefined` lanza `TypeError`. `?.` comprueba si lo que tiene **a su izquierda** es *nullish* (`null` o `undefined`); si lo es, deja de evaluar y devuelve `undefined`; si no, continúa.
  - **Cada `?.` sólo protege lo que tiene justo a su izquierda**: hay que colocarlo en el sitio correcto.
  - Se pueden encadenar tantos `?.` como valores puedan no existir: `someUser?.stats?.likes`.
  - Sustituye a las comprobaciones clásicas con `&&` o con `if`, que son engorrosas con varios niveles.
- **Optional chaining en arrays y funciones**: sintaxis `?.[]` y `?.()`, **manteniendo el punto**.
- **Nullish coalescing (`??`)**: devuelve el operando derecho **sólo cuando el izquierdo es nullish** (`null` o `undefined`).
  - Frente a `||`, que descarta **cualquier** valor *falsy* (`0`, `""`, `false`...), aunque muchas veces son válidos.
  - Los valores por defecto de parámetros y destructuring sólo se activan con `undefined`; `??` se activa también con `null`.
- **Combinando ambos operadores**: `?.` para acceder con seguridad + `??` para el valor por defecto.
- **Asignación con operadores lógicos** (ES2021): `&&=`, `||=` y `??=`. `??=` sirve para **inicializar un valor sólo si todavía no existe**.

## Buenas prácticas que defiende el apunte
- Usar `?.` en lugar de cadenas `a && a.b && a.b.c` o `if` anidados.
- **Usar `?.` sólo donde un valor puede realmente no existir.** Ponerlo en todos los accesos "por si acaso" oculta errores que deberíamos detectar cuanto antes.
- Para valores por defecto, preferir `??` a `||` cuando `0`, `""` o `false` son valores válidos.
- Usar `??=` para inicializar propiedades ausentes sin pisar las que ya tienen valor.

## Ejemplos canónicos
```js
console.log(guest.stats.likes);  // TypeError: guest.stats es undefined
console.log(guest.stats?.likes); // undefined
console.log(guest?.stats.likes);
//                       ^^^^^ TypeError: `?.` comprueba `guest`, no `guest.stats`
```

```js
console.log(user.friends?.[1]); // "Ana"
guest.greet?.();                // No hace nada, pero no lanza error
console.log(guest.friends?[1]);
//                       ^ SyntaxError: sin el punto se interpreta como ternario
```

```js
quantity = 0;
console.log(quantity || "unknown"); // "unknown". ¡Pero 0 es una cantidad válida!
console.log(quantity ?? "unknown"); // 0
```

```js
const draft = { id: null };
const { id = 0 } = draft;
console.log(id);            // null
console.log(draft.id ?? 0); // 0

console.log(guest.stats?.likes ?? "Not available"); // "Not available"
```

```js
const settings = { theme: "dark" };
settings.theme ??= "light"; // No cambia, ya tiene un valor
settings.language ??= "es"; // Se asigna, la propiedad no existía
```

## Trampas y errores típicos
- **`||` vs `??`**: `0 || "default"`, `"" || "default"` y `false || "default"` dan `"default"`; con `??` dan `0`, `""` y `false`. Sólo `null`/`undefined` activan `??`.
- Colocar el `?.` en el nivel equivocado (`guest?.stats.likes`): protege `guest`, no `stats`.
- Olvidar el punto en arrays/funciones: `obj?[1]` es `SyntaxError` (se lee como ternario); lo correcto es `obj?.[1]` / `fn?.()`.
- Abusar de `?.` "por si acaso": esconde bugs.
- Creer que un valor por defecto de destructuring (`= 0`) cubre `null`: no; `??` sí.

## Preguntas para comprobar que se ha entendido
- En `a?.b.c`, ¿qué está protegido exactamente y qué puede seguir lanzando `TypeError`?
- Tienes `stock = 0` y escribes `stock || "sin datos"`. ¿Qué se muestra? ¿Qué operador usarías y por qué?
- ¿Qué diferencia hay entre `const { id = 0 } = draft` y `draft.id ?? 0` cuando `id` es `null`?
- ¿Por qué el apunte desaconseja poner `?.` en todos los accesos?
- ¿Qué hace `settings.theme ??= "light"` si `theme` vale `""`? ¿Y si usaras `||=`?
