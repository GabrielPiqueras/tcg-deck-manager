
import { getConnection } from '../database/database';

const getRarities = async (req, res) => {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM rarities');
    
    res.json(result);
}

export const methods = {
    getRarities
}