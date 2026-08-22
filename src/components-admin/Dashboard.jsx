import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PageHeader from "./PageHeader";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";

export default function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);

 useEffect(() => {
  // Employees Count
  const unsubEmployees = onSnapshot(collection(db, "employee"), (snapshot) => {
    setEmployeeCount(snapshot.size);
  });

  // Projects Count
  const unsubProjects = onSnapshot(collection(db, "project"), (snapshot) => {
    setProjectCount(snapshot.size);
  });

  // Tasks Count
  const unsubTasks = onSnapshot(collection(db, "tasks"), (snapshot) => {
    setTaskCount(snapshot.size);
  });

  return () => {
    unsubEmployees();
    unsubProjects();
    unsubTasks();
  };
}, []);


  const overviewCards = [
    { title: "Total Employees", count: employeeCount, icon: "bi-people", link: "/admin/manageemployee" },
    { title: "Active Projects", count: projectCount, icon: "bi-kanban", link: "/admin/manageproject" },
    { title: "Assigned Tasks", count: taskCount, icon: "bi-check2-circle", link: "/admin/assigntask" },
  ];

  return (
    <>
      <PageHeader child={"Admin Dashboard"} />
      <div
        className="container-fluid py-5"
        style={{
          background: "#cfcbca",
          minHeight: "100vh",
          paddingBottom: "80px",
        }}
      >
        <div className="container">
          {/* Overview Cards */}
          <div className="row mb-5">
            {overviewCards.map((card, idx) => (
              <div className="col-md-4 mb-4" key={idx}>
                <Link to={card.link} style={{ textDecoration: "none" }}>
                  <div
                    className="rounded-4 shadow-sm p-4 text-center"
                    style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #dee2e6",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  >
                    <div className="mb-3">
                      <i className={`bi ${card.icon} fs-1`} style={{ color: "#0e121a" }}></i>
                    </div>
                    <h5 className="fw-bold text-secondary">{card.title}</h5>
                    <h2 style={{ color: "#0e121a" }}>{card.count}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-4 shadow-sm p-5 mb-5 border">
            <h4 className="fw-bold mb-4" style={{ color: "#121221" }}>
              Quick Actions
            </h4>
            <div className="row">
              {[
                { label: "Add Employee", link: "/admin/addemployee" },
                { label: "Assign Task", link: "/admin/assigntask" },
                { label: "Add Project", link: "/admin/addproject" },
              ].map((action, idx) => (
                <div className="col-md-4 mb-3" key={idx}>
                  <Link
                    to={action.link}
                    className="btn btn-lg w-100 fw-bold text-white"
                    style={{
                      backgroundColor: "#121221",
                      borderRadius: "30px",
                    }}
                  >
                    {action.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
}