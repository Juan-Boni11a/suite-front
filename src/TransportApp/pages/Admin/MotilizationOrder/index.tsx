/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Dropdown, MenuProps, Modal, Space, Table, } from 'antd'
import { useEffect, useState } from 'react'
// import { getData } from '../../services/getData'
import { DownOutlined, PlusOutlined } from '@ant-design/icons'
import { getData } from '../../../../services/common/getData';
import MovilizationRequestForm from '../../../components/Forms/Admin/MotilizationRequestForm'
import MovRequestClienteForm from '../../../components/Forms/Cliente/MovRequestClienteForm'



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
        title: "Fecha de emisión",
        dataIndex: "emitDate",
        key: "emitDate",
        width: "30%",
    },
    {
        title: "Fecha de expiración",
        dataIndex: "expiryDate",
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


const MovilizationOrderPage = () => {

    const [loading,setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState<any>([])

    async function initialRequest() {
        setLoading(true)
        const request = await getData('api/movilizationRequests')
        console.log('request', request)
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

    const isClient = true

    return (
        <div>
            <Card title="Solicitudes de orden de movilización" extra={<Button icon={<PlusOutlined />} type="primary" onClick={handleModal}>Nueva solicitud</Button>}>
                <Table loading={loading} columns={columns} dataSource={data} />
                <Modal open={showModal} onCancel={handleModal} footer={null} width="60%" title="Solicitud de orden de movilización">
                {isClient ? (
                        <MovRequestClienteForm  />
                    ) : ( 
                        <MovilizationRequestForm handleModal={handleModal} handleRefresh={handleRefresh} />
                    )} 
                </Modal>
            </Card>
        </div>
    )
}

export default MovilizationOrderPage
