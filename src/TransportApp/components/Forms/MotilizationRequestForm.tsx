import { Button, DatePicker, Form, Input, Modal, Select, Typography } from "antd";
import DriversSelector from "../DriversSelector";
import { useEffect, useState } from "react";
import CarsSelector from "../CarsSelector";
import { getData } from "../../services/common/getData";
import { postData } from "../../../services/common/postData";



const activities = [
    { label: 'Ingreso de datos', key: 1, value: 'Ingreso de datos' }
]


/*const users = [
    { label: 'Admin', key: 1, value: 1 },
    { label: 'Juan Pérez', key: 1, value: 2 }

const movilizationTypes = [
    { label: 'Autoridad', key: 1, value: 1 },
    { label: 'De patio', key: 1, value: 2 }
]
]
const userTypes = [
    { label: 'Conductor', key: 1, value: 1 },
    { label: 'Funcionario', key: 1, value: 2 },
    { label: 'Funcionario y conductor', key: 1, value: 3 }
]

const vigenceTypes = [
    { label: 'Lunes a Viernes', key: 1, value: 1 },
    { label: 'Lunes a Domingo', key: 1, value: 2 }
]
*/
const places = [
    { label: 'Quito', key: 1, value: 'Quito' },
    { label: 'Guayaquil', key: 1, value: 'Guayaquil' },
    { label: 'Cuenca', key: 1, value: 'Cuenca' }
]


const actions = [
    { label: 'Cerrar', value: 1 },
    { label: 'Guardar y Cerrar', value: 2 },
    { label: 'Guardar y Actualizar', value: 3 },
    { label: 'Guardar y Procesar', value: 4 },
    { label: 'Imprimir', value: 5 },
]


function MovilizationRequestForm() {
    const [form] = Form.useForm()

    const [showDriversModal, setShowDriversModal] = useState(false)

    const [showCarsModal, setShowCarsModal] = useState(false)

    const [users, setUsers] = useState<any>([])

    const [movilizationTypes, setMovilizationTypes] = useState<any>([])

    const [movilizationTos, setMovilizationTos] = useState<any>([])

    const [movilizationValidities, setMovilizationValidities] = useState<any>([])

    const [drivers, setDrivers] = useState<any>([])


    const [vehicles, setVehicles] = useState<any>([])

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
            setMovilizationTypes(typesToSelect)
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
            setMovilizationTos(toSelect)
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
            setMovilizationValidities(validitiesToSelect)
        }

        const vehiclesRequest = await getData('vehicles')
        console.log('ur', vehiclesRequest)
        if (Array.isArray(vehiclesRequest)) {
            setVehicles(vehiclesRequest)
        }
    }


    function transformDate(dateString: any) {
        // Crear un objeto Date a partir de la cadena
        var dateObject = new Date(dateString);

        // Obtener los componentes de fecha y hora
        var year = dateObject.getUTCFullYear();
        var month = dateObject.getUTCMonth() + 1; // Meses en JavaScript se cuentan desde 0
        var day = dateObject.getUTCDate();

        // Formatear la cadena de fecha en el formato deseado (yyyy-MM-dd)
        var formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        return formattedDate

    }

    function transformTime(timeString: any) {
        // Crear un objeto Date a partir de la cadena
        var dateObject = new Date(timeString);

        // Obtener los componentes de fecha y hora
        var hours = dateObject.getUTCHours().toString().padStart(2, '0');
        var minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
        var seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');
        var milliseconds = dateObject.getUTCMilliseconds();

        // Formatear la cadena de tiempo en el formato deseado (hh:mm:ss.SSS)
        var formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds}`;

        return formattedTime;
    }

    const handleSubmit = async (values: any) => {
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
            emitDate: transformDate(emitDate) ,
            emitHour: transformTime(emitHour),
            expiryPlace,
            expiryDate: transformDate(expiryDate),
            expiryHour: transformTime(expiryHour),
            comments
        }

        console.log('clean values', cleanValues)

        const request = await postData('movilizationRequests', cleanValues)
        console.log('request', request)
    }

    return (
        <Form form={form} onFinish={handleSubmit} >
            <Form.Item label="Iniciador" name="initiatorId">
                <Select options={users} />
            </Form.Item>

            <Form.Item label="Actividad actual" name="currentActivity" >
                <Select options={activities} />
            </Form.Item>


            <Form.Item label="Responsable actual" name="currentResponsible">
                <Select options={users} />
            </Form.Item>

            <Form.Item label="Tipo de movilización" name="movilizationType" >
                <Select options={movilizationTypes} />
            </Form.Item>


            <Form.Item label="Para" name="to">
                <Select options={movilizationTos} />
            </Form.Item>


            <Form.Item label="Vigente de" name="validity">
                <Select options={movilizationValidities} />
            </Form.Item>

            <Form.Item label="Conductor" name="driver">
                <Input onClick={handleDriversModal} />
            </Form.Item>

            <Typography.Text>Vehículo</Typography.Text>
            <Form.Item label="No. Placa" name="plate">
                <Input onClick={handleCarsModal} />
            </Form.Item>
            <Form.Item label="Marca" name="brand">
                <Input disabled />
            </Form.Item>
            <Form.Item label="Modelo" name="model">
                <Input disabled />
            </Form.Item>
            <Form.Item label="Color" name="color">
                <Input disabled />
            </Form.Item>
            <Form.Item label="Motor" name="engine">
                <Input disabled />
            </Form.Item>
            <Form.Item label="No. Matrícula" name="enrollment">
                <Input disabled />
            </Form.Item>


            <Typography.Text>Datos de Emisión</Typography.Text>

            <Form.Item label="Lugar" name="emitPlace">
                <Select options={places} />
            </Form.Item>

            <Form.Item label="Fecha" name="emitDate">
                <DatePicker />
            </Form.Item>

            <Form.Item label="Hora" name="emitHour">
                <DatePicker picker="time" />
            </Form.Item>


            <Typography.Text>Datos de Caducidad</Typography.Text>

            <Form.Item label="Lugar" name="expiryPlace">
                <Select options={places} />
            </Form.Item>

            <Form.Item label="Fecha" name="expiryDate">
                <DatePicker />
            </Form.Item>

            <Form.Item label="Hora" name="expiryHour">
                <DatePicker picker="time" />
            </Form.Item>


            <Form.Item label="Comentarios" name="comments">
                <Input.TextArea rows={6} />
            </Form.Item>


            <Modal open={showDriversModal} footer={null} title="Máster de Conductores" onCancel={handleDriversModal}>
                <DriversSelector setSomeValues={setSomeValues} handleDriversModal={handleDriversModal} drivers={drivers} />
            </Modal>

            <Modal open={showCarsModal} footer={null} title="Vehículos" onCancel={handleCarsModal}>
                <CarsSelector setSomeValues={setSomeValues} handleCarsModal={handleCarsModal} vehicles={vehicles} />
            </Modal>

            <Button htmlType="submit" type="primary">Guardar</Button>
        </Form>
    )
}

export default MovilizationRequestForm;