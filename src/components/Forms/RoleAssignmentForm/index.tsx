import { Button, Col, DatePicker, Form, Row, Select, Typography, message } from "antd"
import { useEffect, useLayoutEffect, useState } from "react"
import { getData } from "../../../services/common/getData"
import { postData } from "../../../services/common/postData"
import * as dayjs from 'dayjs'
import { putData } from "../../../services/common/putData"
import { transformDate } from "../../../utils/general"


const defaultRules = [{ required: true, message: 'Información requerida' }]


function RoleAssignmentForm({ selectedUser, handleModal, handleRefresh, roleForm }: any) {


    const [selectedRoles, setSelectedRoles] = useState<any>([])

    const [roles, setRoles] = useState<any>([])

    const handleSelectRole = (value: any) => {
        console.log('value', value)

        setSelectedRoles([])

        let sr: any = []
        value.map((roleId: any) => {
            roles.map((role: any) => {
                if (role.value === roleId) {
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

        const currentRoleIds = selectedUser.roles.map((role: any) => role.id)

        values.roles.forEach(async (roleId: any) => {
            if (!currentRoleIds.includes(roleId)) {
                const userId = selectedUser.id
                await postData(`api/users/${userId}/roles/${roleId}`, {})
            }
        });

        message.success("Roles asignados exitosamente")


        if(values.roles.filter((roleId: any) => roleId === 3).length > 0){
            const updateUser = await putData('api/users/' + selectedUser.id + '/driver', {
                licenseType: values.licenseType, 
                licenceExpiryDate: transformDate(values.licenceExpiryDate)
            })
        }

        handleModal()
        handleRefresh()
    }


    const initialRequest = async () => {
        const request = await getData('api/roles')
        if (Array.isArray(request)) {
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

    const disabledDate = (current: any) => {
        return current && dayjs(current).isBefore(dayjs(), 'day');
    };

    return (
        <>
            <Typography.Text style={{ paddingBottom: 24 }}>Usuario Seleccionado: {selectedUser.name} {" "} {selectedUser.lastname} </Typography.Text>
            <Form onFinish={handleFinish} form={roleForm}>
                <Row>
                    <Col span={10}>
                        <Form.Item label="Roles" name="roles" extra="Seleccione los roles que desea asignar al usuario">
                            <Select mode="multiple" options={roles} onChange={handleSelectRole} />
                        </Form.Item>
                    </Col>

                    <Col span={12} offset={2}>
                        {selectedRoles.map((selectedRole: any, index: any) =>
                            <div key={index} style={{ paddingBottom: 12 }} >
                                <Typography.Text>*{selectedRole.label}</Typography.Text>
                                {selectedRole.permissions.map((permisson: any, index: any) => (
                                    <div style={{ display: 'block' }}>{(index + 1)}.- {permisson.label}</div>
                                ))}
                            </div>
                        )}
                    </Col>
                </Row>

                {
                    selectedRoles.filter((sr: any) => sr.id === 3).length > 0 && (
                        <Row>

                            <Col span={10} offset={1}>

                                <Form.Item label="Tipo de licencia" name="licenseType" rules={defaultRules} >
                                    <Select options={[
                                        { label: 'A', value: 'A' },
                                        { label: 'B', value: 'B' },
                                        { label: 'F', value: 'F' },
                                        { label: 'A1', value: 'A1' },
                                        { label: 'C', value: 'C' },
                                        { label: 'C1', value: 'C1' },
                                        { label: 'D', value: 'D' },
                                        { label: 'D1', value: 'D1' },
                                        { label: 'E', value: 'E' },
                                        { label: 'E1', value: 'E1' },
                                        { label: 'G', value: 'G' }
                                    ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={10} offset={1}>
                                <Form.Item label="Fecha" name="licenceExpiryDate" rules={defaultRules}>
                                    <DatePicker disabledDate={disabledDate} />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}


                < Row justify="center" >
                    <Button type="primary" htmlType="submit">Guardar</Button>
                </Row>

            </Form >
        </>
    )

}

export default RoleAssignmentForm