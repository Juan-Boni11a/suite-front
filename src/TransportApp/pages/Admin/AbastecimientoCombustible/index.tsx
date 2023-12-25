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
import AbasCombustibleForm from '../../../components/Forms/Admin/AbasCombustibleForm'
import { getData } from '../../../../services/common/getData'





const AbastecimientoCombustiblePage = () => {

    const [loading,setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState<any>([])

    async function initialRequest() {
        setLoading(true)
        const request = await getData('supplyRequests')
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
            <Card title="Abastecimiento de Combustible" extra={<Button icon={<PlusOutlined />} type="primary" onClick={handleModal}>Nueva solicitud</Button>}>
                <Table loading={loading} dataSource={data} />
                <Modal open={showModal} onCancel={handleModal} footer={null} width="60%" title="Solicitud de orden de abastecimiento">
                    <AbasCombustibleForm handleModal={handleModal} handleRefresh={handleRefresh} />
                </Modal>
            </Card>
        </div>
    )
}

export default AbastecimientoCombustiblePage
