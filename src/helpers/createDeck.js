

export const createDeck = async (deckObj) => {
    const data = JSON.stringify(deckObj);

    // GET
    const url = `http://localhost:4000/api/create-deck?data=${data}`;
    const request = await fetch(url);
    const response = await request.json();    
    
    return JSON.parse(response);
    
    // POST
    // const url = `http://localhost:4000/api/create-deck`;
    // const request = await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // });
    // const response = await request.json();   
}