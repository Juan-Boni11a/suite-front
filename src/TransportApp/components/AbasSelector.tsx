import { Button, Col, Form, Input, List, Row, Select, Typography } from 'antd'
import { useState } from 'react'


const searchTypes = [
    { label: 'Nombre', value: 1 },
    { label: 'Ciudad', value: 2 },

]

const estaciones = [
    { 
        nameAbas: 'Primax',
        ciudad: 'Quito',
        tipoCombus: 'Gasolina'
    },
    { 
        nameAbas: 'PetroEcuador',
        ciudad: 'Quito',
        tipoCombus: 'Diésel'
    },
    { 
        nameAbas: 'GasExpress',
        ciudad: 'Guayaquil',
        tipoCombus: 'Gasolina'
    },
    { 
        nameAbas: 'PetroAndes',
        ciudad: 'Cuenca',
        tipoCombus: 'Diésel'
    },
    { 
        nameAbas: 'EcoFuel',
        ciudad: 'Ambato',
        tipoCombus: 'Gas Licuado de Petróleo (GLP)'
    }
];


function AbasSelector({ setSomeValues, handleAbasModal }: any) {

    const [searchResults, setSearchResults] = useState<any>([])

    const [selectedAbas, setselectedAbas] = useState<any>(null)



    function handleFinish(values: any) {
        const { searchParam, searchType } = values;
    
        // Filtra las estaciones basándose en la opción de búsqueda seleccionada
        const filteredAbas = estaciones.filter((estacion: any) => {
            if (searchType === 1) {
                // Búsqueda por nombre
                return estacion.nameAbas.includes(searchParam);
            } else if (searchType === 2) {
                // Búsqueda por ciudad
                return estacion.ciudad.includes(searchParam);
            }
            return true; // Si no hay opción válida, devuelve todas las estaciones
        });
    
        setSearchResults(filteredAbas);
    }
    


    function handleSelectDriver(driver: any) {
        setselectedAbas(driver)
    }

    function confirmSelect() {
        setSomeValues('nameAbas', selectedAbas.nameAbas)
        handleAbasModal()
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
                                <List.Item onClick={() => handleSelectDriver(item)} >
                                    <List.Item.Meta
                                        title={<label >{item.nameAbas}</label>}
                                    />
                                </List.Item>
                            )}
                        />
                    )
                    }
                </Col>
                <Col span={9} offset={1}>
                    {selectedAbas && (
                        <div>
                            <Typography> Detalles de la estacion de servicio</Typography>
                            <Typography.Paragraph>Estacion: {selectedAbas.nameAbas}</Typography.Paragraph>
                            <Typography.Paragraph>Ciudad: {selectedAbas.ciudad}</Typography.Paragraph>
                            <Typography.Paragraph>Tipo de gasolina: {selectedAbas.tipoCombus}</Typography.Paragraph>
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

export default AbasSelector