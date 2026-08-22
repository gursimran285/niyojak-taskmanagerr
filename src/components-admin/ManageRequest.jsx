import { useEffect, useState } from "react";
import PageHeader from "./PageHeader";
import "bootstrap-icons/font/bootstrap-icons.css";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { toast } from "react-toastify";

export default function ManageRequest() {
  const [managerequest, setmanagerequest] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "requests"), (snapshot) => {
      setmanagerequest(
        snapshot.docs.map((el) => ({
          id: el.id,
          ...el.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  const updateRequest = async (id, status) => {
    try {
      await updateDoc(doc(db, "requests", id), { status });
      toast.success(`Request ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <PageHeader child={"Manage Request"} />

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
            <h3
              className="text-center fw-bold mb-4"
              style={{ color: "#2C6D90" }}
            >
              Manage Requests
            </h3>

            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped align-middle">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Sr No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {managerequest.length > 0 ? (
                    managerequest.map((req, index) => (
                      <tr key={req.id}>
                        <td>{index + 1}</td>
                        <td>{req.Name}</td>
                        <td>{req.Email}</td>
                        <td>{req.Subject}</td>
                        <td>{req.Message}</td>

                        <td>
                          <span
                            className={`badge ${
                              req.status === "solved"
                                ? "bg-success"
                                : req.status === "rejected"
                                ? "bg-danger"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {req.status || "pending"}
                          </span>
                        </td>

                        <td>
                          {req.status === "pending" ? (
                            <>
                              <button
                                className="btn btn-sm btn-success me-2"
                                onClick={() =>
                                  updateRequest(req.id, "solved")
                                }
                              >
                                <i className="bi bi-check-lg me-1"></i>Solved
                              </button>

                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  updateRequest(req.id, "rejected")
                                }
                              >
                                <i className="bi bi-x-lg me-1"></i>Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-muted">No Action</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-muted">
                        No requests available
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
