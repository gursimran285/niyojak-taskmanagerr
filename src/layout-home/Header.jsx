import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>

                {/* Navbar Start */}
                <div className="container-fluid" style={{
                    backgroundColor: "#0e121a",
                    borderBottom: "5px solid #F1A208",
                }}>
                    <div className="container">
                        <nav className="navbar navbar-dark navbar-expand-lg py-2">

                            <h1 className="fw-bold d-block" style={{ color: "#F1FAEE" }}>
                                NIYO<span style={{ color: "#F1A208" }}>JAK</span>
                            </h1>

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
                                </div>
                            </div>

                            {/* Contact & Login Section */}
                            <div className="d-none d-xl-flex flex-shrink-0">
                                <div id="phone-tada" className="d-flex align-items-center justify-content-center me-4">
                                    <Link to="#" className="position-relative animated tada infinite">
                                        <i className="fa fa-phone-alt text-white fa-2x" />
                                        <div className="position-absolute" style={{ top: "-7px", left: 20 }}>
                                            <i className="fa fa-comment-dots text-light" />
                                        </div>
                                    </Link>
                                </div>
                                <div className="d-flex flex-column pe-4 border-end">
                                    <span className="text-white-50">Have any questions?</span>
                                    <span style={{ color: "#F1A208" }}>Call: +0123 456 7890</span>
                                </div>
                                <div className="d-flex align-items-center  justify-content-center ms-4">
                                    {/* <Link to="/home" className="btn text-dark mt-1 rounded-pill " style={{ background: "#F1A208" }}>
                                        Login
                                    </Link> */}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>


                {/* Navbar End */}
          

        </>

    )
}