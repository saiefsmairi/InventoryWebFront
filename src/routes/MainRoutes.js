import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import Myprofil from 'pages/dashboard/Myprofil';
import UsersAdmin from 'pages/dashboard/UsersAdmin';
import ProductsListe from 'pages/dashboard/CompanyDashboard/ProductsListe';
import CompanyUsers from 'pages/dashboard/CompanyDashboard/CompanyEmployees';
import Area from 'pages/dashboard/CompanyDashboard/Area';
import Zone from 'pages/dashboard/CompanyDashboard/Zone';
import AffectUsersZone from 'pages/dashboard/CompanyDashboard/AffectUsersZone';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },

        {
            path: 'affectuserszone',
            element: <AffectUsersZone />
        },
        {
            path: 'myprofil',
            element: <Myprofil />
        }
        ,
        {
            path: 'users',
            element: <UsersAdmin />
        },
        {
            path: 'companyemployees',
            element: <CompanyUsers />
        },
        {
            path: 'products',
            element: <ProductsListe />
        },
        {
            path: 'area',
            element: <Area />
        },
        {
            path: 'zone',
            element: <Zone />
        }
    ]
};

export default MainRoutes;
