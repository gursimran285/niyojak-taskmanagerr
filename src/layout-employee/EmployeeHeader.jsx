import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EmployeeHeader() {

    const nav=useNavigate()

    const logout=()=>{
        sessionStorage.clear()
        toast.success("Logout")

        setTimeout(() => {
            nav("/login")
        }, 800);
    }
    return (
        <>
  

            <>
                {/* Navbar Start */}
                <div className="container-fluid" style={{ backgroundColor: "#0e121a" }}>
                    <div className="container">
                        <nav className="navbar navbar-dark navbar-expand-lg py-2">
                            <Link to="/home" className="navbar-brand">
                                <h1 className="fw-bold d-block" style={{ color: "#F1FAEE" }}>
                                    NIYO<span style={{ color: "#F1A208" }}>JAK</span>
                                </h1>
                            </Link>
                            <button
                                type="button"
                                className="navbar-toggler me-0"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div className="collapse navbar-collapse bg-transparent" id="navbarCollapse">
                                <div className="navbar-nav ms-auto mx-xl-auto p-0">
                                    <Link to="/employee/view-profile" className="nav-item nav-link text-light">
                                        My Profile
                                    </Link>
                                    {/* Dropdowns */}
                                    

                                    <Link to="/employee/viewtask" className="nav-item nav-link text-light">Tasks</Link>
                                    <Link to="/employee/viewproject" className="nav-item nav-link text-light">Projects</Link>
                                    <Link to="/employee/addrequest" className="nav-item nav-link text-light">Add Request</Link>
                                    <Link to="/employee/viewreq" className="nav-item nav-link text-light">View Request</Link>
                                    {/* <Link to="/login" className="nav-item nav-link text-light">Logout</Link> */}
                                    <button onClick={logout} className="nav-item nav-link text-light">Logout</button>
                                </div>
                            </div>

                        </nav>
                    </div>
                </div>


                {/* Navbar End */}
            </>

        </>

    )
}