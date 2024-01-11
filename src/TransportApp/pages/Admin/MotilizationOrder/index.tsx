/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Dropdown, MenuProps, Modal, Space, Table, } from 'antd'
import { useContext, useEffect, useState } from 'react'
// import { getData } from '../../services/getData'
import { DownOutlined, PlusOutlined } from '@ant-design/icons'
import { getData } from '../../../../services/common/getData';
import MovilizationRequestForm from '../../../components/Forms/Admin/MotilizationRequestForm'
import MovRequestClienteForm from '../../../components/Forms/Cliente/MovRequestClienteForm'
import { AuthContext } from '../../../../context/AuthContext';





const Filters = ({ filterBy }: any) => {

    let items: MenuProps['items'] = [];

    items.push(
        {
            key: '1',
            label: (
                <a rel="noopener noreferrer" onClick={() => filterBy('PENDING')}>
                    Pendientes
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a rel="noopener noreferrer" onClick={() => filterBy('APPROVED')}>
                    Aprobadas
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a rel="noopener noreferrer" onClick={() => filterBy('ALL')}>
                    Todas
                </a>
            ),
        }
    )

    return (
        <Dropdown
            menu={{ items }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    Mostrar
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    )
}


const MovilizationOrderPage = () => {

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
        const request = isAdmin ? await getData('api/movilizationRequests') : await getData('api/movilizationRequestsByRequester/' + user.id)
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


    function handleFilterBy(value: any) {
        if (value === "PENDING") {
            const pending = data.filter((req: any) => req.driver === null)
            setFilteredData(pending)
            return
        }

        //SOLO PARA PROBAR HASTA QUE YA HAYAN APROBADAS
        if (value === "ALL") {
            setFilteredData([])
        }
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
            title: "Fecha de salida",
            dataIndex: "dateArrival",
            key: "dateArrival",
        },
        {
            title: "Hora de salida",
            dataIndex: "hourArrival",
            key: "hourArrival",
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
                title="Solicitudes de orden de movilización"
                extra={
                    isAdmin ?
                        <Filters filterBy={handleFilterBy} />
                        :
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
                    title={isAdmin ? "Orden de movilización" : "Solicitud de orden de movilización"}>
                    {isAdmin ? (
                        <MovilizationRequestForm handleModal={handleModal} handleRefresh={handleRefresh} selectedRequest={selectedRequest} />

                    ) : (
                        <MovRequestClienteForm handleModal={handleModal} handleRefresh={handleRefresh} />

                    )}
                </Modal>
            </Card>
        </div>
    )
}

export default MovilizationOrderPage
