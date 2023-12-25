/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Dropdown, MenuProps, Modal, Space, Table } from 'antd'
import { useEffect, useState } from 'react'
// import { getData } from '../../services/getData'
import { DownOutlined, PlusOutlined } from '@ant-design/icons'
import SolicitudTransportForm from '../../../components/Forms/Admin/SolicitudTransportForm'
import { getData } from '../../../../services/common/getData'


const columns = [
    {
        title: "Iniciador",
        key: "initiator",
        width: "30%",
        render: (record: any) => (
            <span>{record.initiatorId.name + " " + record.initiatorId.lastname}</span>
        )
    },
    {
        title: "Actividad actual",
        dataIndex: "currentActivity",
        key: "currentActivity",
        width: "30%",
    },
    {
        title: "Fecha de salida",
        dataIndex: "departureDate",
        key: "emitDate",
        width: "30%",
    },
    {
        title: "Fecha de retorno",
        dataIndex: "returnDate",
        key: "expiryDate",
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



const SolicitudTransportPage = () => {

    const [loading, setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState<any>([])

    async function initialRequest() {
        setLoading(true)
        const request = await getData('transportationRequests')
        if (Array.isArray(request)) {
            setData(request)
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

    return (
        <div>
            <Card title="Solicitudes de transporte" extra={<Button icon={<PlusOutlined />} type="primary" onClick={handleModal}>Nueva solicitud</Button>}>
                <Table loading={loading} dataSource={data} columns={columns} />
                <Modal open={showModal} onCancel={handleModal} footer={null} width="60%" title="Solicitud de orden de transporte">
                    <SolicitudTransportForm handleModal={handleModal} handleRefresh={handleRefresh} />
                </Modal>
            </Card>
        </div>
    )
}

export default SolicitudTransportPage
