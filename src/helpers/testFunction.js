import { getEfficienciesByType1 } from "./getEfficienciesByType";
import { getEfficienciesByType2 } from "./getEfficienciesByType";
import { getEfficienciesByType3 } from "./getEfficienciesByType";
import { getEfficienciesByType4 } from "./getEfficienciesByType";

export function testFunction (times = 1) {
    
    let total_time = 0;
    let count = times;

    while (count > 0) {
        let start = window.performance.now();
        
        // Funcion aqui
        getEfficienciesByType1('ice');

        let end = window.performance.now();

        total_time += end-start;
        count--;
    }
    
    let media = (total_time / times).toFixed(5);

    return media;
}