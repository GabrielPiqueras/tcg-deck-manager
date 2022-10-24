
import { useState } from 'react';

/**
 * @description : Hook para usar en cualquier formulario que guarda los valores actuales de sus campos mientras se escribe en ellos.
 *               
 * @param {initialState} Objeto con los 'name' de los inputs del formulario en el que se usa el hook y sus valores por defecto. 
 * @returns array
 * 
 * @var formValues ➡ Estado que guarda los valores actualizados de los inputs.
 * Al ser devuelta en el @return se extrae el valor del campo deseado y se pone en el atributo 'value' de dicho input.
 * 
 * @function handleInputChange() ➡ Función devuelta a usar en cada input del formulario para guardar los valores.
 * @function resetForm() ➡ Función devuelta para reiniciar el estado con los valores usados por defecto.
 * 
 */

export const useForm = ( initialState = {} ) => {
    const [ formValues, setValues ] = useState(initialState);

    const handleInputChange = ({target}) => {
        setValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const resetForm = () => {
        setValues(initialState);
    }
    
    return [
        formValues,
        handleInputChange,
        resetForm
    ];
}