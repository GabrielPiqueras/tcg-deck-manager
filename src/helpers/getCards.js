
export const getCards = async(name = false) => {
    const url = `http://localhost:4000/api/cards?name=${name}`;
    const request = await fetch(url);
    const response = await request.json();    

    return response;
}