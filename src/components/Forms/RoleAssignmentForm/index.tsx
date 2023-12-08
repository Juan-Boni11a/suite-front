import { Button, Col, Form, Row, Select, Typography } from "antd"
import { useEffect, useState } from "react"
import { getData } from "../../../services/common/getData"


const roles = [
    {
        label: 'SUPERADMIN', value: 1,
        permissions: [{
            label: 'ACCESO A TODO :D'
        }]
    }
]

function RoleAssignmentForm({selectedUser}: any) {
    const [form] = Form.useForm()


    const [selectedRoles, setSelectedRoles] = useState<any>([])

    const [roles, setRoles] = useState<any>([])

    const handleSelectRole = (value: any) => {
        console.log('value', value)

        setSelectedRoles([])

        let sr: any = []
        value.map((roleId: any) => {
            roles.map((role: any) => {
                if(role.value === roleId){
                    sr.push(role)
                }
            })
        })

        console.log('sr', sr)

        if (sr.length > 0) {
            setSelectedRoles(sr)
        }
    }


    const handleFinish = async (values: any) => {
        console.log('values', values)
    }


    const initialRequest = async () => {
        const request = await getData('roles')
        if(Array.isArray(request)){
            const rolesToSelect = request.map((role: any) => {
                return {
                    ...role, 
                    label: role.name, 
                    value: role.id,
                    permissions: role.permissions.map((p: any) => {
                        return {
                            ...p, 
                            label: p.name
                        }
                    })
                }
            })
            setRoles(rolesToSelect)
        }
    }

    useEffect(() => {
        initialRequest()
    }, [])


    return (
        <>
        <Typography.Text style={{ paddingBottom: 24 }}>Usuario Seleccionado: {selectedUser.name} {" "} {selectedUser.lastname} </Typography.Text>
        <Form onFinish={handleFinish} form={form}>
            <Row>
                <Col span={10}>
                    <Form.Item label="Roles" name="roles" extra="Seleccione los roles que desea asignar al usuario">
                        <Select mode="multiple" options={roles} onChange={handleSelectRole} />
                    </Form.Item>
                </Col>

                <Col span={12} offset={2}>
                    { selectedRoles.map((selectedRole: any, index: any) =>  
                        <div key={index} style={{ paddingBottom: 12 }} >
                            <Typography.Text>*{selectedRole.label}</Typography.Text>
                            {selectedRole.permissions.map((permisson: any, index: any) => (
                                <div style={{ display: 'block' }}>{(index+1)}.- {permisson.label}</div>
                            ))}
                        </div>
                    )}
                </Col>
            </Row>

            
            <Row justify="center">
                <Button type="primary">Guardar</Button>
            </Row>

        </Form>
        </>
    )

}

export default RoleAssignmentForm