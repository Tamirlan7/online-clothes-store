import {RoutePaths} from "../router/RouteConstants";
import React from "react";
import {ReactComponent as Catalog} from '../assets/icons/carbon_catalog.svg'
import {ReactComponent as EmployeeIcon} from '../assets/icons/employee-icon.svg'

const adminMenu =  [
    {
        text: 'Каталог',
        link: RoutePaths.ADMIN_CATALOG,
        suffixIcon: <Catalog />,
    },
    {
        text: 'Сотрудники',
        link: RoutePaths.ADMIN_EMPLOYEES,
        suffixIcon: <EmployeeIcon />
    },
    {
        text: 'Логи',
        link: RoutePaths.ADMIN_LOGS,
        suffixIcon: <EmployeeIcon />
    },
]

export default adminMenu