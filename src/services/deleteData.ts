export function deleteData(endPoint:string, isHeme: boolean = false){
    let headers = localStorage.getItem("token") !== undefined ?
    {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
    :
    {
        'Content-Type': 'application/json'
    }
    const options:any = {
        method: 'DELETE',
        headers
    }


    const serviceUrl = !isHeme  ?  import.meta.env.VITE_API_URL : import.meta.env.VITE_HEME_API_URL 

    const request = fetch(`${serviceUrl}/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}