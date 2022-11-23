import { getConnection } from '../database/database';
import config from '../config';
import fetch from 'node-fetch';

const importTypes = async(req, res) => {
    const connection = await getConnection();
    const endpoint = 'https://api.pokemontcg.io/v2/types';

    const request = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'X-API-KEY': config.tcg_api_key,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    
    const { data: types } = await request.json();

    types.map((title) => {

        // Insetando en la base de datos
        connection.query('INSERT INTO types SET ?', { name: title }, function (error, results, fields) {
            if (error) throw error;
        });
    });

    res.json('Tipos elementales importados correctamente.');
}

const importSubtypes = async(req, res) => {
    const connection = await getConnection();
    const endpoint = 'https://api.pokemontcg.io/v2/subtypes';

    const request = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'X-API-KEY': config.tcg_api_key,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    
    const { data: subtypes } = await request.json();

    subtypes.map((title) => {

        // Insetando en la base de datos
        connection.query('INSERT INTO subtypes SET ?', { name: title }, function (error, results, fields) {
            if (error) throw error;
        });
    });

    res.json('Subtipos importados correctamente.');
}

const importSets = async(req, res) => {
    const connection = await getConnection();
    const endpoint = 'https://api.pokemontcg.io/v2/sets?orderBy=releaseDate';

    const request = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'X-API-KEY': config.tcg_api_key,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    
    const { data: sets } = await request.json();
    const today = new Date().toISOString().slice(0,10); // YYYY-MM-DD

    sets.map((set) => {

        let setData = {};

        setData.shortening = set.id; // NOT NULL
        setData.name = set.name // NOT NULL
        setData.series = set.series || null;
        setData.printed_total = set.printedTotal || 0;
        setData.total = set.total || 0;
        setData.ptc_go_code = set.ptcgoCode;
        setData.release_date = set.releaseDate;
        setData.symbol_url = set.images.symbol;
        setData.logo_url = set.images.logo;
        setData.created_at = today;
        setData.updated_at = today;
       
        // Insetando en la base de datos
        connection.query('INSERT INTO sets SET ?', setData, function (error, results, fields) {
            if (error) throw error;
        });
    });

    res.json('Sets importados correctamente.');
}

const importRatities = async(req, res) => {
    const connection = await getConnection();
    const endpoint = 'https://api.pokemontcg.io/v2/rarities';

    const request = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'X-API-KEY': config.tcg_api_key,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    
    const { data: rarities } = await request.json();

    rarities.map((title) => {

        // Insetando en la base de datos
        connection.query('INSERT INTO rarities SET ?', { name: title }, function (error, results, fields) {
            if (error) throw error;
        });
    });

    res.json('Rarezas importadas correctamente.');
}

const insertCardType = async(cardId, typeId) => {
    const connection = await getConnection();

    connection.query('INSERT INTO card_types SET ?', { card_id: cardId, type_id: typeId}, function (error, results, fields) {
        if (error) throw error;
    });
}

const insertCardSubtype = async(cardId, subtypeId) => {

    const connection = await getConnection();
    connection.query('INSERT INTO card_subtypes SET ?', { card_id: cardId, subtype_id: subtypeId}, function (error, results, fields) {
        if (error) throw error;
    });
}

const insertCardEfficience = async(cardId, typeId, effValue) => {

    const connection = await getConnection();

    const efficience = {
        card_id: cardId,
        type_id: typeId,
        value: effValue,
    };

    connection.query('INSERT INTO card_efficiencies SET ?', efficience, function (error, results, fields) {
        if (error) throw error;
    });
}

const insertCardAbility = async(cardId, name, text, type) => {

    const connection = await getConnection();

    const ability = {
        card_id: cardId,
        ability_name: name,
        ability_text: text,
        ability_type: type
    };

    connection.query('INSERT INTO card_abilities SET ?', ability, function (error, results, fields) {
        if (error) throw error;
    });
}

const insertCardRule = async(cardId, textRule) => {

    const connection = await getConnection();

    const rule = {
        card_id: cardId,
        text: textRule,
    };

    connection.query('INSERT INTO card_rules SET ?', rule, function (error, results, fields) {
        if (error) throw error;
    });
}

const insertCardLegality = async(cardId, legalityId) => {

    const connection = await getConnection();

    const legality = {
        card_id: cardId,
        legality_id: legalityId,
    };

    connection.query('INSERT INTO card_legalities SET ?', legality, function (error, results, fields) {
        if (error) throw error;
    });
}

const insertCardAttack = async(cardId, attackObj) => {

    const connection = await getConnection();

    const attack = {
        card_id: cardId,
        name: attackObj.name,
        damage: attackObj.damage,
        text: attackObj.text
    };

    connection.query('INSERT INTO card_attacks SET ?', attack, (error, results, fields) => {
        if (error) throw error;

        let attackId = results.insertId;

        // Si tiene coste obtengo el coste de cada uno de sus tipos
        if (attackObj.cost) {

            let attackTypes = attackObj.cost;
            let uniqueTypes = [...new Set(attackTypes)];
            
            // Recorro y hago una inserción de cada tipo de coste
            uniqueTypes.forEach( async(uniqueType) => {
                let cost = attackTypes.filter((type) => type === uniqueType).length;
                
                insertAttackCost(attackId, uniqueType, cost);
            });
        }
    });
}

