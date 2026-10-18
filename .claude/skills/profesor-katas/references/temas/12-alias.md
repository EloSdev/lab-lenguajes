# Tema 12 · Tipos alias
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/12-alias.md

## Ideas clave
- Un **alias** es un **nombre que damos a un tipo**, sea cual sea, para reutilizarlo sin repetir su definición. Sintaxis: `type`, nombre en PascalCase, `=` y el tipo.
- A diferencia de una interfaz (sólo forma de objetos), un alias puede nombrar **cualquier tipo**: primitivo, función, objeto, tupla...
- **Alias de un primitivo**: un alias es **sólo un nombre, no un tipo nuevo**. Donde pone `Celsius`, TypeScript ve `number`; dos alias del mismo tipo son intercambiables.
- Su utilidad es la **legibilidad** (`Celsius` dice más que `number`) y poder cambiar el tipo **en un único sitio**.
- **Alias de una función**: extrae la firma y la reutiliza en todas las funciones que la comparten. Los parámetros no hace falta anotarlos (se infieren del alias) y el nombre del parámetro en el alias es sólo documentación. TypeScript sí comprueba que cada implementación respete la firma.
- **Alias de un objeto**: misma sintaxis que una interfaz pero con `=`; admite `?` y `readonly`.
- **Alias en parámetros de una función**: se usa como cualquier tipo, en parámetros y retorno.
- **Extraer el tipo de una propiedad**: `Tipo["propiedad"]` crea un alias con el tipo de una propiedad; si cambia la propiedad, cambia el alias.
- **Un alias no se puede redeclarar**: dos interfaces con el mismo nombre se **fusionan**; dos alias con el mismo nombre dan `Duplicate identifier`.
- **Alias o interfaz**: casi equivalentes para objetos. La interfaz está **abierta** (se extiende con `extends`, admite nuevas declaraciones); el alias es **cerrado**.

## Buenas prácticas que defiende el apunte
- Heurística de la documentación oficial que sigue el curso: **usar interfaces hasta necesitar algo que sólo un alias puede hacer**.
- Convención del curso: **interfaces para los objetos y alias para el resto** (primitivos, funciones y otros tipos que vendrán).
- Usar `Tipo["propiedad"]` (también en el retorno, p. ej. `Country["iso"]`) en vez de escribir el tipo a mano, para que se actualice solo.
- Dar nombres con significado (`Celsius`, `Fahrenheit`) para que la firma diga qué representa cada número.

## Ejemplos canónicos
```ts
type Celsius = number;
type Fahrenheit = number;

const boilingPoint: Celsius = 100;
const forecast: Fahrenheit = boilingPoint; // Válido: para TypeScript los dos son `number`
```

```ts
type Formatter = (value: number) => string;

const toEuros: Formatter = (value) => `${value.toFixed(2)} €`;
const toPercent: Formatter = (ratio) => `${ratio * 100} %`;

const double: Formatter = (value) => value * 2;
//                                   ^^^^^^^^^ [ts] Type 'number' is not assignable to type 'string'.
```

```ts
type Country = User["country"]; // { id: number; name: string; iso: string; }
const getCountryIso = ({ iso }: Country): Country["iso"] => iso;
```

```ts
interface Person { name: string; }
interface Person { age: number; }   // se fusionan

type Person = { name: string };
//   ^^^^^^ [ts] Duplicate identifier 'Person'.
type Person = { age: number };
```

## Trampas y errores típicos
- Creer que un alias crea un tipo nuevo: `Celsius` y `Fahrenheit` son intercambiables, TypeScript no impide mezclarlos.
- Pensar que el nombre del parámetro en el alias de función obliga a llamarlo igual en la implementación (no: es documentación).
- Implementar una función que no respeta la firma del alias (devolver `number` donde se espera `string`).
- Intentar redeclarar un alias como si se fusionara igual que una interfaz: `Duplicate identifier`.

## Preguntas para comprobar que se ha entendido
- Si `Celsius` y `Fahrenheit` son alias de `number`, ¿te protege TypeScript de asignar uno a otro? ¿Para qué sirven entonces?
- En `const toPercent: Formatter = (ratio) => ...`, ¿de dónde sabe TypeScript el tipo de `ratio`?
- ¿Qué ventaja tiene tipar el retorno como `Country["iso"]` frente a `string`?
- ¿Qué pasa si declaras dos veces `interface Person` y qué pasa si lo haces con `type Person`?
- Según la convención del curso, ¿usarías `type` o `interface` para describir un usuario? ¿Y para la firma de un formateador?
