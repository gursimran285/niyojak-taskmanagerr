import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import PageHeaderEmployee from "./PageHeaderEmployee";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "../Firebase";

export default function AddRequest() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");

  const nav = useNavigate();

  const handleform = async (e) => {
    e.preventDefault();

    // try {
    //   const res = await axios.post(
    //     data
    //   );
    //   const url = res.data.secure_url;
    //   await savedata(url);

    // } catch (err) {
    //   console.log(err);
    //   toast.error(err.message);
    // }

    savedata()
  };

  const savedata = async () => {
    console.log("submit");
    let data = {
      Name,
      Email,
      Subject,
      Message,
      userId:sessionStorage.getItem("userId"),
      status: "pending",
      createdAt: Timestamp.now(),
    };

    console.log(data)

    try {
      await addDoc(collection(db, "requests"), data);

      toast.success("Your request has been submitted successfully!");
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setTimeout(() => {
        // nav("/employee/viewprofile");
      }, 2500);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <PageHeaderEmployee child={"Add Request"} />
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
            style={{ maxWidth: "700px", margin: "0 auto" }}
          >
            <h3 className="text-center fw-bold mb-4" style={{ color: "#2C6D90" }}>
              Submit a Request
            </h3>



            <form method="post" onSubmit={handleform}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  value={Subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="4"
                  value={Message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-4 py-2"
                  style={{ fontSize: "0.9rem" }}
                >
                  <i className="bi bi-send-fill me-2"></i>Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}