const insertAttackCost = async(attackId, uniqueType, cost) => {
    const connection = await getConnection();

    const query = await connection.query(`SELECT id FROM types WHERE name = '${uniqueType}'`);
    const typeId = query[0].id || undefined;
    
    const attackCost = {
        attack_id: attackId,
        type_id: typeId,
        cost: cost
    }
    
    connection.query('INSERT INTO attack_costs SET ?', attackCost, function (error, results, fields) {
        if (error) throw error;
    });
}

const importCards = async(req, res) => {

    const setId = req.params.setId; // set for expansion
    const connection = await getConnection();
    const endpoint = `https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`;
    // const endpoint = `https://api.pokemontcg.io/v2/cards?q=set.id:${setId} id:swsh11-217`;
    
    const request = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'X-API-KEY': config.tcg_api_key,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    
    const { data: cards } = await request.json();

    cards.map(async (card) => {

        let cardData = {};
        
        cardData.shortening = card.id;
        cardData.supertype = card.supertype;
        cardData.name = card.name;
        cardData.number = card.number;
        cardData.pokedex_number = card.nationalPokedexNumbers ? card.nationalPokedexNumbers[0] : null;
        cardData.artist = card.artist || null;
        cardData.hp = card.hp || null;
        cardData.level = card.level || null;
        cardData.evolves_from = card.evolvesFrom || null;
        cardData.evolves_to = card.evolvesTo ? card.evolvesTo.toString() : null;
        cardData.retried_cost = card.convertedRetreatCost || null;
        cardData.retried_type = card.retreatCost ? card.retreatCost[0] : null;
        cardData.small_img = card.images.small || null;
        cardData.large_img = card.images.large || null;
        cardData.cardmarket_url = card.cardmarket ? card.cardmarket.url : null;  

        // DATOS QUE OBTENER POR CONSULTA
        // console.log('Muestro card: ', card);

        // Insetando en la base de datos

        const sets = await connection.query(`SELECT id FROM sets WHERE shortening = '${card.set.id}'`);
        const rarities = await connection.query(`SELECT id FROM rarities WHERE name = '${card.rarity}'`);
        

        cardData.set_id = sets[0].id;
        cardData.rarity_id = rarities[0].id;

        let card_id;

        // IMPORTO LA CARTA Y OBTENGO SU ID

        connection.query('INSERT INTO cards SET ?', cardData, function (error, results, fields) {
            if (error) throw error;

            card_id = results.insertId;
            
            // RECORRO SUS TIPOS (SI TUVIERA)
            if (card.types) {
                
                card.types.map(async(type) => {
                    const query = await connection.query(`SELECT id FROM types WHERE name = '${type}'`);
                    const type_id = query[0].id || undefined;

                    insertCardType(card_id, type_id);
                });
            }
              
            // RECORRER SUBTYPES (si tuviera)
            if (card.subtypes) {
                
                card.subtypes.map(async(subtype) => {
                    const query = await connection.query(`SELECT id FROM subtypes WHERE name = '${subtype}'`);
                    const subtype_id = query[0].id || undefined;

                    insertCardSubtype(card_id, subtype_id);
                });
            }

            // RECORRER ATTACKS
            if (card.attacks) {
                
                card.attacks.map(async(attackObj) => {
                    // Inserto el ataque de la carta
                    insertCardAttack(card_id, attackObj);
                });
            }

            // RECORRER WEAKNESSES
            if (card.weaknesses) {
    
                card.weaknesses.map(async(weakness) => {
                    const query = await connection.query(`SELECT id FROM types WHERE name = '${weakness.type}'`);
                    const type_id = query[0].id || undefined;
                    
                    const w_value = parseInt(weakness.value.replace(/[^\-?(0-9)]+/g, ''));
                    insertCardEfficience(card_id, type_id, w_value);
                });
            }

            // // RECORRER RESISTANCES
            if (card.resistances) {
    
                card.resistances.map(async(resistance) => {
                    const query = await connection.query(`SELECT id FROM types WHERE name = '${resistance.type}'`);
                    const type_id = query[0].id || undefined;
    
                    const r_value = parseInt(resistance.value.replace(/[^\-?(0-9)]+/g, ''));
                    insertCardEfficience(card_id, type_id, r_value);
                });
            }

            if (card.abilities) {
    
                card.abilities.map(async(ability) => {
    
                    const name = ability.name;
                    const text = ability.text;
                    const type = ability.type;
                    
                    insertCardAbility(card_id, name, text, type);
                });
            }

            if (card.rules) {
    
                card.rules.map(async(textRule) => {
                    insertCardRule(card_id, textRule);
                });
            }

            if (card.legalities) {

                Object.entries(card.legalities).forEach(async([legality, value]) => {
                    

                    const query = await connection.query(`SELECT id FROM legalities WHERE name = '${legality}'`);
                    const legality_id = query[0].id || undefined;

                    // console.log('card id + leg: ', card.name, card_id, legality_id);

                    insertCardLegality(card_id, legality_id);
                });
            }
        });
    });
    
    res.json('Cartas importadas correctamente.');
}

export const methods = {
    importCards,
    importRatities,
    importTypes,
    importSubtypes,
    importSets
} 