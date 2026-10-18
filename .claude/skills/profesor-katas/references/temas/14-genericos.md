# Tema 14 · Genéricos
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/14-genericos.md

## Ideas clave
- Un **genérico es un parámetro de tipo**. Igual que una función recibe valores, una función, interfaz o alias pueden recibir un **tipo** como parámetro. El tipo concreto se decide **en cada uso** y TypeScript lo comprueba como si lo hubiéramos escrito a mano.
- **El problema**: atar `first` a `string[]` impide reutilizarla; una función por tipo es inviable (duplicidad); `any` es volver a JavaScript sin tipos (typo silencioso `s.toUperCase()` que sólo falla en ejecución).
- **Genéricos en funciones**: el parámetro de tipo se declara entre `<>` antes de los paréntesis. `T` es un **hueco que se rellena en cada llamada**. Lo importante es la **relación** que expresa la firma: si entra un array de `T`, sale un `T` (lo que `any` perdía).
- No hace falta indicar el tipo: TypeScript lo **infiere del argumento**. También se puede indicar de forma **explícita** (`first<string>(...)`), y entonces se comprueba el argumento.
- En una **función flecha** el parámetro de tipo va delante de los paréntesis: `<T>(items: T[]) => ...`.
- Puede haber **varios parámetros de tipo** separados por comas (`<A, B>`).
- Convención de nombres: una letra mayúscula, `T` en general, `K` y `V` para claves y valores; con varios, también nombres descriptivos como `TItem`.
- **Genéricos en interfaces**: caso típico, una envoltura de API (`ApiResponse<T>`). Aquí **no hay argumento del que inferir**: el tipo hay que indicarlo siempre. `Array<string>` es exactamente esto.
- **Genéricos en alias**: misma sintaxis (`Formatter<T>`), y sirven para nombrar combinaciones repetidas (`Nullable<T> = T | null`).
- **Restricciones: `extends`**: limita los tipos admitidos a los que cumplan un contrato (`T extends { length: number }`). El resultado **conserva el tipo concreto**.
- La restricción más útil combina genéricos con `keyof`: `<T, K extends keyof T>` y retorno `T[K]`, que es el tipo exacto de esa propiedad.

## Buenas prácticas que defiende el apunte
- Usar genéricos en lugar de `any` o de duplicar funciones: una única implementación para muchos tipos sin renunciar al tipado.
- Dejar que TypeScript infiera el tipo en las llamadas a funciones genéricas.
- Preferir un genérico restringido a tipar el parámetro directamente con el contrato: con `{ length: number }` a pelo la función devolvería `{ length: number }` y se perdería el tipo.
- Seguir la convención de nombres `T`, `K`, `V`, `TItem`.

## Ejemplos canónicos
```ts
function first<T>(items: T[]): T {
  return items[0];
}

const n = first([1, 2, 3]);      // number
const m = first([1, "a", true]); // string | number | boolean
first([1, 2, 3])?.toUpperCase();
//                ^^^^^^^^^^^ [ts] Property 'toUpperCase' does not exist on type 'number'.
```

```ts
const last = <T>(items: T[]): T | undefined => items[items.length - 1];
const pair = <A, B>(a: A, b: B): [A, B] => [a, b];
```

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
}
const many: ApiResponse<User[]> = { data: [julia], status: 200 };

const noArg: ApiResponse = { data: julia, status: 200 };
//           ^^^^^^^^^^^ [ts] Generic type 'ApiResponse<T>' requires 1 type argument(s).
```

```ts
type Nullable<T> = T | null;

const longest = <T extends { length: number }>(a: T, b: T): T =>
  a.length > b.length ? a : b;
longest(10, 20);
//      ^^ [ts] Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
```

```ts
const getField = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
const userName = getField(julia, "name"); // string
const userId = getField(julia, "id");     // number
```

## Trampas y errores típicos
- Recurrir a `any`: el error (typo en un método) sólo aparece en ejecución.
- En ficheros **`.tsx` de React**, `<T>` en una flecha no compila porque se confunde con una etiqueta JSX; la solución habitual es añadir una coma: `<T,>(items: T[]) => …`.
- Olvidar el argumento de tipo en una interfaz genérica: `Generic type 'ApiResponse<T>' requires 1 type argument(s)`.
- Usar propiedades de `T` sin restringirlo: `Property 'length' does not exist on type 'T'`.
- Indicar explícitamente un tipo que no encaja con el argumento (`first<number>(["a"])`).

## Preguntas para comprobar que se ha entendido
- ¿Qué pierde `first(items: any[]): any` que conserva `first<T>(items: T[]): T`?
- ¿Por qué en `first([1, 2, 3])` no hace falta escribir `<number>`, pero en `ApiResponse<User>` sí?
- En `longest`, ¿qué tipo devolvería la función si los parámetros fueran `{ length: number }` en vez de `T extends { length: number }`?
- En `getField<T, K extends keyof T>`, ¿qué papel tiene cada parámetro de tipo y qué significa `T[K]`?
- ¿Qué problema tiene escribir `<T>(x: T) => x` en un fichero `.tsx` y cómo se resuelve?
