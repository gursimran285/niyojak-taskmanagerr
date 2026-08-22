import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import PageHeader from "./PageHeader";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

export default function UpdateTask() {
  const [taskData, setTaskData] = useState({
    employee: "",
    project: "",
    title: "",
    deadline: "",
    status: "",
  });

  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const snap = await getDoc(doc(db, "tasks", id));
      if (snap.exists()) {
        setTaskData({
          employee: snap.data().employee || "",
          project: snap.data().project || "",
          title: snap.data().title || "",
          deadline: snap.data().deadline || "",
          status: snap.data().status || "",
        });
      } else {
        toast.error("Task not found");
      }
    };

    const fetchEmployees = async () => {
      const snapshot = await getDocs(collection(db, "employee"));
      setEmployees(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, "project"));
      setProjects(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    fetchTask();
    fetchEmployees();
    fetchProjects();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateDoc(doc(db, "tasks", id), taskData);
      toast.success("Task updated successfully");
      setTimeout(() => {
        nav("/admin/managetask");
      }, 2000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader child={"Update Task"} />
      <ToastContainer />

      <div
        className="container-fluid py-5"
        style={{
          background: "linear-gradient(to bottom, #2C6D90, #001F54)",
          minHeight: "100vh",
        }}
      >
        {loading && <BeatLoader size={20} cssOverride={{ marginLeft: "48%" }} />}
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
                      {emp.name}
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

              <div className="mb-4">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="assigned">Assigned</option>
                  <option value="pending">Pending</option>
                  <option value="incomplete">Incomplete</option>
                  <option value="completed">Completed</option>
                </select>
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
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
