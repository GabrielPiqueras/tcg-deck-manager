
export const authUser = async(username, password) => {
    const url = `http://localhost:4000/api/auth-user?username=${username}&password=${password}`;
    const request = await fetch(url);
    const user = await request.json();    

    return user;
}