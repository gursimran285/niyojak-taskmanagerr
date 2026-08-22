import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import PageHeader from "./PageHeader";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import axios from "axios"
import { db } from "../Firebase";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateProject() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Technology, setTechnology] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [Clientname, setClientname] = useState("");
  const [Image, setImage] = useState(null);
  const [projectdata, setprojectdata] = useState("");
  const [loading, setloading] = useState(false);
  const nav = useNavigate();
  var { id } = useParams()
   const [Url, setUrl] = useState("");



  useEffect(() => {
    console.log(id);
    onSnapshot(doc(db, "project", id), (projectdata) => {
      // console.log(projectdata.data());
      const data = projectdata.data()
      setTitle(data.Title)
      setDescription(data.Description)
      setTechnology(data.Technology)
      setDeadline(data.Deadline)
      setClientname(data.Clientname)
      // setImage(data.image) not valid
      setUrl(data.Image)

    })

  }, [])
  function handleSubmit(e) {
    // refresh stop 
    e.preventDefault()
    // api for upload image on cloudnairy
    let data = new FormData()
    data.append("file", Image)
    data.append("upload_preset", "project")
    axios.post("https://api.cloudinary.com/v1_1/dso5v1ubr/image/upload", data)
      .then((res) => {
        // url create after uploading to cloudnairy
        savedata(res.data.secure_url);
      })
      .catch((err) => {
        toast.error("Image not uploaded")
        savedata(Url);
      })
  }
  const savedata = async (URL) => {
    // save in firestore
    let data = {
      Title: Title,
      Description: Description,
      Technology: Technology,
      Deadline: Deadline,
      Clientname: Clientname,
      Image: URL,
      status: true,
      createdAt: Timestamp.now()
    }
    await updateDoc(doc(db, "project", id), data)
      .then(() => {
        toast.success("Project Update successfully!!")
        setTimeout(() => {
          nav("/admin/manageproject");
        }, 4000);
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  useEffect(() => {
    if (!!Url) {
      // firestore data (url,name,description,status,createdat)
      savedata()
    }
  }, [])

  return (
    <>
      <PageHeader child={"Update Project"} />
      <ToastContainer />
      <div
        className="container-fluid py-5"
        style={{
          background: "linear-gradient(to bottom, #2C6D90, #001F54)",
          minHeight: "100vh",
          paddingBottom: "80px",
        }}
      >
        <BeatLoader size={20} cssOverride={{ marginLeft: "48%" }} loading={loading} />
        <div className="container">
          <div
            className="bg-light rounded-4 shadow-lg p-5"
            style={{ maxWidth: "900px", margin: "0 auto" }}
          >
            <h3 className="text-center fw-bold mb-4" style={{ color: "#2C6D90" }}>
              Update Project
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={Title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={Description}
                  o onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                  rows="3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="Image"
                  onChange={(e) => {
                    setImage(e.target.files[0])
                  }}
                />
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label">Technology</label>
                  <input
                    type="text"
                    className="form-control"
                    name="technology"
                    value={Technology}
                    onChange={(e) => {
                      setTechnology(e.target.value)
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    className="form-control"
                    name="deadline"
                    value={Deadline}
                    onChange={(e) => {
                      setDeadline(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Client Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="clientName"
                  value={Clientname}
                  onChange={(e) => {
                    setClientname(e.target.value)
                  }}
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
                  Update Project
                 
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}