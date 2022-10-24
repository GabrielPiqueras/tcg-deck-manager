import { typesEfficiencies } from '../data/typesEfficiencies';

export const getEfficienciesByType = (type1, type2 = false) => {

    const weaknesses = [];
    const strengths = [];
    const immunities = [];

    if ( type1 && !type2 ) {
        const { efficiencies } = typesEfficiencies.find(type => type.name === type1);

        efficiencies.map(eff => {
            ( eff.value === 2 ) && weaknesses.push(eff);
            ( eff.value === 0.5 ) && strengths.push(eff);
            ( eff.value === 0 ) && immunities.push(eff);
        });

        return { weaknesses, strengths, immunities };
    } else if (type1 && type2) {

        const weaknesses = [];
        const strengths = [];
        const immunities = [];

        const { efficiencies: effs1 } = typesEfficiencies.find(type => type.name === type1);
        const { efficiencies: effs2 } = typesEfficiencies.find(type => type.name === type2);

        effs1.forEach((eff, i) => {
            
            const efficacy = effs1[i].value * effs2[i].value;
            const result = { type: eff.type, value: efficacy };

            ( efficacy === 2 || efficacy === 4 ) && weaknesses.push(result);
            ( efficacy === 0.5 || efficacy === 0.25 ) && strengths.push(result);
            ( !efficacy ) && immunities.push(result);
        });

        return { weaknesses, strengths, immunities };
    }
}


// VERSION FILTER 
export const getEfficienciesByType1 = (type1, type2 = false) => {

    if ( type1 && !type2 ) {
    
        const { efficiencies } = typesEfficiencies.find(type => type.name === type1);
        const weaknesses = efficiencies.filter(efficience => efficience.value === 2);
        const strengths = efficiencies.filter(efficience => efficience.value === 0.5);
        const immunities = efficiencies.filter(efficience => efficience.value === 0);
        
        return { weaknesses, strengths, immunities };
    }
}

// VERSION MAP + IF
export const getEfficienciesByType2 = (type1, type2 = false) => {
    if ( type1 && !type2 ) {

        const weaknesses = [];
        const strengths = [];
        const immunities = [];

        const { efficiencies } = typesEfficiencies.find(type => type.name === type1);

        efficiencies.map(eff => {
            if ( eff.value === 2 ) {
                weaknesses.push(eff);
            } else if ( eff.value === 0.5 ) {
                strengths.push(eff);
            } else if ( !eff.value ) {
                immunities.push(eff);
            }
        })

        return { weaknesses, strengths, immunities };
    }
}

// VERSION MAP + SWITCH
export const getEfficienciesByType3 = (type1, type2 = false) => {

    if ( type1 && !type2 ) {

        const weaknesses = [];
        const strengths = [];
        const immunities = [];

        const { efficiencies } = typesEfficiencies.find(type => type.name === type1);

        efficiencies.map(eff => {
            
            switch ( eff.value ) {
                case 2: 
                    weaknesses.push(eff); break;
                case 0.5:
                    strengths.push(eff); break;
                case 0:
                    immunities.push(eff); break;
                default: return null;
            }
        });

        return { weaknesses, strengths, immunities };
    }
}

// VERSION MAP + &&
export const getEfficienciesByType4 = (type1, type2 = false) => {

    if ( type1 && !type2 ) {

        const weaknesses = [];
        const strengths = [];
        const immunities = [];

        const { efficiencies } = typesEfficiencies.find(type => type.name === type1);

        efficiencies.map(eff => {
            ( eff.value === 2 ) && weaknesses.push(eff);
            ( eff.value === 0.5 ) && strengths.push(eff);
            ( eff.value === 0 ) && immunities.push(eff);
        });
        
        return { weaknesses, strengths, immunities };
    }
}