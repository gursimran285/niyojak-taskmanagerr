import { Outlet } from "react-router-dom";
import EmployeeHeader from "./EmployeeHeader";
import EmployeeFooter from "./EmployeeFooter";

export default function EmployeeMaster() {
    return (
        <>
            <EmployeeHeader />
            <Outlet>
            </Outlet>
            <EmployeeFooter />
        </>
    )
}