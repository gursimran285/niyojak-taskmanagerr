import PageHeaderEmployee from "./PageHeaderEmployee";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export default function ViewRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "requests"),
      where("userId", "==", sessionStorage.getItem("userId"))
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setRequests(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <>
      <div style={{ marginBottom: "-30px" }}>
        <PageHeaderEmployee child={"My Requests"} />
      </div>

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
              My Requests
            </h3>

            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped align-middle">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Sr No.</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {requests.length > 0 ? (
                    requests.map((req, index) => (
                      <tr key={req.id}>
                        <td>{index + 1}</td>
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
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-muted">
                        No requests found
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
