# Tema 10 · Anotación de tipos en TypeScript
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/10-anotacion-tipos.md

Apartados del apunte: Anotación de variables · Inferencia de tipos · Tipos básicos (Primitivos de JavaScript, null y undefined, object, Arrays, Funciones, Tuplas, Enumerados, void, never, any, unknown) · Type assertion.

## Ideas clave
- TypeScript añade sobre JavaScript un **sistema de tipos estático**: anotamos el tipo y el compilador comprueba, **antes de ejecutar**, que se usa bien. Los tipos sólo existen en desarrollo: **al compilar se eliminan** y se ejecuta JavaScript.
- **Anotación de variables**: dos puntos tras el nombre (`const city: string = "Málaga"`). VS Code muestra los errores `[ts]` mientras escribimos. También detecta errores como reasignar una constante.
- **Inferencia de tipos**: con valor inicial, TypeScript deduce el tipo (`let count = 3` → `number`).
- **Primitivos**: se anotan con el nombre que devuelve `typeof`, **en minúscula** (`string`, no `String`): `boolean`, `number`, `string`, `bigint`, `symbol`, `null`, `undefined`.
- **null y undefined** tienen su propio tipo. Con `strictNullChecks` desactivado se pueden asignar a otros tipos; con él activo, no. `strict` activa implícitamente `strictNullChecks`; es el valor predeterminado desde TypeScript 6.0.
- **object**: cualquier valor no primitivo. Se usa poco porque no describe sus propiedades ni permite acceder a ellas (para eso, interfaces, más adelante).
- **Arrays**: `number[]` o el genérico `Array<string>`; equivalentes.
- **Funciones**: tipos en parámetros y retorno. En TS hay que pasar tantos argumentos como parámetros declarados. Parámetro **opcional con `?`**, sólo en los últimos parámetros. Un parámetro con valor por defecto ya es opcional (no admite `?`) e infiere su tipo del valor. Callbacks tipados en línea: `suffixCallback: () => string`.
- **Tuplas**: array de longitud fija con un tipo por posición (`[number, string]`); combinan bien con destructuring de arrays.
- **Enumerados** (`enum`): no existen en JS; nombres descriptivos para un conjunto de valores. Por defecto empiezan en 0; se puede fijar el primero o todos y los siguientes continúan la numeración. Generan un **objeto JavaScript real**: los numéricos tienen mapeo en ambos sentidos (nombre↔valor); los de string no tienen mapeo inverso. `const enum` no crea objeto y sustituye cada referencia por su valor.
- **void**: ausencia de valor; tipo de retorno de funciones que no devuelven nada. Una variable `void` sólo admite `undefined`.
- **never**: valores que nunca ocurren; funciones que nunca terminan (lanzan siempre o bucle infinito). `void` termina sin devolver; `never` no llega a terminar.
- **any**: admite cualquier valor y permite cualquier cosa; desactiva la comprobación de tipos.
- **unknown**: alternativa segura a `any`; admite cualquier valor pero no deja usarlo hasta comprobar su tipo con **guardas de tipo** (`Array.isArray`, `typeof`).
- **Type assertion** (`as`): "confía en mí, sé lo que hago". Alternativa `<string>data`. Se le llama *casting* pero **no es una conversión**: en ejecución el valor sigue siendo el mismo.

## Buenas prácticas que defiende el apunte
- En la práctica, **dejar que TypeScript infiera** y anotar sólo cuando no puede, p. ej. en parámetros de función.
- Escribir los primitivos en minúscula (`string`, no `String`).
- **Mantener `strict` activo** (incluye `strictNullChecks`).
- Preferir interfaces a `object` para describir objetos.
- Tipos propios (como enums) en **PascalCase** por convención.
- **Evitar `any`**: es "lo más parecido a volver a JavaScript". Usar `unknown` + guardas de tipo.
- Usar siempre `as` en lugar de `<>`, que no funciona en ficheros `.tsx` (choca con JSX en React).
- Es habitual sustituir los enums por uniones de tipos literales (se verán más adelante), porque generan código y no existen en JS.

## Ejemplos canónicos
```ts
const text: string = 3;
//    ^^^^ [ts] Type 'number' is not assignable to type 'string'.
let count = 3;   // inferido: number
count = "three"; // [ts] Type 'string' is not assignable to type 'number'.
```

```ts
const shout = (text: string, upperCase?: boolean): string =>
  (upperCase ? text.toUpperCase() : text) + "!!!";

const shoutArrow = (text: string, upperCase? = true): string => ...;
//                                ^^^^^^^^^ [ts] Parameter cannot have question mark and initializer.
const shoutArrow = (text: string, upperCase = true): string => ...; // correcto
```

```ts
const quantity: [number, string] = [5, "pieces"];
const [amount, unit] = quantity; // amount: number, unit: string

enum Release { Beta = 0.1, ProductLaunch = 1.0, ImprovedSupport = 1.4 }
console.log(Release[1.4]); // "ImprovedSupport" (mapeo inverso numérico)
```

```ts
let myData: unknown = getServerData();
if (Array.isArray(myData)) {
  myData.push(3);
} else if (typeof myData === "string") {
  console.log(myData.toUpperCase());
}
```

```ts
const price: unknown = 42;
// Compila, pero en ejecución: TypeError: price.toUpperCase is not a function
console.log((price as string).toUpperCase());
```

## Trampas y errores típicos
- Escribir `String`/`Number` en mayúscula en vez de `string`/`number`.
- Llamar a una función tipada con menos argumentos de los declarados: `[ts] Expected 2 arguments, but got 1.` (salvo `?` o valor por defecto).
- Combinar `?` y valor por defecto en el mismo parámetro: error.
- Anotar con `object` y luego intentar leer `student.name`: `Property 'name' does not exist on type 'object'`.
- Con `any` "compila pero no funciona": `myData.push(3)` sobre una función da `TypeError` en ejecución.
- Intentar el mapeo inverso en un enum de strings (`MediaType[MediaType.JSON]`): error.
- Creer que `as` convierte el valor: sólo silencia al compilador; si te equivocas, TS ya no puede avisarte.
- Usar `<string>data` en un `.tsx`.

## Preguntas para comprobar que se ha entendido
- Si los tipos desaparecen al compilar, ¿en qué momento exacto te protege TypeScript? ¿Y qué excepción hay con los `enum`?
- ¿Cuándo merece la pena anotar explícitamente y cuándo dejar que TypeScript infiera?
- ¿Qué diferencia práctica hay entre `any` y `unknown` cuando recibes datos de un servidor?
- `(price as string).toUpperCase()` compila. ¿Por qué falla en ejecución y qué habría sido más seguro?
- ¿En qué se diferencia una función que devuelve `void` de una que devuelve `never`?
