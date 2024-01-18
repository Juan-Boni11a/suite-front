import { Card, Col, Row, Spin, Table } from "antd";
import PieChart from "../../components/Charts/Piechart";
import { getData } from "../../../services/common/getData";
import { useEffect, useState } from "react";

function Dashboard() {

    const [vehiclesData, setVehiclesData] = useState<any>(null)
    const [driversData, setDriversData] = useState<any>(null)


    const [busyDrivers, setBusyDrivers] = useState<any>([])
    const [loadingVdata, setLoadingVdata] = useState<any>(true)

    const [loadingDdata, setLoadingDdata] = useState<any>(true)

    const [loadingBusyDrivers, setLoadingBusyDrivers] = useState<any>(true)


    const [driversInMovilization, setDriversInMovilization] = useState<any>([])
    const [loadingDriversInMovilization, setLoadingDriversInMovilization] = useState(true)

    const columns = [
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Apellido",
            dataIndex: "lastname",
            key: "lastname",
        },
        {
            title: "Número de teléfono",
            dataIndex: "phone_number",
            key: "phone_number",
        },
        {
            title: "Ruta",
            key: "x",
            render: (record: any) => <span>{record.emitPlace + "-" + record.expiryPlace}</span>
        },
        {
            title: "Fecha de salida",
            key: "x",
            render: (record: any) => <span>{record.emitDate + "-" + record.emitHour}</span>
        },
        {
            title: "Fecha de llegada",
            key: "x",
            render: (record: any) => <span>{record.expiryDate + "-" + record.expiryHour}</span>
        },

    ];


    async function initialRequest() {

        

        const requestAllVehicles = await getData('api/vehicles/busy')
        
        if('freeVehicles' in requestAllVehicles){
            const {busyVehicles, freeVehicles} = requestAllVehicles 
            const totalVehicles = busyVehicles.length + freeVehicles.length
            
            let busyVehiclesAverage = (busyVehicles.length / totalVehicles) * 100

            let freeVehiclesAverage = (freeVehicles.length / totalVehicles) * 100

            setVehiclesData({
                labels: ['Disponibles', 'Ocupados'],
                datasets: [
                    {
                        data: [freeVehiclesAverage, busyVehiclesAverage],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                    }
                ]
            })

            setLoadingVdata(false)  
        }



        const requestAllDrivers = await getData('api/users/busyDrivers')
        
        if('freeDrivers' in requestAllDrivers){
            const {busyDrivers, freeDrivers} = requestAllDrivers 
            const totalDrivers = busyDrivers.length + freeDrivers.length
            let busyDriversAverage = (busyDrivers.length / totalDrivers) * 100

            let freeDriversAverage = (freeDrivers.length / totalDrivers) * 100

            setDriversData({
                labels: ['Disponibles', 'Ocupados'],
                datasets: [
                    {
                        data: [freeDriversAverage, busyDriversAverage],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                    }
                ]
            })

            setLoadingDdata(false)  
        }

        const requestDriversInMovilization = await getData('api/users/driversInMovilization')
        if (Array.isArray(requestDriversInMovilization[0])) {

            let objetosCombinados = [];

            for (let i = 0; i < requestDriversInMovilization[0].length; i += 2) {
                if (i + 1 < requestDriversInMovilization[0].length) {
                    let objetoCombinado = { ...requestDriversInMovilization[0][i], ...requestDriversInMovilization[0][i + 1] };
                    objetosCombinados.push(objetoCombinado);
                } else {
                    // Si hay un número impar de objetos, el último objeto se agrega sin combinar
                    objetosCombinados.push(requestDriversInMovilization[0][i]);
                }
            }

            console.log('objetos combinados', objetosCombinados)
            setDriversInMovilization(objetosCombinados)
            setLoadingDriversInMovilization(false)
        }

        /*
        const requestFreeDrivers = await getData('api/users/freeDrivers')
        if(Array.isArray(requestFreeDrivers)){
            let busyDriversAverage = (requestBusyDrivers.length / totalDrivers) * 100

            let freeDriversAverage = (requestFreeDrivers.length / totalDrivers) * 100

            console.log('bys', busyDriversAverage)

            console.log('fee', freeDriversAverage)
            setDriversData({
                labels: ['Disponibles', 'Ocupados'],
                datasets: [
                    {
                        data: [freeDriversAverage, busyDriversAverage],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                    }
                ]
            })

            setLoadingDdata(false)
        }
        */

        /*
        if (Array.isArray(requestBusyDrivers[0])) {

            let objetosCombinados = [];

            for (let i = 0; i < requestBusyDrivers[0].length; i += 2) {
                if (i + 1 < requestBusyDrivers[0].length) {
                    let objetoCombinado = { ...requestBusyDrivers[0][i], ...requestBusyDrivers[0][i + 1] };
                    objetosCombinados.push(objetoCombinado);
                } else {
                    // Si hay un número impar de objetos, el último objeto se agrega sin combinar
                    objetosCombinados.push(requestBusyDrivers[0][i]);
                }
            }

            console.log('objetos combinados', objetosCombinados)
            setBusyDrivers(objetosCombinados)
            setLoadingBusyDrivers(false)
        }
        
        if (Array.isArray(requestFreeDrivers[0])) {


            let objetosCombinados = [];
            let objetosCombinados2 = [];


            for (let i = 0; i < requestBusyDrivers[0].length; i += 2) {
                if (i + 1 < requestBusyDrivers[0].length) {
                    let objetoCombinado = { ...requestBusyDrivers[0][i], ...requestBusyDrivers[0][i + 1] };
                    objetosCombinados.push(objetoCombinado);
                } else {
                    // Si hay un número impar de objetos, el último objeto se agrega sin combinar
                    objetosCombinados.push(requestBusyDrivers[0][i]);
                }
            }

            for (let i = 0; i < requestFreeDrivers[0].length; i += 2) {
                if (i + 1 < requestFreeDrivers[0].length) {
                    let objetoCombinado = { ...requestFreeDrivers[0][i], ...requestFreeDrivers[0][i + 1] };
                    objetosCombinados2.push(objetoCombinado);
                } else {
                    // Si hay un número impar de objetos, el último objeto se agrega sin combinar
                    objetosCombinados2.push(requestFreeDrivers[0][i]);
                }
            }

            let busyDriversAverage = (objetosCombinados.length / totalDrivers) * 100

            let freeDriversAverage = (objetosCombinados2.length / totalDrivers) * 100


            console.log('bys', busyDriversAverage)

            console.log('fee', freeDriversAverage)
            setDriversData({
                labels: ['Disponibles', 'Ocupados'],
                datasets: [
                    {
                        data: [freeDriversAverage, busyDriversAverage],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                    }
                ]
            })

            setLoadingDdata(false)
        }
        */
    }

    useEffect(() => {
        initialRequest()
    }, [])

    return (
        <div>
            <h3>Dashboard</h3>
            <Row>
                <Col span={24}>
                    <Card title="Conductores en servicio">
                        <Table columns={columns} dataSource={driversInMovilization} loading={loadingDriversInMovilization} />
                    </Card>

                </Col>

                <Col span={12}>
                    <Card title="Conductores">
                        {loadingDdata ? <Spin /> :
                            <PieChart data={driversData} />
                        }
                    </Card>

                </Col>
                <Col span={12}>
                    <Card title="Vehículos">

                        {loadingVdata ? <Spin /> :
                            <PieChart data={vehiclesData} />}
                    </Card>

                </Col>
            </Row>

        </div>
    );
}

export default Dashboard;