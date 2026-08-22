import PageHeaderEmployee from "./PageHeaderEmployee";
import { useEffect, useState } from "react";
import { db } from "../Firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function ViewTasks() {
  const [taskData, setTaskData] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const unsubTasks = onSnapshot(
      query(
        collection(db, "tasks"),
        where("employee", "==", sessionStorage.getItem("userId"))
      ),
      (snapshot) => {
        const list = snapshot.docs.map((doc, index) => ({
          id: doc.id,
          srNo: index + 1,
          ...doc.data(),
        }));
        setTaskData(list);
      }
    );

    return () => unsubTasks();
  }, []);

  useEffect(() => {
    const unsubEmployees = onSnapshot(collection(db, "employee"), (snapshot) => {
      setEmployees(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsubEmployees();
  }, []);

  const getEmployeeName = (employeeId) => {
    const emp = employees.find((e) => e.id === employeeId);
    return emp ? emp.name : "Admin";
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, "tasks", id), { status: newStatus });
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <div style={{ marginBottom: "-30px" }}>
        <PageHeaderEmployee child={"My Tasks"} />
      </div>

      <div
        className="container-fluid py-5 px-4"
        style={{ background: "#f2f3f4", minHeight: "100vh" }}
      >
        <div
          className="rounded-4 shadow-lg p-5 mb-5 w-100"
          style={{
            background: "linear-gradient(to bottom, #2C6D90, #001F54)",
          }}
        >
          <h3 className="fw-bold mb-4 text-center text-white">
            Assigned Tasks
          </h3>

          <div className="table-responsive">
            <table className="table table-bordered table-hover text-white">
              <thead style={{ backgroundColor: "#000000", color: "#F1A208" }}>
                <tr>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Assigned By</th>
                  <th>Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "#1C1C1C" }}>
                {taskData.length > 0 ? (
                  taskData.map((task) => (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{task.project}</td>
                      <td>{getEmployeeName(task.employee)}</td>
                      <td>{task.deadline}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={task.status}
                          onChange={(e) =>
                            updateStatus(task.id, e.target.value)
                          }
                        >
                          <option value="assigned">Assigned</option>
                          <option value="pending">Pending</option>
                          <option value="incomplete">Incomplete</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-white">
                      No tasks assigned
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
