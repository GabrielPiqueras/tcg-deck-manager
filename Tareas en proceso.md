
## Buscador de Cartas y Creador de Mazos

- [x] Crear en el menú un apartado de 'Mazos', con ruta y componente.
- [x] Crear en menú de usuario el item **Mis Mazos**, con ruta y componente.
- [x] Crear un botón de ➕ estilo android en la vista **Mis Mazos**, llevará a la ruta y componente **Crear Mazo**.
- [x] La vista estará formada por el componente **Creador de Mazo** y el componente **Buscador de cartas**
- [x] En dicho componente, mediante una ruta en Expresss, obtener un JSON con la consulta de las últimas 250 cartas de la última expansión existente e importarda *(Tempestad Plateada en este caso)* de la base de datos.
- [x] Recorrer esos registros, por cada uno crear un componente **Carta**.
- [ ] Cuadrar también el buscador de cartas con las rejillas grid que proporciona Mui.
- [ ] El componente **Carta** no se ve afectado por dimensiones, y recibe para renderizarse:
    - La Url de la imagen
    - Nombre de la expansión
    - Url del Logotipo de la expansión
    - Link de cardmarket
- [ ] Crear un estado **currentCards** para el componente **Creador de Mazo**
- [ ] Al dar click en un componente **Carta** esta guardará su id de la carta en un array de objetos.
- [ ] Reglas:
  - [ ] Si la carta existe en el array, se suma +1 a su cantidad
  - [ ] Si no existe, se añade el id de la carta con cantidad 1. Ejemplo:
 
```js
[
    cards: [
        { card_id: 17, quantity: 1},
        { card_id: 23, quantity: 3},
        { card_id: 26, quantity: 1}
        { card_id: 9, quantity: 4}
    ]
]
```
- [ ] Si al añadir una carta la cantidad es mayor a 4, no dejar y mostrar mensaje de error **"No puedes poner más de 4 cartas iguales"**.
- [ ] Añadir de igual forma, un botón ➕ y otro ➖ en cada carta añadida, para aumentar o restar la cantidad.
  - [ ] Si la cantidad es igual a 0 ➡ Borrar carta del array
  - [ ] Si la cantidad es mayor a 4 ➡ Mostrar el mensaje de error
- [ ] Una vez se le de a **Guardar**, la baraja se registrará en la base de datos, haya alcanzado las 60 cartas o no. La baraja no será válida si supera este número.
- [ ] Si se edita la baraja:
  - [ ] Sería como crear una nueva, pero poniendo en el estado por defecto las cartas y cantidad que tiene
  - [ ] Al darle a **Guardar**, las líneas de la baraja se borran todas de la base de datos y se insertan las nuevas, manteniendo el id de la baraja, por supuesto.
- [ ] Añadir campo **Private** en la tabla de mazos, si es 0 la baraja será pública, si es 1 será privada y solo visible para el usuario.

## Registro usuarios

- [ ] Al iniciar sesión, haciendo fetch a una ruta en Express, se enviará el correo electrónico y contraseña, si este existe en la tabla users y está activo, permitir login, si no, mostrar error.
- [ ] Crear la página de Registro con 4 campos:
    - Usuario
    - Correo
    - Contraseña
    - Repetir contraseña

    - [ ] Si todo es válido se hace fetch a una ruta en Express que valida si el correo y contraseña existe ya en la tabla users, si no existe, lo da de alta y lo activa
    - [ ] Si todo es correcto, redirigir al /login