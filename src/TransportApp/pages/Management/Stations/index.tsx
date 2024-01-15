import { useEffect, useState } from "react"
import { getData } from "../../../../services/common/getData"
import { Button, Card, Form, Input, Modal, Row, Select, Table, message } from "antd"
import { postData } from "../../../../services/common/postData"


const stationTypes = [
    { label: 'Abastecimiento', value: 'SUPPLY' },
    { label: 'Mantenimiento', value: 'MAINTENANCE' }
]

const fuelTypes = [
    { label: 'Gasolina', value: 'GASOLINA' }
]


const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Ciudad',
        key: 'city',
        render: (record: any) => (
            <span>{record.city.name}</span>
        )
    },
    {
        title: 'Tipo',
        key: 'type',
        render: (record: any) => (
            <span>{record.type === "SUPPLY" ? "Abastecimiento" : "Mantenimiento"}</span>
        )
    }
]


function StationForm({ handleModal, handleRefresh }: any) {

    const [form] = Form.useForm()

    const [cities, setCities] = useState<any>([])

    const [selectedType, setSelectedType] = useState('')

    const handleFinish = async (values: any) => {
        const cleanValues = {
            ...values, 
            city: { id: values.city }
        }

        const request = await postData('api/serviceStations', cleanValues)
        if ('name' in request) {
            message.success("Estación de servicio agregada exitosamente")
            handleModal()
            handleRefresh()
        }
    }


    const initialRequest = async () => {
        const requestCities = await getData('api/cities')
        if(Array.isArray(requestCities)){
            const citiesToSelect = requestCities.map((city:any) => {
                return {
                    ...city, 
                    label: city.name,
                    value: city.id
                }
            })
            setCities(citiesToSelect)
        }
    }

    useEffect(() => {
        initialRequest()
    }, [])

    const handleChange = (value: any) => setSelectedType(value)

    return (
        <Form form={form} onFinish={handleFinish}>
            <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Informació requerida' }]} >
                <Input />
            </Form.Item>
            <Form.Item label="Ciudad" name="city" rules={[{ required: true, message: 'Informació requerida' }]} >
                <Select options={cities} />
            </Form.Item>
            <Form.Item label="Tipo" name="type" rules={[{ required: true, message: 'Informació requerida' }]} >
               <Select options={stationTypes} onChange={handleChange} />
            </Form.Item>

            {selectedType === 'SUPPLY' && (
                <Form.Item label="Tipo de combustible" name="fuelType" rules={[{ required: true, message: 'Informació requerida' }]} >
                    <Select options={fuelTypes} />
                </Form.Item>
            )}

            {selectedType === 'MAINTENANCE' && (
                <Form.Item label="Actividades" name="activities" rules={[{ required: true, message: 'Informació requerida' }]} >
                    <Input.TextArea />
                </Form.Item>
            )}

            <Row justify="end" >
                <Button htmlType="submit" type="primary">Guardar</Button>
            </Row>
        </Form>
    )
}




function StationsPage() {

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const [openModal, setOpenModal] = useState(false)

    const [refresh, setRefresh] = useState(false)


    const initialRequest = async () => {
        setLoading(true)
        const request = await getData('api/serviceStations')
        if (Array.isArray(request)) {
            setData(request)
            setLoading(false)
        }
    }


    useEffect(() => {
        initialRequest()
    }, [refresh])

    const handleModal = () => setOpenModal(!openModal)

    const handleRefresh = () => setRefresh(!refresh)


    return (
        <Card title="Estaciones de servicio" extra={<Button onClick={handleModal} type="primary">Nueva estación de servicio</Button>} >
            <Table loading={loading} dataSource={data} columns={columns} />

            <Modal title="Estación de servicio" open={openModal} onCancel={handleModal} footer={null}>
                <StationForm handleModal={handleModal} handleRefresh={handleRefresh} />
            </Modal>

        </Card>
    )
}

export default StationsPage