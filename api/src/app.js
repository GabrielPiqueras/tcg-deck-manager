
// Archivo núcleo de nuestro servidor 
import express from 'express';
import morgan from 'morgan';

import apiRoutes from './routes/api.routes';

// Iniciamos express
const app = express();

// Settings 💙

// Con set() establecemos valores que luego podremos obtener con get()

// Como nuestra API se va a ejecuta en nuestro servidor, establecemos un puerto por el que escuchará, 4000 por ejemplo
app.set('port', 4000);

// Middlewares 💙

// Son pequeñas funciones intermedias entre una petición y una respuesta, cuando usamos un servicio web, lo que hacemos
// es hacer una petición a un servidor, esa petición se procesa y recibimos una respuesta. Pues en medio se pueden poner
// los MIddleware para nuestras necesidades 

// Usaremos morgan en modo de desarollo para poder ver por consola una vez desplegada la aplicación, un listado de las
// peticiones que estoy haciendo (método, rutas, respuestas, etc...)
app.use(morgan('dev'));

// Routes 💙
app.use(apiRoutes);

export default app;