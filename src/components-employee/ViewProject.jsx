import PageHeaderEmployee from "./PageHeaderEmployee";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function ViewProjects() {
  const [projectdata, setProjectdata] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "project"), (snapshot) => {
      setProjectdata(
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
        <PageHeaderEmployee child={"Ongoing Projects"} />
      </div>

      <div
        className="container-fluid py-5"
        style={{
          background: "linear-gradient(to bottom, #2C6D90, #001F54)",
          minHeight: "100vh",
        }}
      >
        <div className="container">
          <h3
            className="text-center fw-bold mb-5"
            style={{ color: "#FFFFFF" }}
          >
            Ongoing Projects
          </h3>

          <div className="row g-4">
            {projectdata.length > 0 ? (
              projectdata.map((el) => (
                <div key={el.id} className="col-xl-4 col-lg-6 col-md-6">
                  <div className="card h-100 shadow-lg border-0 rounded-4">
                    {el.Image && (
                      <img
                        src={el.Image}
                        alt="project"
                        className="card-img-top rounded-top-4"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    )}

                    <div className="card-body">
                      <h5 className="card-title fw-bold">{el.Title}</h5>

                      <p className="card-text text-muted small mb-2">
                        {el.Description}
                      </p>

                      <div className="mb-2">
                        <span className="badge bg-primary me-2">
                          {el.Technology}
                        </span>
                      </div>

                      <p className="mb-1">
                        <strong>Client:</strong> {el.Clientname}
                      </p>

                      <p className="mb-0">
                        <strong>Deadline:</strong> {el.Deadline}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-white">
                No projects available
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
