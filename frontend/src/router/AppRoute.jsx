import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import {useSelector} from "react-redux";
import LoginPopup from "../components/LoginPopup/LoginPopup";
import {useLocation} from "react-router-dom";


const AppRoute = ({ metaData, children }) => {
    const { showAuthenticationPopup } = useSelector(state => state.user)

    metaData = {
        headerEnabled: metaData?.headerEnabled ?? true,
        footerEnabled: metaData?.footerEnabled ?? true,
    }

    return (
        <>
            {showAuthenticationPopup && (
                <LoginPopup />
            )}

            <div style={showAuthenticationPopup ? {
                filter: 'blur(6px)'
            } : {}}>
                {metaData.headerEnabled && (
                    <header>
                        <Navbar />
                    </header>
                )}

                <main>
                    {children}
                </main>

                {metaData.footerEnabled && (
                    <footer>
                        <Footer />
                    </footer>
                )}
            </div>
        </>
    )
}

export default AppRoute
