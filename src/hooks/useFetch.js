import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({data: null, loading: true, error: false});
    
    useEffect(() => {
        // No hace nada cuando está montado

        // Al desmontarse sí
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {

        // Reinicio para poder cargar el loading de nuevo
        setState({ data: null, loading: true, error: false});

        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                
                if (isMounted.current) {
                    setState({
                        data: data,
                        loading: false,
                        error: false
                    });
                } else {
                    console.log('No se alcanzó a llamar a setState, porque el componente fue desmontado :)')
                }
            })
            .catch(err => {
                setState({
                    ...state,
                    loading: false,
                    error: true
                })
            });
    }, [url]);

    return state;
}