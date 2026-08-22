import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import PageHeader from "./PageHeader";
import { addDoc, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore"
import axios from "axios"
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";

export default function AddProject() {

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Technology, setTechnology] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [Clientname, setClientname] = useState("");
  const [Image, setImage] = useState(null);

  const [Load, setLoad] = useState([]);
  const [loading, setloading] = useState(false);

  var nav = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    console.log("form");

    // api hit for upload file on cloudnairy
    setLoad(true)
    let data = new FormData()
    data.append("file", Image)
    data.append("upload_preset", "Images")
    axios.post("https://api.cloudinary.com/v1_1/dso5v1ubr/image/upload", data)
      .then((res) => {
        savedata(res.data.secure_url);
      })
      .catch((err) => {
        toast.error(err.message)
      })


  }

  const savedata = async (URL) => {
    console.log(URL);

    // save data into firebase -firestore
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

    // query for insertion ->firestore
    await addDoc(collection(db, "project"), data)
      .then(() => {
        // setName("")
        // setDescription("")
        // settype("")
        // setprice("")
        toast.success("Data inserted successfully!!")
        setTimeout(() => {
          nav("/admin/manageproject")
        }, 2500);
      })
      .catch((err) => {
        toast.error(err.message)
      })


  }

  return (
    <>
      <PageHeader child={"Add Project"} />
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
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                  rows="3"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Attachment</label>
                <input
                  type="file"
                  className="form-control"
                  name="attachment"
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
                  
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}