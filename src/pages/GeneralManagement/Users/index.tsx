import { Button, Card, Form, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import { getData } from "../../../services/common/getData";
import UserForm from "../../../components/Forms/UserForm";
import RoleAssignmentForm from "../../../components/Forms/RoleAssignmentForm";
import * as dayjs from 'dayjs'
import 'dayjs/locale/es'
import { useNavigate } from "react-router-dom";

dayjs.locale('es')



function UsersPage() {
    const navigate = useNavigate();
    
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const [refresh, setRefresh] = useState(false)

    const [openRoleAssignmentModal, setOpenRoleAssigmentModal] = useState(false)

    const [selectedUser, setSelectedUser] = useState<any>(null)

    async function initialRequest() {
        setLoading(true)
        const request = await getData('api/users')
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
                    console.log('r', record)
                    setSelectedUser(record)
                    handleRoleModal(record)
                }}>
                    Asignar rol
                </Button>
            )
        }
    ];

    const [roleForm] = Form.useForm()

    const handleRoleModal = (record: any) => {

        if (openRoleAssignmentModal) {
            roleForm.resetFields()
        }

        if (typeof record !== "undefined") {
            console.log('record', record)
            if('role' in record){
                const roleValue = record.role !== null ? record.role.id : undefined
                roleForm.setFieldValue('roles', roleValue)

                if(roleValue===3){
                    roleForm.setFieldValue('licenceExpiryDate', dayjs(record.licenceExpiryDate))
                    roleForm.setFieldValue('licenseType', record.licenceExpiryDate)
                }
            }
        }

        setOpenRoleAssigmentModal(!openRoleAssignmentModal)
    }

    return (
        <>
        <Button onClick={() => navigate("/selection")} type="primary" style={{ marginBottom: 12 }}>Volver</Button>
        <Card title="Usuarios" extra={<Button onClick={handleModal} type="primary">Agregar</Button>} >
            <Table columns={columns} dataSource={users} loading={loading} pagination={{ pageSize: 20 }} />
            <Modal open={openModal} title="Usuario" onCancel={handleModal} footer={null}>
                <UserForm handleModal={handleModal} handleRefresh={handleRefresh} />
            </Modal>

            <Modal width={800} open={openRoleAssignmentModal} title="Asignación de roles" onCancel={handleRoleModal} footer={null}>
                <RoleAssignmentForm roleForm={roleForm} selectedUser={selectedUser} handleModal={handleRoleModal} handleRefresh={handleRefresh} />
            </Modal>

        </Card>
        </>
    )

}

export default UsersPage;