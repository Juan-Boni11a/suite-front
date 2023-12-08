import { Tabs } from "antd";
import UsersPage from "./Users";

function GeneralManagement() {
    const items = [
        {
            key: '1',
            label: 'Usuarios',
            children: <UsersPage />,
        },
        {
            key: '2',
            label: 'Tab 2',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Tab 3',
            children: 'Content of Tab Pane 3',
        },
    ];
    return (
        <Tabs defaultActiveKey="1" items={items} />
    )
}

export default GeneralManagement