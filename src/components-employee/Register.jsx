
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { auth, firestore } from "../Firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default function Register() {
    var [Email, setEmail] = useState("");
    var [Name, setName] = useState("");
    var [Password, setPassword] = useState("");
    var [Load, setLoad] = useState("");
    var [Role, setRole] = useState("");
    // var [Image, setImage] = useState("");
    var nav = useNavigate()

    function handleform(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,Email,Password)
        .then((userCred)=>{
            savedata(userCred.user.uid)
        })




    }  
    
    const savedata =async(uid)=>{
                let data = {
                    name:Name,
                    email:Email,
                    // userType 1->Admin 2->Customer (users)
                    userType:2,
                    status:true,
                    userId:uid,
                    createdAt:Timestamp.now()

                }
                 await setDoc(doc(firestore,"users",uid), data)
        .then(()=>{
            // two storages brower -session and local
            sessionStorage.setItem("userId",uid)
            sessionStorage.setItem("email",Email)
            sessionStorage.setItem("userType",2)
            sessionStorage.setItem("isLogin",true)
            sessionStorage.setItem("name",Name)
            toast.success("User Registered successfully!!")
            setTimeout(()=>{
                setEmail("")
                setPassword("")
                nav("/")
            },2000)

        })
        .catch((err)=>{
                    toast.error(err.message)
        })

    }
     

        

    return (
        <div className="container-fluid py-5 my-1" style={{backgroundImage: 'url("/assets/img/a.jpg")'}}>
            <ToastContainer />
            <BeatLoader size={20} cssOverride={{ marginLeft: "45%" }} loading={Load} />
            <div className="offset-4 col-lg-4">

             <div className="container pt-5 shadow p-3 mb-5  text-dark rounded" style={{ backgroundColor: 'lightgray' }}>
                <h3 className="text-center fw-bold mb-4"> REGISTER HERE</h3>
                <form onSubmit={handleform} className="mt-2">
                    <label className="form-label mt-2">Name</label>
                    <input type="text" className="form-control" value={Name} onChange={(e) => setName(e.target.value)} />

                    <label className="form-label mt-2">Email</label>
                    <input type="email" className="form-control" value={Email} onChange={(e) => setEmail(e.target.value)} />

                    <label className="form-label mt-2">Password</label>
                    <input type="password" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} />

                    <label className="form-label mt-2">Confirm Password</label>
                    <input type="password" className="form-control" value={Password} onChange={(e) => setPassword(e.target.value)} />

                    <label className="form-label mt-2">Role</label>
                    <select className="form-select" value={Role} onChange={(e) => setRole(e.target.value)} required >
                        <option value="" disabled>Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>

                    {/* <label className="form-label mt-3">Upload Image</label>
                    <input type="file" className="form-control"   onChange={(e) => setImage(e.target.files[0])}  /> */}

                    <div className="offset-4 row-md-4">
                        <button className="btn btn-primary mt-3" type="submit">
                            Register Now
                        </button>
                    </div>

                    <div className="offset-3 row-md-4 mt-3">
                        <small>Already have an account? 
                            <Link to="/login"> Login Now</Link>
                        </small>
                    </div>
                </form>
                    </div>
            </div>
        </div >
    );
}
