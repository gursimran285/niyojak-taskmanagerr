import { useEffect, useState } from "react";
import axios from "axios";
import PageHeader from "./PageHeader";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManageEmployee() {
  const [employees, setEmployees] = useState([]);

  const [employeedata, setemployeedata] = useState([])
  useEffect(() => {

    const fatchData = () => {
      onSnapshot(collection(db, "employee"), (employeedata) => {
        // console.log("data",employeeData.docs[0].data());
        setemployeedata(
          employeedata.docs.map((el) => {
            // return(el.data)
            return { id: el.id, ...el.data() }
          })
        )
      })
    }
    fatchData()

  }, [])

  const deleteEmployee = async (id) => {
    // console.log(id);
    await deleteDoc(doc(db, "employee", id)).then(() => {
      toast.success("item delete")
    }).catch(() => {
      toast.error("Error")
    })
  }




  useEffect(() => {
    // Fetch employee data from backend
    axios.get("/api/employees")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEmployees(res.data);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  return (
    <>
      <PageHeader child={"Manage Employee"} />
      <div
        className="container-fluid py-5"
        style={{
          background: "linear-gradient(to bottom, #2C6D90, #001F54)",
          minHeight: "100vh",
          paddingBottom: "80px",
        }}
      >
        <div className="container">
          <div
            className="bg-light rounded-4 shadow-lg p-5"
            style={{ maxWidth: "1100px", margin: "0 auto" }}
          >
            <h3 className="text-center fw-bold mb-4" style={{ color: "#2C6D90" }}>
              Manage Employees
            </h3>
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Sr No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Department</th>
                    <th>Job Title</th>
                    <th>Location</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Start Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {employeedata.length > 0 ? (
                    employeedata.map((emp, idx) => (
                      <tr key={emp.id || idx}>
                        <td>{idx + 1}</td>
                        <td>{emp.name}</td>
                        <td>{emp.email}</td>
                        <td>{emp.Contact}</td>
                        <td>{emp.Department}</td>
                        <td>{emp.JobTitle}</td>
                        <td>{emp.Location}</td>
                        <td>{emp.Gender}</td>
                        <td>{emp.Dob}</td>
                        <td>{emp.Startdate}</td>
                      
                        <td>
                          <Link to={"/admin/updateemployee/" + emp.id} className="btn btn-sm btn-warning me-2">Update</Link>
                          <button className="btn btn-sm btn-danger" onClick={() => deleteEmployee(emp.id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-muted">
                        No employee data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}