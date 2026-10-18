# Tema 26 · Immer
Fuente: https://github.com/Lemoncode/luckia-front-end-moderno-ia/blob/main/02-lenguajes/26-immer.md

## Ideas clave
- Problema: actualizar sin mutar exige un spread por nivel; con cuatro niveles son cuatro spreads anidados y **olvidar uno significa mutar sin querer**.
- **Immer**: escribimos el cambio como si mutáramos, **sobre un borrador**, y la librería construye el valor nuevo sin tocar el original.
- **Módulos: `import` y `export`**: cada fichero es un módulo; lo declarado es privado salvo lo marcado con `export`. Los `export` con nombre se importan entre llaves y con el mismo nombre; el `export default` se importa sin llaves y con el nombre que queramos. Si la ruta no empieza por `./`, es un paquete npm buscado en `node_modules`.
- Dónde funcionan los módulos: Node con `"type": "module"`, navegador con `<script type="module">`, Vite por defecto. **Siempre en modo estricto**.
- **Qué hace Immer**: `produce(estado, receta)`; la receta recibe un borrador (`draft`) y escribimos los cambios como mutaciones. Devuelve un objeto nuevo.
- La profundidad ya no importa: cambiar algo a cinco niveles se escribe igual que a uno.
- El borrador no es el original: es **un intermediario que anota lo que hacemos**; al terminar, Immer crea copias sólo donde hace falta.
- **Sólo cambia lo que cambia**: copia el camino hasta el cambio y comparte lo demás; si la receta no cambia nada, **devuelve el mismo objeto** (lo mismo que `rename` del tema 22, pero automático para toda la estructura).
- **Arrays en el borrador**: admiten los métodos que mutan (`push`, `sort`), y el original queda intacto. Plugins opcionales que hay que activar una vez: `enableArrayMethods()` (rendimiento con arrays grandes) y `enableMapSet()` (soporte de `Map` y `Set`).
- **Devolver un valor en lugar de mutar**: si la receta devuelve algo, ese valor sustituye al estado entero.
- **`produce` currificado**: pasando sólo la receta, devuelve una función que espera el estado (la "función configurada" del tema 23). Los argumentos extra llegan a la receta después del borrador.
- **Inspeccionar el borrador: `current`**: `console.log(draft)` muestra el intermediario; `current(draft)` devuelve una copia normal.
- **Congelado automático**: Immer congela en profundidad el resultado. Es inmutabilidad real en ejecución, a diferencia de `readonly`, que sólo existe al compilar.

## Buenas prácticas que defiende el apunte
- "Spread cuando el cambio es superficial, e Immer cuando el estado es un árbol y el cambio está dentro."
- En la receta, o mutar el borrador o devolver un valor nuevo, nunca las dos cosas.
- Usar `current(draft)` para depurar en lugar de `console.log(draft)`.
- Usar `produce` currificado para definir una operación una vez y aplicarla a cualquier estado.

## Ejemplos canónicos
```js
import { produce } from "immer";

const moved = produce(julia, (draft) => {
  draft.address.city = "Sevilla"; // Escribimos como si mutáramos
});
moved.address.city; // "Sevilla"
julia.address.city; // "Málaga". Intacto
```

```js
moved.address === julia.address; // false. Esta rama cambió
moved.tags === julia.tags;       // true. Se comparte
produce(julia, () => {}) === julia; // true. Sin cambios, mismo objeto
```

```js
const emptied = produce(cart, () => []); // Devolver sustituye el estado entero

produce(julia, (draft) => {
  draft.name = "Evan";
  return { ...draft };
}); // Error: [Immer] An immer producer returned a new value *and* modified its draft.
```

```js
const setCity = produce((draft, city) => { draft.address.city = city; });
setCity(julia, "Bilbao").address.city; // "Bilbao"
```

```js
Object.isFrozen(moved.address); // true
moved.address.city = "Madrid";  // TypeError: Cannot assign to read only property 'city'
```

## Trampas y errores típicos
- Mutar el borrador **y** devolver un valor: Immer lanza error porque no sabe cuál quieres.
- Hacer `console.log(draft)` y ver el intermediario en vez de los datos.
- Intentar mutar el resultado: está congelado. En modo estricto (cualquier módulo) lanza `TypeError`; fuera de él la mutación se ignora en silencio.
- Olvidar que las partes compartidas también quedan congeladas en el original: tras el primer `produce`, `julia.tags` ya no admite un `push`.
- Esperar soporte de `Map`/`Set` sin activar `enableMapSet()`.

## Preguntas para comprobar que se ha entendido
- ¿Qué problema concreto del spread anidado resuelve Immer?
- Si dentro de la receta haces `draft.tags.push("new")`, ¿por qué `julia.tags` no cambia?
- Tras un `produce` que sólo cambia `address.city`, ¿qué ramas son nuevas y cuáles se comparten? ¿Qué devuelve si no cambias nada, y por qué es importante?
- ¿Qué diferencia hay entre `readonly` de TypeScript y el congelado de Immer?
- ¿Cómo se relaciona `produce(receta)` con la currificación y las funciones configuradas del tema 23?
