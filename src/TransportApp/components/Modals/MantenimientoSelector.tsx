import { Button, Col, Form, Input, List, Row, Select, Typography } from 'antd'
import { useState } from 'react'


const searchTypes = [
    { label: 'Nombre', value: 1 },
    { label: 'Ciudad', value: 2 },

]

const mantenimiento = [
    { 
        nombreMantenimiento: 'Taller DISTRILLANTAS',
        ciudad: 'Quito',
        descripcion: 'Parche de llantas, cambio de aceite, arreglo de chasis.'
    },
    { 
        nombreMantenimiento: 'AutoService Rápido',
        ciudad: 'Guayaquil',
        descripcion: 'Revisión de frenos, cambio de aceite, alineación y balanceo.'
    },
    { 
        nombreMantenimiento: 'Mecánica Veloz',
        ciudad: 'Cuenca',
        descripcion: 'Reparación de motor, cambio de bujías, diagnóstico electrónico.'
    },
    { 
        nombreMantenimiento: 'Taller Autos Seguros',
        ciudad: 'Ambato',
        descripcion: 'Inspección de frenos, cambio de filtro de aire, alineación.'
    },
    { 
        nombreMantenimiento: 'ServiMotor Diesel',
        ciudad: 'Quito',
        descripcion: 'Reparación de sistemas diésel, cambio de filtros, diagnóstico de inyección.'
    }
]

function MantenimientoSelector({ setSomeValues, handleMantenimientoModal }: any) {

    const [searchResults, setSearchResults] = useState<any>([])

    const [selectedMantenimiento, setselectedMantenimiento] = useState<any>(null)



    function handleFinish(values: any) {
        const { searchParam, searchType } = values;
    
        const filteredMantenimiento = mantenimiento.filter((estacion: any) => {
            if (searchType === 1) {
                return estacion.nameAbas.includes(searchParam);
            } else if (searchType === 2) {
                return estacion.ciudad.includes(searchParam);
            }
            return true; 
        });
    
        setSearchResults(filteredMantenimiento);
    }
    


    function handleSelectMantenmiento(mantenimiento: any) {
        setselectedMantenimiento(mantenimiento)
    }

    function confirmSelect() {
        setSomeValues('nombreMantenimiento', selectedMantenimiento.nombreMantenimiento)
        handleMantenimientoModal()
    }


    return (
        <div>
            <Form onFinish={handleFinish}>
                <Form.Item name="searchType" label="Búsqueda por"  >
                    <Select options={searchTypes} />
                </Form.Item>
                <Row>
                    <Col span={17}>
                        <Form.Item name="searchParam" >
                            <Input placeholder="Buscar.." />
                        </Form.Item>
                    </Col>
                    <Col span={2} offset={1} >
                        <Button htmlType='submit' type='primary'>Consultar taller</Button>
                    </Col>
                </Row>
            </Form>

            <Row>
                <Col span={14} >
                    {searchResults && searchResults.length > 0 && (
                        <List
                            pagination={false}
                            dataSource={searchResults}
                            renderItem={(item: any, index) => (
                                <List.Item onClick={() => handleSelectMantenmiento(item)} >
                                    <List.Item.Meta
                                        title={<label >{item.nombreMantenimiento}</label>}
                                    />
                                </List.Item>
                            )}
                        />
                    )
                    }
                </Col>
                <Col span={9} offset={1}>
                    {selectedMantenimiento && (
                        <div>
                            <Typography> Detalles de la estacion de mantenimiento</Typography>
                            <Typography.Paragraph>Estacion: {selectedMantenimiento.nombreMantenimiento}</Typography.Paragraph>
                            <Typography.Paragraph>Ciudad: {selectedMantenimiento.ciudad}</Typography.Paragraph>
                            <Typography.Paragraph>Actividades que realiza: {selectedMantenimiento.descripcion}</Typography.Paragraph>
                        </div>
                    )}
                </Col>
            </Row>

            <Row justify="center" >
                <Button onClick={confirmSelect} type="primary">Confirmar</Button>
            </Row>
        </div>
    )
}

export default MantenimientoSelector