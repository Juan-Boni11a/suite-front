/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Dropdown, MenuProps, Modal, Space, Table } from 'antd'
import { useEffect, useState, useContext } from 'react'
// import { getData } from '../../services/getData'
import { DownOutlined, PlusOutlined } from '@ant-design/icons'
import SolicitudManetenimientoForm from '../../../components/Forms/Admin/SolicitudMantenimientoForm'
import RequestMantClientForm from '../../../components/Forms/Cliente/RequestMantClientForm'
import { getData } from '../../../../services/common/getData';
import { AuthContext } from '../../../../context/AuthContext';





const SolicitudMantenimientoPage = () => {

    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState<any>([])

    const [filteredData, setFilteredData] = useState<any>([])

    const [selectedRequest, setSelectedRequest] = useState(false)

    const { user }: any = useContext(AuthContext)

    const isAdmin = user.roles[0].name !== "CLIENTE" ? true : false

    async function initialRequest() {
        setLoading(true)
        const request = await getData('api/maintenanceRequests')
        console.log('request', request)
        if (Array.isArray(request)) {
            setData(request)
            setFilteredData(request)
            setLoading(false)
        }
    }

    useEffect(() => {
        initialRequest()
    }, [refresh])

    function handleModal() {
        setShowModal(!showModal)
    }

    function handleRefresh() {
        setRefresh(!refresh)
    }



    function handleCheckRequest(record: any) {
        setSelectedRequest(record)
        setShowModal(true)
    }

    const columns = [
        {
            title: "Cliente",
            dataIndex: "",
            key: "customer",
            render: (record: any) => (
                record.requester !== null && (
                    <span>
                        {record.requester.name} {record.requester.lastname}
                    </span>
                )

            ),
        },
        {
            title: "Hora de salida",
            dataIndex: "horaRequest",
            key: "horaRequest",
        },
        {
            title: "Acciones",
            dataIndex: "",
            key: "x",
            render: (record: any) => (
                <Button
                    onClick={() => handleCheckRequest(record)}
                    type="primary"
                    style={{ marginBottom: 16 }}
                >
                    Revisar
                </Button>

            ),
        },
    ];

    return (
        <div>
            <Card
                title="Solicitud de mantenimiento"
                extra={
                    !isAdmin &&
                        <Button icon={<PlusOutlined />} type="primary" onClick={handleModal}>
                            Nueva solicitud
                        </Button>}
            >
                <Table loading={loading} columns={columns} dataSource={filteredData} />
                <Modal
                    open={showModal}
                    onCancel={handleModal}
                    footer={null}
                    width="60%"
                    title={isAdmin ? "Orden de mantenimiento" : "Solicitud de orden de mantenimiento"}>
                    {isAdmin ? (<SolicitudManetenimientoForm />) : (<RequestMantClientForm handleModal={handleModal} handleRefresh={handleRefresh} />)}
                </Modal>
            </Card>
        </div>
    )
}

export default SolicitudMantenimientoPage
