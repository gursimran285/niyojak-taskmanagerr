import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import PageHeader from "./PageHeader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase"; // Import your Firebase db

export default function UpdateEmployee() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    department: "",
    contact: "",
  });
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      const docRef = doc(db, "employee", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Support legacy fields (Firstname/Lastname/Email) and current fields (name/email)
        const nameFromData = data.Firstname && data.Lastname ? `${data.Firstname} ${data.Lastname}` : data.name || "";
        const splitName = nameFromData ? nameFromData.split(" ") : [];
        setFormData({
          firstName: data.Firstname || splitName[0] || "",
          lastName: data.Lastname || splitName.slice(1).join(" ") || "",
          email: data.Email || data.email || "",
          location: data.Location || "",
          department: data.Department || "",
          contact: data.Contact || "",
        });
      } else {
        toast.error("Employee not found");
      }
    };
    fetchEmployee();
  }, [id]);

  function handleFormSubmit(e) {
    e.preventDefault();
    setLoad(true);
    const updateData = async () => {
      try {
        const employeeRef = doc(db, "employee", id);
        await updateDoc(employeeRef, {
          // preserve legacy fields and also update canonical fields used elsewhere
          Firstname: formData.firstName,
          Lastname: formData.lastName,
          Email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          Location: formData.location,
          Department: formData.department,
          Contact: formData.contact,
        });
        toast.success("Employee details updated successfully!");
        setTimeout(() => {
          nav("/admin/manageemployee");
        }, 4000);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoad(false);
      }
    };
    updateData();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <PageHeader child={"Update Employee"} />
      <ToastContainer />
      <div
        className="container-fluid py-5"
        style={{
          background: "linear-gradient(to bottom, #2C6D90, #001F54)",
          minHeight: "100vh",
          paddingBottom: "80px",
        }}
      >
        {load && (
          <BeatLoader size={20} cssOverride={{ marginLeft: "48%" }} />
        )}
        <div className="container">
          <div
            className="bg-light rounded-4 shadow-lg p-5"
            style={{ maxWidth: "900px", margin: "0 auto" }}
          >
            <h3
              className="text-center fw-bold mb-4"
              style={{ color: "#2C6D90" }}
            >
              Update Employee Details
            </h3>
            <form onSubmit={handleFormSubmit}>
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-control"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Contact</label>
                <input
                  type="tel"
                  className="form-control"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  title="Enter a valid 10-digit phone number"
                />
              </div>
              <div className="d-grid mt-4">
                <button
                  type="submit"
                  className="btn btn-lg"
                  style={{
                    backgroundColor: "#E63946",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "30px",
                  }}
                >
                  Update Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}