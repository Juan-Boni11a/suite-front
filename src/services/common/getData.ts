export function getData(endPoint:string){
    let headers = localStorage.getItem("token") !== undefined ?
    {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token")
    }
    :
    {
        'Content-Type': 'application/json'
    }
    const options:any = {
        method: 'GET',
        headers
    }
   
    const request = fetch(`${import.meta.env.VITE_API_URL}/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}