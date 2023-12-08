import { Button, Card, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { getData } from "../../../services/common/getData";
import UserForm from "../../../components/Forms/UserForm";
import RoleAssignmentForm from "../../../components/Forms/RoleAssignmentForm";




function UsersPage() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const [refresh, setRefresh] = useState(false)

    const [openRoleAssignmentModal, setOpenRoleAssigmentModal] = useState(false)

    const [selectedUser, setSelectedUser] = useState(null)

    async function initialRequest() {
        setLoading(true)
        const request = await getData('users')
        console.log('r', request)
        if (request.length > 0) {
            setUsers(request)
            setLoading(false)
        }
    }

    useEffect(() => {
        initialRequest()
    }, [refresh])

    const handleModal = () => setOpenModal(!openModal)

    const handleRefresh = () => setRefresh(!refresh)


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
            title: "No. cédula",
            dataIndex: "ci",
            key: "ci",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Número de teléfono",
            dataIndex: "phone_number",
            key: "phone_number",
        },
        {
            title: 'Acciones',
            key: 'X',
            render: (record: any) => (
                <Button type="primary" onClick={() => {
                    setSelectedUser(record)
                    handleRoleModal()
                }}>
                    Asignar roles
                </Button>
            )
        }
    ];

    const handleRoleModal = () => setOpenRoleAssigmentModal(!openRoleAssignmentModal)

    return (
        <Card title="Usuarios" extra={<Button onClick={handleModal} type="primary">Agregar</Button>} >
            <Table columns={columns} dataSource={users} loading={loading} pagination={{ pageSize: 20 }} />
            <Modal open={openModal} title="Usuario" onCancel={handleModal} footer={null}>
                <UserForm handleModal={handleModal} handleRefresh={handleRefresh} />
            </Modal>

            <Modal width={800} open={openRoleAssignmentModal} title="Asignación de roles" onCancel={handleRoleModal} footer={null}>
                <RoleAssignmentForm selectedUser={selectedUser} />
            </Modal>

        </Card>
    )

}

export default UsersPage;