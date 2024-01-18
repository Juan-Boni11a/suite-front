import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);



export function filterByRestrictions(vehicles: any[], startDate: string, startHour: string, endDate: string, endHour: string) {

    console.log('startDAte', startDate)
    console.log('starthour', startHour)

    console.log('endDAte', endDate)
    console.log('endhour', endHour)

    // Convertir el string de fecha a un objeto Date
    const dateObject = new Date(startDate);
    // Obtener el día de la semana como un número (0 = domingo, 1 = lunes, ..., 6 = sábado)
    const numeroDiaSemana = dateObject.getDay() + 1;

    const startDateTime = dayjs(`${startDate} ${startHour}`);


    const dateObjectEnd = new Date(endDate);

    const numeroDiaSemanaFin = dateObjectEnd.getDay() + 1;


    const endDateTime = dayjs(`${endDate} ${endHour}`);


    console.log('day', numeroDiaSemana)
    console.log('day', numeroDiaSemanaFin)

    // Definir las restricciones para cada día de la semana
    const restrictions: any = {
        1: [1, 2], // Lunes
        2: [3, 4], // Martes,
        3: [5, 6],
        4: [7, 8],
        5: [9, 0]
        // Puedes agregar las restricciones para otros días de la semana según sea necesario
    };

    // Filtrar los vehículos según las restricciones del día de la semana
    const filteredVehicles = vehicles.filter(vehiculo => {
        const lastNumber = Number(vehiculo.plate.slice(-1));

        const bannedVehicles: any = []

        const isInSelectedDayRestriction = restrictions[numeroDiaSemana].includes(lastNumber);
        if (isInSelectedDayRestriction) {
            const isWithinMorningRange = startDateTime.isBetween(startDateTime.clone().startOf('day').add(6, 'hours'), startDateTime.clone().startOf('day').add(9, 'hours').add(30, 'minutes'), null, '[]');
            console.log('aa', isWithinMorningRange)
            const isWithinEveningRange = startDateTime.isBetween(endDateTime.clone().startOf('day').add(16, 'hours'), endDateTime.clone().startOf('day').add(20, 'hours'), null, '[]');
            console.log('bb', isWithinEveningRange)
            if(isWithinMorningRange || isWithinEveningRange){
                if(!bannedVehicles.includes(vehiculo.id)){
                    bannedVehicles.push(vehiculo.id)   
                }
            }
        }

        const isInSelectedDayRestrictionEnd = restrictions[numeroDiaSemanaFin].includes(lastNumber);
        if (isInSelectedDayRestrictionEnd) {
            console.log('in end day')
            const isWithinMorningRange = endDateTime.isBetween(startDateTime.clone().startOf('day').add(6, 'hours'), startDateTime.clone().startOf('day').add(9, 'hours').add(30, 'minutes'), null, '[]');
            console.log('aa', isWithinMorningRange)
            
            const isWithinEveningRange = endDateTime.isBetween(endDateTime.clone().startOf('day').add(16, 'hours'), endDateTime.clone().startOf('day').add(20, 'hours'), null, '[]');
            console.log('bb', isWithinEveningRange)
            
            if(isWithinMorningRange || isWithinEveningRange){
                if(!bannedVehicles.includes(vehiculo.id)){
                    bannedVehicles.push(vehiculo.id)   
                }
            }
        }

        if(!bannedVehicles.includes(vehiculo.id)){
            return vehiculo
        }
    });

    return filteredVehicles;
}


