import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import PageHeader from "./PageHeader";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "../Firebase";
import { useNavigate } from "react-router-dom";


export default function AssignTask() {
  const [taskData, setTaskData] = useState({
    employee: "",
    project: "",
    title: "",
    deadline: "",
  });
  const [projects, setProjects] = useState([]);

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  //  Fetch employees from Firestore

  useEffect(() => {
    const fetchEmployees = async () => {
      const snapshot = await getDocs(collection(db, "employee"));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmployees(list);
    };

    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "project"));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(list);
    };

    fetchEmployees();
    fetchProjects();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...taskData,
      status: "assigned",
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "tasks"), payload);
      toast.success("Task assigned successfully!");
      setTimeout(() => {
        nav("/admin/managetask");
      }, 2500);
    } catch (err) {
      toast.error("Error assigning task: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader child={"Assign Task"} />
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
                <label className="form-label">Employee</label>
                <select
                  name="employee"
                  value={taskData.employee}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name }
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Project</label>
                <select
                  name="project"
                  value={taskData.project}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select Project</option>
                  {projects.map((proj) => (
                    <option key={proj.id} value={proj.Title}>
                      {proj.Title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Task Title</label>
                <input
                  type="text"
                  name="title"
                  value={taskData.title}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={taskData.deadline}
                  onChange={handleChange}
                  className="form-control"
                  required
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
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}