import { useEffect, useState } from "react";
import PageHeaderEmployee from "./PageHeaderEmployee";
import { db } from "../Firebase";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function ViewProfile() {
  const employeeId = sessionStorage.getItem("userId")

  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= EMPLOYEE DATA ================= */
  useEffect(() => {
    if (!employeeId) return;

    const ref = doc(db, "employee", employeeId);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setEmployee({ id: snap.id, ...snap.data() });
        setLoading(false);
      }
    });

    return () => unsub();
  }, [employeeId]);

  /* ================= TASKS ================= */
  useEffect(() => {
    if (!employeeId) return;

    const q = query(
      collection(db, "tasks"),
      where("employeeId", "==", employeeId)
    );

    const unsub = onSnapshot(q, (snap) => {
      setTasks(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, [employeeId]);

  /* ================= PROJECTS ================= */
  useEffect(() => {
    if (!employeeId) return;

    const q = query(
      collection(db, "project"),
      where("employeeId", "==", employeeId)
    );

    const unsub = onSnapshot(q, (snap) => {
      setProjects(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, [employeeId]);

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!employee) return null;

  return (
    <>
      <PageHeaderEmployee child={"My Profile"} />

      <div
        className="container-fluid py-5"
        style={{
          background: "linear-gradient(to bottom, #2C6D90, #001F54)",
          minHeight: "100vh",
        }}
      >
        <div className="container">
          <div className="bg-light rounded-4 shadow-lg p-5">

            {/* ================= HEADER ================= */}
            <div className="d-flex align-items-center mb-5">
              <img
                src={employee.Image}
                alt="profile"
                className="rounded-circle"
                style={{ width: 120, height: 120, objectFit: "cover" }}
              />

              <div className="ms-4">
                <h2 className="fw-bold">{employee.name}</h2>
                <p className="text-muted">
                  {employee.JobTitle} | {employee.Department}
                </p>
              </div>
            </div>

            {/* ================= PERSONAL INFO ================= */}
            <h5 className="fw-bold mb-3">Personal Information</h5>
            <div className="row mb-4">
              <div className="col-md-6"><b>Email:</b> {employee.email}</div>
              <div className="col-md-6"><b>Contact:</b> {employee.Contact}</div>
              <div className="col-md-6"><b>Gender:</b> {employee.Gender}</div>
              <div className="col-md-6"><b>Location:</b> {employee.Location}</div>
              <div className="col-md-6"><b>DOB:</b> {employee.Dob}</div>
              <div className="col-md-6"><b>Start Date:</b> {employee.Startdate}</div>
            </div>

            {/* ================= TASKS ================= */}
            {/* <h5 className="fw-bold mb-3">Assigned Tasks</h5>
            <div className="row mb-4">
              {tasks.length === 0 && <p className="text-muted">No tasks assigned</p>}
              {tasks.map((task) => (
                <div className="col-md-6 mb-3" key={task.id}>
                  <div className="border rounded p-3">
                    <b>{task.title}</b>
                    <p>Status: {task.status}</p>
                  </div>
                </div>
              ))}
            </div> */}

            {/* ================= PROJECTS ================= */}
            {/* <h5 className="fw-bold mb-3">Assigned Projects</h5>
            <div className="row">
              {projects.length === 0 && (
                <p className="text-muted">No projects assigned</p>
              )}
              {projects.map((proj) => (
                <div className="col-md-6 mb-3" key={proj.id}>
                  <div className="border rounded p-3">
                    <b>{proj.title}</b>
                    <p>Status: {proj.status}</p>
                  </div>
                </div>
              ))}
            </div> */}

          </div>
        </div>
      </div>
    </>
  );
}
