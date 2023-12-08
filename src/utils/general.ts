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
    // Crear un objeto Date a partir de la cadena
    var dateObject = new Date(timeString);

    // Obtener los componentes de fecha y hora
    var hours = dateObject.getUTCHours().toString().padStart(2, '0');
    var minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
    var seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');
    var milliseconds = dateObject.getUTCMilliseconds();

    // Formatear la cadena de tiempo en el formato deseado (hh:mm:ss.SSS)
    var formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;

    return formattedTime;
}