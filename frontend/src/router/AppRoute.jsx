import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import LoginPopup from "../components/LoginPopup/LoginPopup";
import {notification as notificationApi} from "antd";
import {useEffect} from "react";
import {resetNotification} from "../slices/notificationSlice";
import useInitialize from "../hooks/useInitialize";

const AppRoute = ({metaData, children}) => {
    const dispatch = useDispatch()
    const {showAuthenticationPopup} = useSelector(state => state.user)
    const [api, contextHolder] = notificationApi.useNotification();
    const {notification} = useSelector(state => state.notification)

    useInitialize()

    useEffect(() => {
        if (notification.message && notification.description && notification.placement && notification.type) {
            showNotification({
                placement: notification.placement,
                message: notification.message,
                description: notification.description,
            }, notification.type)

            dispatch(resetNotification())
        }

        function showNotification(notificationArgs, type = 'info') {
            switch (type) {
                case 'info':
                    api.info(notificationArgs)
                    break
                case 'error':
                    api.error(notificationArgs)
                    break
                case 'success':
                    api.success(notificationArgs)
                    break
                case 'warning':
                    api.warning(notificationArgs)
                    break
                case 'open':
                    api.open(notificationArgs)
                    break
                case 'destroy':
                    api.destroy(notificationArgs)
                    break
                default:
                    api.info(notificationArgs)
            }
        }

    }, [api, dispatch, notification]);

    metaData = {
        headerEnabled: metaData?.headerEnabled ?? true,
        footerEnabled: metaData?.footerEnabled ?? true,
    }

    return (
        <>
            {showAuthenticationPopup && (
                <LoginPopup/>
            )}

            <div style={showAuthenticationPopup ? {
                filter: 'blur(6px)'
            } : {}}>
                {metaData.headerEnabled && (
                    <header>
                        <Navbar/>
                    </header>
                )}

                <main>
                    {children}
                </main>

                {metaData.footerEnabled && (
                    <footer>
                        <Footer/>
                    </footer>
                )}
            </div>

            {contextHolder}
        </>
    )
}

export default AppRoute
