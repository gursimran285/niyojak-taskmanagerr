import { useEffect, useState } from "react";
import { db } from "../Firebase";
import PageHeader from "./PageHeader";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ManageTasks() {
  const [taskData, setTaskData] = useState([]);
  const [employees, setEmployees] = useState([]);

  // 🔹 Fetch Tasks
  useEffect(() => {
    const unsubTasks = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const list = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        srNo: index + 1,
        ...doc.data(),
      }));
      setTaskData(list);
    });

    return () => unsubTasks();
  }, []);

  // 🔹 Fetch Employees
  useEffect(() => {
    const unsubEmployees = onSnapshot(
      collection(db, "employee"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmployees(list);
      }
    );

    return () => unsubEmployees();
  }, []);

  // 🔹 Map employeeId → employeeName
  const getEmployeeName = (employeeId) => {
    const emp = employees.find((e) => e.id === employeeId);
    return emp ? emp.name : "Unknown";
  };

  // 🔹 Update Task Status
  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "tasks", id), { status: newStatus });
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // 🔹 Delete Task
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Error deleting task");
    }
  };

  return (
    <>
      <PageHeader child={"Manage Task"} />

      <div
        className="container-fluid py-5"
        style={{
          background: "linear-gradient(to bottom, #2C6D90, #001F54)",
          minHeight: "100vh",
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
              Manage Assigned Tasks
            </h3>

            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Sr No.</th>
                    <th>Employee Name</th>
                    <th>Task Title</th>
                    <th>Deadline</th>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody className="text-center">
                  {taskData.length > 0 ? (
                    taskData.map((task) => (
                      <tr key={task.id}>
                        <td>{task.srNo}</td>

                        {/* ✅ Employee Name instead of ID */}
                        <td>{getEmployeeName(task.employee)}</td>

                        <td>{task.title}</td>
                        <td>{task.deadline}</td>
                        <td>{task.project}</td>

                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={task.status}
                            onChange={(e) =>
                              updateStatus(task.id, e.target.value)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="incomplete">Incomplete</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>

                        <td>
                          <Link
                            to={`/admin/updatetask/${task.id}`}
                            className="btn btn-sm btn-warning me-2"
                          >
                            Update
                          </Link>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No tasks found.
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
