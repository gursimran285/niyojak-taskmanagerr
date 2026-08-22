import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminMaster from './layout-admin/AdminMaster'
import Main from './components-admin/Main'
import AddEmployee from './components-admin/AddEmployee'
import Home from './component-home/Home'
import ManageEmployee from './components-admin/ManageEmployee'
import Login from './component-home/Login'
import UpdateEmployee from './components-admin/UpdateEmployee'
import AddProject from './components-admin/AddProject'
import UpdateProject from './components-admin/UpdateProject'
import ManageProjects from './components-admin/ManageProject'
import AssignTask from './components-admin/AssignTask'
import ManageTasks from './components-admin/ManageTask'
import Register from './components-employee/Register'
import Dashboard from './components-admin/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployeeMaster from './layout-employee/EmployeeMaster'
import ViewProfile from './components-employee/Viewprofile'
import ViewProjects from './components-employee/ViewProject'
import Master from './layout-home/Master'
import ManageRequest from './components-admin/ManageRequest'
import ViewTasks from './components-employee/ViewTask'
import AddRequest from './components-employee/AddRequest'
import UpdateTask from './components-admin/UpdateTask'
import { ToastContainer } from 'react-toastify'
import ViewRequests from './components-employee/ViewReq'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Master />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>

          {/* ADMIN PANEL */}
          <Route path="/admin" element={<AdminMaster />}>
            {/* <Route path="/admin" element={<Main />}></Route> */}
            <Route path="/admin" element={<Dashboard />}></Route>
            <Route path="/admin/register" element={<Register />}></Route>

            <Route path="/admin/addemployee" element={<AddEmployee />}></Route>
            <Route path="/admin/updateemployee/:id" element={<UpdateEmployee />}></Route>
            <Route path="/admin/manageemployee" element={<ManageEmployee />}></Route>

            <Route path="/admin/addproject" element={<AddProject />}></Route>
            <Route path="/admin/updateproject/:id" element={<UpdateProject />}></Route>
            <Route path="/admin/manageproject" element={<ManageProjects />}></Route>

            <Route path="/admin/assigntask" element={<AssignTask />}></Route>
            <Route path="/admin/managetask" element={<ManageTasks />}></Route>
            <Route path="/admin/updatetask/:id" element={<UpdateTask />}></Route>

            <Route path="/admin/managerequest" element={<ManageRequest />}></Route>

          </Route>

          {/* EMPLOYEE PANEL */}
          <Route path="/employee" element={<EmployeeMaster />}>
            <Route path="/employee/view-profile" element={<ViewProfile />}></Route>
            {/* <Route path="/employee/view-profile" element={<ViewProjects />}></Route> */}
            {/* <Route path="/employee/viewprofile" element={<ViewProfile />}></Route> */}
            <Route path="/employee/viewproject" element={<ViewProjects />}></Route>
            <Route path="/employee/viewtask" element={<ViewTasks />}></Route>
            <Route path="/employee/addrequest" element={<AddRequest />}></Route>
            <Route path="/employee/viewreq" element={<ViewRequests />}></Route>

          </Route>
        </Routes>


      </BrowserRouter>

      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
