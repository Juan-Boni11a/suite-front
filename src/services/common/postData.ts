export function postData(endPoint:string, data:any){
    let headers = localStorage.getItem("token") !== undefined ?
    {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem("token"),
        'mode': 'no-cors'
    }
    :
    {
        'Content-Type': 'application/json',
        'mode': 'no-cors'
    }
    const options:any = {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }
   
    const request = fetch(`${import.meta.env.VITE_API_URL}/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}

export function postFormData(endPoint:string, data:any){
    let headers: HeadersInit = localStorage.getItem("token") !== undefined ?
    {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
    :
    {}
    const options = {
        method: 'POST',
        headers,
        body: data
    }
    
    const request = fetch(`https://pet-rescue-api.onrender.com/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}


export function postImageData(endPoint:string, data:any){
    const options = {
        method: 'POST',
        body: data
    }
    
    const request = fetch(`https://shape-gen-api.onrender.com/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}


export function transformShape(endPoint:string, data:any){
    let headers = {
        'Content-Type': 'application/json'
    }
    const options:any = {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }
   
    const request = fetch(`https://shape-gen-api.onrender.com/${endPoint}`, options)
    const json = request.then(response => response.json())
    return json;
}



interface IMeasure {
    pecho: number,
    piernas: number,
    cadera: number,
    cintura: number,
    brazos: number
}

export interface ITransformProp {
    medidas: IMeasure
    medidas_original: IMeasure
    image_url: string
}

export function transform(endPoint:string, data:ITransformProp){
    let headers = {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": true,
        origin: window.location.origin
    }
    const options:any = {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }
   
    const request = fetch(`https://7ece-2800-bf0-284-121-ec87-faeb-9641-5514.ngrok-free.app/${endPoint}`, options)
    const json = request.then(response => response.json()).catch((e:any) => console.log('error', e))
    return json;
}