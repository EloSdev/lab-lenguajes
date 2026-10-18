# Tema 11 · Interfaces
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/11-interfaces.md

## Ideas clave
- El tipo `object` no describe qué propiedades tiene un objeto, así que no deja acceder a ellas. Una **interfaz** es un **contrato que describe la forma de un objeto**: nombres de propiedades y tipo de cada una.
- Las interfaces permiten **dar nombre** a estructuras y **reutilizarlas** en todo el código.
- **Declarar una interfaz**: palabra clave `interface`, nombre en **PascalCase** por convención.
- La interfaz **desaparece al compilar**: no genera ningún objeto en JavaScript (a diferencia de los enumerados).
- TypeScript avisa si el objeto no cumple el contrato: si **falta** una propiedad, si el **tipo no coincide** o si **sobra** alguna.
- **Interfaces en funciones**: su uso más habitual es tipar parámetros; también tipan arrays (`User[]`) y se combinan con destructuring.
- **Propiedades opcionales**: por defecto todas son obligatorias; `?` tras el nombre la hace opcional. Al leerla, TypeScript recuerda que puede ser `undefined`.
- **Propiedades de sólo lectura**: `readonly` impide reasignar la propiedad una vez creado el objeto.
- **Interfaces anidadas**: una propiedad puede tener como tipo otra interfaz (composición jerárquica).
- **Extender interfaces**: `extends` hereda todas las propiedades y añade las suyas; se puede extender de varias separándolas por comas.
- **Duck typing** / tipado estructural: TypeScript no comprueba que un objeto "sea" de un tipo, sino que su **estructura encaje** con el contrato. El nombre de la interfaz no importa.

## Buenas prácticas que defiende el apunte
- Usar interfaces en lugar de `object` cuando hay que acceder a propiedades.
- Nombrar las interfaces en PascalCase.
- Usar `extends` en lugar de **duplicar** propiedades (p. ej. `Place` no debe repetir `lat`/`lon` de `Coord`).
- Para propiedades opcionales, usar optional chaining (`?.`) y nullish coalescing (`??`) para contemplar el `undefined`.
- Recordar que `readonly` es protección de compilación; la inmutabilidad real se verá en el módulo de inmutabilidad.

## Ejemplos canónicos
```ts
interface Coord {
  lat: number;
  lon: number;
  alt?: number;
}

console.log(beach.alt.toFixed(0));
//          ^^^^^^^^^ [ts] 'beach.alt' is possibly 'undefined'.
console.log(beach.alt?.toFixed(0)); // undefined
console.log(beach.alt ?? 0);        // 0
```

```ts
interface Coord {
  readonly lat: number;
  readonly lon: number;
}
pos.lat = 37.0531;
//  ^^^ [ts] Cannot assign to 'lat' because it is a read-only property.
```

```ts
interface Place extends Coord {
  address: Address;
}
interface Place extends Coord, Address {}   // varias a la vez

printCoord(office); // un Place vale donde se espera un Coord
```

```ts
interface User { id: number; name: string; }
interface Dog  { id: number; name: string; }

printUserName(laika); // "Laika". Es un `Dog`, pero tiene la misma estructura que `User`
```

```ts
// Propiedad de más: OK si viene de una variable, error si es literal directo
printUserName(garfield); // "Garfield". `color` no molesta
printUserName({ id: 43, name: "Garfield", color: "orange" });
//                                        ^^^^^ [ts] Object literal may only specify known properties...
```

## Trampas y errores típicos
- Olvidar una propiedad obligatoria: `Property 'lon' is missing in type ... but required in type 'Coord'`.
- Usar una propiedad opcional como si siempre existiera: `'beach.alt' is possibly 'undefined'`.
- **Confundir `readonly` con `const`**: `const` impide reasignar la variable `pos`; `readonly` impide reasignar la propiedad `lat`. Y ninguno existe en ejecución: el objeto sigue siendo modificable.
- Creer que el duck typing contradice el error de "propiedad de más": la comprobación de propiedades sobrantes **sólo se aplica a objetos literales escritos directamente** donde se espera el tipo, porque ahí una propiedad desconocida casi siempre es un error de escritura.
- Pensar que la compatibilidad `Place` -> `Coord` es una característica de `extends`: es la regla general de tipado estructural.
- Si al objeto le falta alguna propiedad exigida, no encaja (`Cat` sin `id` no vale como `User`).

## Preguntas para comprobar que se ha entendido
- ¿Qué problema del tipo `object` resuelve una interfaz? ¿Queda algo de la interfaz en el JavaScript compilado?
- Si `pos` es `const` y sus propiedades son `readonly`, ¿qué impide cada cosa? ¿Y en ejecución?
- ¿Por qué `printUserName(laika)` compila si `laika` es un `Dog`? ¿Qué tendría que faltarle para que fallara?
- ¿Por qué pasar `garfield` (con `color`) en una variable compila, pero el mismo objeto escrito en línea da error?
- ¿Cómo evitarías repetir `lat` y `lon` en `Place`, y qué consecuencia tiene eso al llamar a `printCoord`?
