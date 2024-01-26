import Home from "../pages/Home/Home";
import AeDrop from "../pages/AeDrop/AeDrop";
import Card from "../pages/ProductDetails/ProductDetails";
import Privacy from "../pages/Privacy/Privacy";

/* only user routes */
export const protectedRoutes = [

]

export const publicRoutes = [
    {
        path: '/',
        component: <Home />,
    },
    {
        path: '/ae',
        component: <AeDrop />,
    },
    {
        path: '/ae/item/:id',
        component: <Card />,
    },
    {
        path: '/catalog',
        component: <div>Каталог</div>,
    },
    {
        path: '/album',
        component: <div>Альбом</div>,
    },
    {
        path: '/contacts',
        component: <div>Контакты</div>,
    },
    {
        path: '/Privacy',
        component: <Privacy />,
    },
    {
        path: '/care',
        component: <div>Уход за изделиями</div>,
    },
];

/* for those who are not authenticated  */
export const unauthenticatedRoutes = [

];
