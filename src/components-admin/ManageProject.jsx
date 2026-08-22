import { useEffect, useState } from "react";
import { db } from "../Firebase";
import PageHeader from "./PageHeader";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";




export default function ManageProjects() {

  const [projectdata, setprojectdata] = useState([])
  useEffect(() => {

    const fatchData = () => {
      onSnapshot(collection(db, "project"), (projectdata) => {
        // console.log("data",projectData.docs[0].data());
        setprojectdata(
          projectdata.docs.map((el) => {
            // return(el.data)
            return { id: el.id, ...el.data() }


          })
        )

      })
    }

    fatchData()

  }, [])


  const deleteProject = async (id) => {
    // console.log(id);
    await deleteDoc(doc(db, "project", id)).then(() => {
      toast.success("item delete")
    }).catch(() => {
      toast.error("Error")
    })

  }
  return (
    <>
      <PageHeader child={"Manage Project"} />
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
              Manage Projects
            </h3>
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Sr No.</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Technology</th>
                    <th>Client Name</th>
                    <th>Deadline</th>
                    <th>Attachment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {projectdata.length > 0 ? (
                    projectdata.map((el, index) => (
                      <tr key={el.id}>
                        <td>{index + 1}</td>
                        <td>{el.Title}</td>
                        <td>{el.Description}</td>
                        <td>{el.Technology}</td>
                        <td>{el.Clientname}</td>
                        <td>{el.Deadline}</td>
                        <td>
                          <img className="img-fluid" width={50} src={el.Image} alt="attachment" />
                        </td>
                        <td>
                          <Link
                            to={`/admin/updateproject/${el.id}`}
                            className="btn btn-sm btn-warning me-2"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteProject(el.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-muted p-3">
                        No projects found
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