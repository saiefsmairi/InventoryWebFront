// assets
import { DashboardOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { ProfileOutlined } from '@ant-design/icons';
import { BarcodeOutlined } from '@ant-design/icons';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { ReconciliationOutlined } from '@ant-design/icons';
import { UserSwitchOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    UsergroupAddOutlined,
    ProfileOutlined,
    BarcodeOutlined,
    AppstoreAddOutlined,
    ReconciliationOutlined,
    UserSwitchOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'ROLE_ADMIN',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'myprofil',
            title: 'My profil',
            type: 'item',
            url: '/myprofil',
            icon: icons.ProfileOutlined,
            breadcrumbs: true
        },
        {
            id: 'usersAdmin',
            title: 'Manage users (admin)',
            type: 'item',
            url: '/users',
            icon: icons.UsergroupAddOutlined,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
