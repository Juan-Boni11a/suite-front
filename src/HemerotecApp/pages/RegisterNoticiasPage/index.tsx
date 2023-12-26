/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Card, Dropdown, MenuProps, Modal, Space, Table } from 'antd'
import { useEffect, useState } from 'react'
import RegisterNoticiasForm from '../../components/Forms/RegisterNoticiasForm'





const RegisterNoticiasPage = () => {
   

    return (
        <div>
            <Card title="Registro de Noticias o Artículo">
                <RegisterNoticiasForm />
            </Card>
        </div>
    )
}

export default RegisterNoticiasPage
