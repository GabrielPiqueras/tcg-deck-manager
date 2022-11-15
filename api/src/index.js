
import app from './app';

const main = () => {
    // Aqui vamos a ejecutar nuestro servidor creado con node.js

    app.listen(app.get('port'));
    // console.log(`Server on port ${app.get('port')}`);
}

main();