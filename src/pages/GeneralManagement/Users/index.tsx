import { Button, Card, Table } from "antd";
import { useEffect, useState } from "react";
import { getData } from "../../../services/common/getData";


const columns = [
    {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
        width: "30%",
    },
    {
        title: "Apellido",
        dataIndex: "lastname",
        key: "lastname",
        width: "30%",
    },
    {
        title: "No. cédula",
        dataIndex: "ci",
        key: "ci",
        width: "30%",
    },
    {
        title: "Número de teléfono",
        dataIndex: "phone_number",
        key: "phone_number",
        width: "30%",
    },
    {
        title: "Acciones",
        dataIndex: "",
        key: "x",
        render: (record:any) => (
            <Button
                // onClick={() => showModal(record)}
                type="primary"
                style={{ marginBottom: 16 }}
            >
                Editar
            </Button>

        ),
    },
];

function UsersPage() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    async function initialRequest() {
        setLoading(true)
        const request = await getData('users')
        console.log('r', request)
        if(request.length > 0) {
            setUsers(request)
            setLoading(false)
        }
    }

    useEffect(() => {
        initialRequest()
    }, [])

    return(
        <Card title="Usuarios" extra={<Button type="primary">Agregar</Button>} >
            <Table columns={columns} dataSource={users} loading={loading}/>
        </Card>
    )
    
}

export default UsersPage;