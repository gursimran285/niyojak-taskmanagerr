
export default function Footer() {
  return (
    <>
      <div
        className="container-fluid py-4"
        style={{
          background:"  #0e121a",
          color: "#fff",
          borderTop: "5px solid #F1A208",
        }}
      >
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-md-4 mb-4">
              <h4 className="fw-bold text-white">NIYO<span style={{ color: "#F1A208" }}>JAK</span></h4>
              <p className="text-light mt-3">
                Streamline your employee, project, and task management with ease.
              </p>
              <div className="d-flex justify-content-center justify-content-md-start">
                {["facebook-f", "twitter", "instagram", "linkedin-in"].map((icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="btn btn-outline-light btn-sm rounded-circle me-2"
                  >
                    <i className={`fab fa-${icon}`} />
                  </a>
                ))}
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <h5 className="text-warning">Quick Links</h5>
              <ul className="list-unstyled mt-3">
                {["Dashboard", "Add Employee", "Assign Task", "Manage Projects"].map((link, idx) => (
                  <li key={idx} className="mb-2">
                    <a href="#" className="text-light text-decoration-none">
                      <i className="fas fa-angle-right me-2 text-warning" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-4 mb-4">
              <h5 className="text-warning">Contact Us</h5>
              <ul className="list-unstyled mt-3">
                <li className="mb-2">
                  <i className="fas fa-map-marker-alt me-2 text-warning" />
                  Jalandhar, Punjab, India
                </li>
                <li className="mb-2">
                  <i className="fas fa-phone-alt me-2 text-warning" />
                  +91 98765 43210
                </li>
                <li className="mb-2">
                  <i className="fas fa-envelope me-2 text-warning" />
                  niyojak@hightech.com
                </li>
              </ul>
            </div>
          </div>

          <hr className="text-light" />
          <div className="row">
            <div className="col-md-6 text-center text-md-start">
              <span className="text-light">
                &copy; {new Date().getFullYear()} Niyojak. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <a
        href="#"
        className="btn btn-warning btn-square rounded-circle back-to-top"
        style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
      >
        <i className="fa fa-arrow-up text-white" />
      </a>
    </>
  );
}