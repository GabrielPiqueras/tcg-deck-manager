
import { getConnection } from '../database/database';

const getCards = async (req, res) => {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM cards');
    
    res.json(result);
}

export const methods = {
    getCards
}