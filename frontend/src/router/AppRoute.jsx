import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";


const AppRoute = ({ metaData, children }) => {

    metaData = {
        headerEnabled: metaData?.headerEnabled ?? true,
        footerEnabled: metaData?.footerEnabled ?? true,
    }

    return (
        <>
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
        </>
    )
}

export default AppRoute
