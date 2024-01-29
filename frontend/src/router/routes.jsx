import Home from "../pages/Home/Home";
import AeDrop from "../pages/AeDrop/AeDrop";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Privacy from "../pages/Privacy/Privacy";
import {RoutePaths} from "./RouteConstants";
import {lazy} from "react";
const AdminPage = lazy(() => import("../pages/AdminPage/AdminPage"))

/* only user routes */
export const protectedRoutes = [
    {
        path: RoutePaths.ADMIN,
        component: <AdminPage />,
        enabledRoles: ['admin'],
        meta: {
            headerEnabled: false,
            footerEnabled: false,
        }
    }
]

// meta default data
// {
//     headerEnabled: true,
//     footerEnabled: true,
// }
//

export const publicRoutes = [
    {
        path: RoutePaths.HOME,
        component: <Home />,
        meta: {
            footerEnabled: false,
        }
    },
    {
        path: RoutePaths.ALTERNATIVE_EDGE,
        component: <AeDrop />,
    },
    {
        path: RoutePaths.PRODUCT_DETAILS,
        component: <ProductDetails />,
    },
    {
        path: RoutePaths.CATALOG,
        component: <div>Каталог</div>,
    },
    {
        path: RoutePaths.ALBUM,
        component: <div>Альбом</div>,
    },
    {
        path: RoutePaths.CONTACTS,
        component: <div>Контакты</div>,
    },
    {
        path: RoutePaths.PRIVACY,
        component: <Privacy />,
    },
    {
        path: RoutePaths.CARE,
        component: <div>Уход за изделиями</div>,
    },
];

/* for those who are not authenticated  */
export const unauthenticatedRoutes = [

];
