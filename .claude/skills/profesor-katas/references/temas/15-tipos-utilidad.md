# Tema 15 · Tipos de utilidad
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/15-tipos-utilidad.md

## Ideas clave
- TypeScript incluye de serie las definiciones de tipos de la API de JavaScript (`Array<T>`, `Promise<T>`, `Date`, el DOM…) y un conjunto de **tipos de utilidad**: **genéricos ya escritos que construyen un tipo nuevo a partir de otro**.
- Se usan como cualquier genérico (tipo entre `<>`), **no hay que importar nada** y están escritos en TypeScript.
- El apunte ve los cinco más habituales sobre la interfaz `User { id; name; email }`.
- **Partial**: `Partial<T>` tiene las mismas propiedades que `T`, pero **todas opcionales**. Tipo natural de una **modificación parcial**.
- **Pick**: `Pick<T, K>` tiene **sólo** las propiedades `K` de `T`. Describe una **vista reducida sin duplicar la interfaz**; si `User` cambia, la vista también. `K` es una unión de literales **restringida a `keyof T`**.
- **Omit**: `Omit<T, K>` es el contrario: todas las propiedades de `T` **menos** las `K` (p. ej. `NewUser` sin `id`).
- **Record**: `Record<K, V>` es un objeto con claves `K` y valores `V`. Con una unión de literales como clave **obliga a cubrir todos los casos**; con `string` como clave describe un **diccionario abierto**.
- **ReturnType**: `ReturnType<T>` extrae el tipo que devuelve una función. Útil para nombrar un objeto construido por una función sin duplicarlo. Necesita el **tipo** de la función, no su valor: `typeof` en posición de tipo. Sólo admite tipos de función.
- **Los demás**: `Required<T>` (contrario de `Partial`), `Readonly<T>`, `Exclude`, `Extract`, `NonNullable<T>`, `Parameters<T>`; misma mecánica.

## Buenas prácticas que defiende el apunte
- Derivar tipos de otro existente (`Pick`, `Omit`, `ReturnType`) en lugar de duplicar interfaces, para que se mantengan sincronizados.
- Usar `Partial<User>` para los cambios de una actualización en lugar de exigir el `User` completo.
- Contemplar el `undefined` de las propiedades de un `Partial` (con `??` en la implementación).
- Usar `Record` con una unión de literales como clave para que el compilador obligue a cubrir todos los casos.

## Ejemplos canónicos
```ts
const updateUser = (user: User, changes: Partial<User>): User => ({
  id: changes.id ?? user.id,
  name: changes.name ?? user.name,
  email: changes.email ?? user.email,
});
console.log(updateUser(julia, { email: "julia@new.com" }));
```

```ts
type UserPreview = Pick<User, "id" | "name">;

type Wrong = Pick<User, "nickname">;
//                      ^^^^^^^^^^ [ts] Type '"nickname"' does not satisfy the constraint 'keyof User'.
```

```ts
type NewUser = Omit<User, "id">;
const createUser = (data: NewUser): User => ({ id: 32, name: data.name, email: data.email });
```

```ts
type Role = "admin" | "editor" | "viewer";
const roleLabel: Record<Role, string> = {
  admin: "Administrador",
  editor: "Editor",
  viewer: "Lector",
};
const stock: Record<string, number> = { laptop: 5, mouse: 0 };
stock.keyboard = 12;
```

```ts
const buildSummary = (user: User) => ({
  id: user.id,
  label: `${user.name} <${user.email}>`,
});
type UserSummary = ReturnType<typeof buildSummary>; // { id: number; label: string; }
```

## Trampas y errores típicos
- Tipar unos cambios parciales como `User`: `Type '{ email: string; }' is missing the following properties from type 'User': id, name`.
- Usar una propiedad de un `Partial` sin contemplar `undefined`: `'partial.email' is possibly 'undefined'`.
- **`Omit` no comprueba que las claves existan** (a diferencia de `Pick`): `Omit<User, "nickname">` compila y devuelve `User` tal cual, así que un error de escritura en la clave pasa desapercibido.
- Dejar un caso sin cubrir en un `Record<Role, string>`: `Property 'viewer' is missing...`.
- Pasar a `ReturnType` algo que no es tipo de función (`ReturnType<User>`) o el valor en lugar de `typeof buildSummary`.
- Pasar propiedades que no existen (`nickname` en `Partial<User>`, `id` en `NewUser`): error de propiedad desconocida en objeto literal.

## Preguntas para comprobar que se ha entendido
- ¿Por qué `updateUser` necesita `??` en cada propiedad? ¿Qué pasaría sin él?
- Si mañana añades `phone` a `User`, ¿qué les pasa a `UserPreview` (con `Pick`) y a `NewUser` (con `Omit`)?
- ¿Qué diferencia de seguridad hay entre `Pick<User, "nickname">` y `Omit<User, "nickname">`?
- ¿Cuándo usarías `Record<Role, string>` frente a `Record<string, number>`?
- ¿Por qué hay que escribir `ReturnType<typeof buildSummary>` y no `ReturnType<buildSummary>`?
