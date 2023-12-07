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
import SolicitudManetenimientoForm from '../../components/Forms/SolicitudMantenimientoForm'





const SolicitudMantenimientoPage = () => {

    const [loading,setLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState([])

    async function initialRequest() {
        setLoading(true)
        setLoading(false)
        /*const request = await getData('api/show-all-school-representative')
        if (request['status_code'] === 200) {
            setData(request.data)
            setLoading(false)
        }
        */
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
            <Card title="Solicitud de orden de movilización">
                <SolicitudManetenimientoForm />
            </Card>
        </div>
    )
}

export default SolicitudMantenimientoPage
