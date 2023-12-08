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


function AbasSelector({ setSomeValues, handleAbasModal, stations }: any) {

    const [searchResults, setSearchResults] = useState<any>(stations)

    const [selectedAbas, setselectedAbas] = useState<any>(null)



    function handleFinish(values: any) {
        const { searchParam, searchType } = values;

        const filteredAbas = stations.filter((estacion: any) => {
            if (searchType === 1) {
                return estacion.name.includes(searchParam);
            } else if (searchType === 2) {
                return estacion.city.includes(searchParam);
            }
            return true; 
        });
    
        setSearchResults(filteredAbas);
    }
    


    function handleSelectAbas(abas: any) {
        setselectedAbas(abas)
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
                                <List.Item onClick={() => handleSelectAbas(item)} >
                                    <List.Item.Meta
                                        title={<label >{item.name}</label>}
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
                            <Typography.Paragraph>Estacion: {selectedAbas.name}</Typography.Paragraph>
                            <Typography.Paragraph>Ciudad: {selectedAbas.city}</Typography.Paragraph>
                            <Typography.Paragraph>Tipo de gasolina: {selectedAbas.fuelType || ""}</Typography.Paragraph>
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