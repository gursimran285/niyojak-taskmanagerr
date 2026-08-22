import { Outlet } from "react-router-dom";
import Footer from "../layout-home/Footer";
import Header from "../layout-home/Header";


export default function Master() {
    return (
        <>
            <Header />
            <Outlet>
            </Outlet>
            <Footer />
        </>
    )
}