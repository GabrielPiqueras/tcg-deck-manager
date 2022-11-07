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
    // console.log(`Muestro typetext: ${typeText} y cardId: ${cardId}`);

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

const insertCardAttack = async(cardId, attackId, name, damage, text) => {

    const connection = await getConnection();

    const attack = {
        card_id: cardId,
        attack_id: attackId,
        name: name,
        damage: damage,
        text: text
    };

    connection.query('INSERT INTO card_attacks SET ?', attack, function (error, results, fields) {
        if (error) throw error;
    });
}

const importCards = async(req, res) => {

    const setId = req.params.setId; // set for expansion
    const connection = await getConnection();
    const endpoint = `https://api.pokemontcg.io/v2/cards?q=set.id:${setId}`;

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
        cardData.cardmarket_url = card.cardmarket.url || null;  
        
        // DATOS QUE OBTENER POR CONSULTA
        console.log('Muestro card: ', card);

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
        });

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
            
            card.attacks.map(async(attack) => {
                const query = await connection.query(`SELECT * FROM attacks WHERE name = '${attack}'`);
                const attack_id = query[0].id;
                const name = query[0].name;
                const damage = query[0].damage;
                const text = query[0].text;
                
                // CONTAR Cuantas veces aparece una misma palabra en el array attack.cost
                // HACER UN INSERT EN ATTACK_COSTS con el tipo de energía y la cantidad de esta por cada tipo diferennte en el ataqaue
                
                // FALTA MEJORAR
                // insertCardAttack(card_id, attack_id, name, damage, text);
            });
        }
        // card.attacks.map(async(attack) => {

        // });
        // RECORRER WEAKNESSES
        // card.weakness.map(async() => {

        // });
        // RECORRER RESISTANCES
        // card.resistances.map(async() => {

        // });
    
    });
    
    res.json('Cartas importadas correctamente');
}

export const methods = {
    importCards,
    importRatities,
    importTypes,
    importSubtypes,
    importSets
}