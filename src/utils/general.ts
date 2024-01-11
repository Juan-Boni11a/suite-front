export function transformDate(dateString: any) {
    // Crear un objeto Date a partir de la cadena
    var dateObject = new Date(dateString);

    // Obtener los componentes de fecha y hora
    var year = dateObject.getUTCFullYear();
    var month = dateObject.getUTCMonth() + 1; // Meses en JavaScript se cuentan desde 0
    var day = dateObject.getUTCDate();

    // Formatear la cadena de fecha en el formato deseado (yyyy-MM-dd)
    var formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return formattedDate

}

export function transformTime(timeString: any) {

    const fecha = new Date(timeString);
    // Obtener horas, minutos y segundos
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

    // Formatear la hora como una cadena
    const horaFormateada = `${horas}:${minutos}:${segundos}`;


    return horaFormateada
}