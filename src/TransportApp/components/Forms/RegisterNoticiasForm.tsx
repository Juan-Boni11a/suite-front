import { Button, DatePicker, Form, List, Input, InputNumber, Radio, Modal, Row, Select, Table, Typography, Upload, message } from "antd";
import DriversSelector from "../DriversSelector";
import { useEffect, useState } from "react";
import CarsSelector from "../CarsSelector";
import { getData } from "../../services/common/getData";
import { postData } from "../../../services/common/postData";
import { transformDate, transformTime } from "../../../utils/general";
import { UploadOutlined } from '@ant-design/icons';

const subsectores = [
    { label: 'Empresarial', value: 1 },
    { label: 'Industrial', value: 2 }
]
const tipoInformacion = [
    { label: 'Local', value: 1 },
    { label: 'Actual', value: 2 }
]
const medioComunicacion = [
    { label: 'Digital', value: 1 },
    { label: 'Fisico', value: 2 }
]

function RegisterNoticiasForm({ handleModal, handleRefresh }: any) {
    const [form] = Form.useForm()

    const [showDriversModal, setShowDriversModal] = useState(false)

    const [showCarsModal, setShowCarsModal] = useState(false)

    const [users, setUsers] = useState<any>([])

    const [drivers, setDrivers] = useState<any>([])

    const [vehicles, setVehicles] = useState<any>([])

    const [submitting, setSubmitting] = useState(false)

    const [opinions, setOpinions] = useState([]);

    function handleDriversModal() {
        setShowDriversModal(!showDriversModal)
    }

    function handleCarsModal() {
        setShowCarsModal(!showCarsModal)
    }

    function setSomeValues(key: string, value: any) {
        form.setFieldsValue({ [key]: value });
    }

    useEffect(() => {
        initialRequest()
    }, [])

    const initialRequest = async () => {
        const usersRequest = await getData('users')
        console.log('ur', usersRequest)
        if (Array.isArray(usersRequest)) {
            const usersToSelect = usersRequest.map((user: any) => {
                return {
                    ...user,
                    label: user.name + " " + user.lastname,
                    value: user.id
                }
            })
            setUsers(usersToSelect)

            const filterDrivers = usersRequest.filter((u: any) => u.roles.find((role: any) => role.id === 3))
            console.log('dt', filterDrivers)
            const driversToModal = filterDrivers.map((driver: any) => {
                return {
                    ...driver,
                    fullName: driver.name + " " + driver.lastname,
                    status: 'Disponible',
                    ciExpiry: '15/02/2024'
                }
            })
            setDrivers(driversToModal)
        }

        const typesRequest = await getData('movilizationTypes')
        console.log('ur', typesRequest)
        if (Array.isArray(typesRequest)) {
            const typesToSelect = typesRequest.map((mt: any) => {
                return {
                    ...mt,
                    label: mt.name,
                    value: mt.id
                }
            })
            // setMovilizationTypes(typesToSelect)
        }

        const toRequest = await getData('movilizationTo')
        console.log('ur', toRequest)
        if (Array.isArray(toRequest)) {
            const toSelect = toRequest.map((mto: any) => {
                return {
                    ...mto,
                    label: mto.name,
                    value: mto.id
                }
            })
            // setMovilizationTos(toSelect)
        }

        const validitiesRequest = await getData('movilizationValidities')
        console.log('ur', validitiesRequest)
        if (Array.isArray(validitiesRequest)) {
            const validitiesToSelect = validitiesRequest.map((vd: any) => {
                return {
                    ...vd,
                    label: vd.name,
                    value: vd.id
                }
            })
            // setMovilizationValidities(validitiesToSelect)
        }

        const vehiclesRequest = await getData('vehicles')
        console.log('ur', vehiclesRequest)
        if (Array.isArray(vehiclesRequest)) {
            setVehicles(vehiclesRequest)
        }
    }


    const handleSubmit = async (values: any) => {
        setSubmitting(true)
        console.log('values', values)
        const { initiatorId, currentActivity, currentResponsible, movilizationType, to, validity, driver, plate, emitPlace, emitDate, emitHour, expiryPlace, expiryDate, expiryHour, comments } = values;

        const driverId = drivers.filter((dr: any) => dr.fullName === driver)

        const vehicleId = vehicles.filter((ve: any) => ve.plate === plate)

        const cleanValues = {
            initiatorId: { id: initiatorId },
            currentActivity,
            currentResponsible: { id: currentResponsible },
            movilizationType: { id: movilizationType },
            to: { id: to },
            validity: { id: validity },
            driver: { id: driverId.length > 0 ? driverId[0].id : 1 },
            vehicle: { id: vehicleId.length > 0 ? vehicleId[0].id : 1 },
            emitPlace,
            emitDate: transformDate(emitDate),
            emitHour: transformTime(emitHour),
            expiryPlace,
            expiryDate: transformDate(expiryDate),
            expiryHour: transformTime(expiryHour),
            comments
        }

        console.log('clean values', cleanValues)

        const request = await postData('movilizationRequests', cleanValues)
        if ('initiatorId' in request) {
            message.success("Solicitud creada exitosamente")
            setSubmitting(false)
            handleModal()
            handleRefresh()
            return
        }

        message.error("Ha ocurrido un error :(")
        setSubmitting(false)

    }
    const handleAddOpinion = () => {
        const name = form.getFieldValue('name');
        const opinion = form.getFieldValue('opinion');
        const tendencia = form.getFieldValue('tendencia');
    
        if (name && opinion && tendencia) {
            const newOpinion = { name, opinion, tendencia };
            setOpinions([...opinions, newOpinion]);
            form.resetFields(['name', 'opinion', 'tendencia']);
        }
      };

    const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Opinión',
        dataIndex: 'opinion',
        key: 'opinion',
    },
    {
        title: 'Tendencia',
        dataIndex: 'tendencia',
        key: 'tendencia',
    },
    ];
    

    return (
        <Form form={form} onFinish={handleSubmit} >
            <Form.Item label="Fecha del registro" name="dateRegister">
                <DatePicker />
            </Form.Item>

            <Form.Item label="Nombre Usuario" name="nameResponsable">
                <Select options={users} />
            </Form.Item>

            <Form.Item label="Fecha de la noticia" name="emitNoticia">
                <DatePicker />
            </Form.Item>

            <Form.Item label="Seccion" name="seccion">
                <InputNumber />
            </Form.Item>

            <Form.Item label="No. Pagina" name="numPagina">
                <InputNumber />
            </Form.Item>

            <Form.Item label="Sector referente de la noticia" name="sectorNoticia">
                <Radio.Group>
                    <Radio>Hidrocarburos</Radio>
                    <Radio>Minas</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item label="Subsector" name="subsector" >
                <Select options={subsectores} />
            </Form.Item>

            <Form.Item label="Tipo de informacion" name="tipoInformacion" >
                <Select options={tipoInformacion} />
            </Form.Item>

            <Form.Item label="Medio comunicacion" name="medioComunicacion" >
                <Select options={medioComunicacion} />
            </Form.Item>

            <Form.Item label="Fuente / Articulista" name="fuente" >
                <Input></Input>
            </Form.Item>

            <Form.Item label="Tendencia de la noticia" name="tendencia">
                <Radio.Group>
                    <Radio>Positiva</Radio>
                    <Radio>Negativa</Radio>
                    <Radio>Neutra</Radio>
                </Radio.Group>
            </Form.Item>
            
            <Form.Item label="Resumen" name="resumen">
                <Input.TextArea rows={6} />
            </Form.Item>

            <Form.Item label="Imagen de la noticia" name="imagen">
                <Upload >
                    <Button icon={<UploadOutlined />}>Subir imagen</Button>
                </Upload>
            </Form.Item>

            <Form.Item label="Generadores de opinion" name="imagen">
            <Form.Item label="Nombre" name="name" rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Opinión" name="opinion" rules={[{ required: true, message: 'Por favor ingrese su opinión' }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item label="Tendencia" name="tendencia" rules={[{ required: true, message: 'Por favor ingrese la tendencia' }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handleAddOpinion}>
                Añadir opinión
                </Button>
            </Form.Item>
        </Form.Item>

        <Table
        dataSource={opinions}
        columns={columns}
        pagination={false}
        bordered
        rowKey={(record:any) => record.name}
        />

            <Form.Item label="Comentarios" name="comentario" style={{marginTop:"30px"}}>
                <Input.TextArea rows={6} />
            </Form.Item>



            <Row justify="end">
                <Button htmlType="submit" type="primary" loading={submitting}>Guardar</Button>
            </Row>
        </Form>
    )
}

export default RegisterNoticiasForm;