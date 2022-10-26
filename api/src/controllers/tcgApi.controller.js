import { getConnection } from '../database/database';
import config from '../config';
import fetch from 'node-fetch';

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

const importCards = async(req, res) => {
    const connection = await getConnection();
    const endpoint = 'https://api.pokemontcg.io/v2/cards';

    const request = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'X-API-KEY': config.tcg_api_key,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    
    const { data: cards } = await request.json();

    cards.map((card) => {

        let info = {};

        info.id = card.id || null;
        info.supertype = card.supertype || null;
        info.name = card.name || null;
        info.level = card.level || null;
        info.setId = card.set.id || null;
        info.evolvesFrom = card.evolvesFrom || null;
        info.retreatCost = card.retreatCost || null;
        info.convertedRetreatCost = card.convertedRetreatCost || null;
        info.type1 = card.types[0] || null;
        info.type2 = card.types[1] || null;
        info.number = card.number || null;
        info.artist = card.artist || null;
        info.rarity = card.rarity || null;
        info.flavorText = card.flavorText || null;
        info.nationalPokedexNumbers = card.nationalPokedexNumbers[0] || null;
        info.img_small = card.images.small || null;
        info.img_large = card.images.large || null;
        info.cardmarket = card.cardmarket.url || null;
        
        // Insetando en la base de datos
        connection.query('INSERT INTO rarities SET ?', { name: info.name }, function (error, results, fields) {
            if (error) throw error;
            console.log('ID DE LA CARTA INSERTADA: ', results.insertId);
        });
    });
    
    res.json('Cartas importadas correctamente.');
}

export const methods = {
    importCards,
    importRatities
}