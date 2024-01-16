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

    const vData = {
        labels: ['Disponibles', 'Ocupados'],
        datasets: [
            {
                data: [30, 70], // Reemplaza con tus datos reales
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };


    const dData = {
        labels: ['Disponibles', 'Ocupados'],
        datasets: [
            {
                data: [65, 35], // Reemplaza con tus datos reales
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };



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
    ];


    async function initialRequest() {

        const requestAll = await getData('api/vehicles')
        let totalVehicles = 1;
        if (Array.isArray(requestAll)) {
            totalVehicles = requestAll.length
        }

        const requestFree = await getData('api/vehicles/free')
        let freeAverage = 0;
        if (Array.isArray(requestFree)) {
            freeAverage = (requestFree.length / totalVehicles) * 100
        }

        const requestBusy = await getData('api/vehicles/busy')
        let busyAverage = 0;
        if (Array.isArray(requestBusy)) {
            busyAverage = (requestBusy.length / totalVehicles) * 100
        }



        if (freeAverage + busyAverage === 100) {
            setVehiclesData({
                labels: ['Disponibles', 'Ocupados'],
                datasets: [
                    {
                        data: [freeAverage, busyAverage],
                        backgroundColor: ['#36A2EB', '#FF6384'],
                        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
                    }
                ]
            })
            setLoadingVdata(false)
        }


        let totalDrivers = 1;
        const requestAllUsers = await getData('api/users')
        if (Array.isArray(requestAllUsers)) {
            const drivers = requestAllUsers.filter((u: any) => u.roles.find((r: any) => r.id === 3))
            totalDrivers = drivers.length
        }


        const requestBusyDrivers = await getData('api/users/busyDrivers')
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

        const requestFreeDrivers = await getData('api/users/freeDrivers')
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
                        <Table columns={columns} dataSource={busyDrivers} loading={loadingBusyDrivers} />
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