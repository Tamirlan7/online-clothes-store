import HomePage from "../pages/HomePage/HomePage";
import AeCollectionPage from "../pages/AeCollectionPage/AeCollectionPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import PrivacyPage from "../pages/PrivacyPage/PrivacyPage";
import {RoutePaths} from "./RouteConstants";
import {lazy} from "react";
import {userRole} from "../data/userRole";
import OrderPage from "../pages/OrderPage/OrderPage";
const AdminPage = lazy(() => import("../admin/pages/AdminCatalogPage/AdminCatalogPage"))

/* only user routes */
export const protectedRoutes = [
    {
        path: RoutePaths.ADMIN,
        component: <AdminPage />,
        enabledRoles: [userRole.admin],
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
        component: <HomePage />,
        meta: {
            footerEnabled: false,
        }
    },
    {
        path: RoutePaths.ALTERNATIVE_EDGE,
        component: <AeCollectionPage />,
    },
    {
        path: RoutePaths.PRODUCT_DETAILS,
        component: <ProductDetailsPage />,
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
        component: <PrivacyPage />,
    },
    {
        path: RoutePaths.CARE,
        component: <div>Уход за изделиями</div>,
    },
    {
        path: RoutePaths.ORDER,
        component: <OrderPage />,
    },
];

/* for those who are not authenticated  */
export const unauthenticatedRoutes = [

];
