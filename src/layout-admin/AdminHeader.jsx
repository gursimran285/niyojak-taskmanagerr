import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            {/* Navbar Start */}
            <div className="container-fluid" style={{ backgroundColor: "#0e121a", fontFamily: "'Poppins', sans-serif" }}>
                <div className="container">
                    <nav className="navbar navbar-dark navbar-expand-lg py-2">
                        <Link to="/" className="navbar-brand">
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
                                <Link to="/admin" className="nav-item nav-link text-light fw-bold">Dashboard</Link>

                                {/* Employee Dropdown */}
                                <div className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle text-light fw-bold" data-bs-toggle="dropdown">
                                        Employee
                                    </Link>
                                    <div className="dropdown-menu rounded" style={{ backgroundColor: "#457B9D" }}>
                                        <Link to="/admin/addemployee" className="dropdown-item text-dark fw-bold">Add Employee</Link>
                                        {/* <Link to="/admin/updateemployee" className="dropdown-item text-dark fw-bold">Update Employee</Link> */}
                                        <Link to="/admin/manageemployee" className="dropdown-item text-dark fw-bold">Manage Employee</Link>
                                    </div>
                                </div>


                                {/* Project Dropdown */}
                                <div className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle text-light fw-bold" data-bs-toggle="dropdown">
                                        Project
                                    </Link>
                                    <div className="dropdown-menu rounded" style={{ backgroundColor: "#457B9D" }}>
                                        <Link to="/admin/addproject" className="dropdown-item text-dark fw-bold">Add Project</Link>
                                        {/* <Link to="/admin/updateproject" className="dropdown-item text-dark fw-bold">Update Project</Link> */}
                                        <Link to="/admin/manageproject" className="dropdown-item text-dark fw-bold">Manage Project</Link>
                                    </div>
                                </div>
                                {/* Tasks Dropdown */}
                                <div className="nav-item dropdown">
                                    <Link to="#" className="nav-link dropdown-toggle text-light fw-bold" data-bs-toggle="dropdown">
                                        Tasks
                                    </Link>
                                    <div className="dropdown-menu rounded" style={{ backgroundColor: "#457B9D" }}>
                                        <Link to="/admin/assigntask" className="dropdown-item text-dark fw-bold">Assign Task</Link>
                                        <Link to="/admin/managetask" className="dropdown-item text-dark fw-bold">Manage Task</Link>
                                        {/* <Link to="/admin/updatetask" className="dropdown-item text-dark fw-bold">Update Task</Link> */}
                                    </div>
                                </div>
                                <Link to="/admin/managerequest " className="nav-item nav-link text-light fw-bold">Requests</Link>

                                <Link to="/login " className="nav-item nav-link text-light fw-bold">Logout</Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/* Navbar End */}
        </>
    );
}