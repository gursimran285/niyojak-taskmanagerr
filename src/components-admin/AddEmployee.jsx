import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import PageHeader from "./PageHeader";
import { auth, db, firestore } from "../Firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function AddEmployee() {
    const [Email, setEmail] = useState("");
    const [Firstname, setFirstname] = useState("");
    const [Lastname, setLastname] = useState("");
    const [Password, setPassword] = useState("");
    const [Location, setLocation] = useState("");
    const [Department, setDepartment] = useState("");
    const [Dob, setDob] = useState("");
    const [Contact, setContact] = useState("");
    const [Startdate, setStartdate] = useState("");
    const [JobTitle, setJobTitle] = useState("");
    const [Image, setImage] = useState(null);
    const [Gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const isAdult = (dob) => {
        const birth = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age >= 18;
    };


    const handleform = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!Image) {
            toast.error("Please select an image");
            setLoading(false);
            return;
        }

        if (!Gender) {
            toast.error("Please select gender");
            setLoading(false);
            return;
        }

        if (!isAdult(Dob)) {
            toast.error("Employee must be 18+");
            setLoading(false);
            return;
        }

        if (!/^\d{10}$/.test(Contact)) {
            toast.error("Contact must be 10 digits");
            setLoading(false);
            return;
        }

        try {
            // Upload image
            const imgData = new FormData();
            imgData.append("file", Image);
            imgData.append("upload_preset", "Images");

            const imgRes = await axios.post(
                "https://api.cloudinary.com/v1_1/dso5v1ubr/image/upload",
                imgData
            );

            const imageUrl = imgRes.data.secure_url;

            // Create auth user
            const userCred = await createUserWithEmailAndPassword(
                auth,
                Email,
                Password
            );

            // Save Firestore data
            await savedata(userCred.user.uid, imageUrl);

        } catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    };


    const today = new Date().toISOString().split("T")[0];

    const savedata = async (uid, imageUrl) => {
        // EMPLOYEE COLLECTION
        await setDoc(doc(firestore, "employee", uid), {
            name: Firstname + " " + Lastname,
            email: Email,
            Location,
            Department,
            Dob,
            Contact,
            Startdate,
            JobTitle,
            Gender,
            Image: imageUrl,
            status: true,
            userId: uid,
            createdAt: Timestamp.now(),
        });

        // USERS COLLECTION (IMPORTANT)
        await setDoc(doc(firestore, "users", uid), {
            userType: 2, // employee
            email: Email,
            createdAt: Timestamp.now(),
        });

        toast.success("Employee created successfully");
        setLoading(false);
        nav("/admin");
    };




    return (
        <>
            <PageHeader child={"Add Employee"} />
            <ToastContainer />
            <div
                className="container-fluid py-5"
                style={{
                    background: "linear-gradient(to bottom, #2C6D90, #001F54)",
                    minHeight: "100vh",
                    paddingBottom: "80px",
                    fontFamily: "'Poppins', sans-serif",
                }}
            >
                <div className="container">
                    <div
                        className="bg-light rounded-4 shadow-lg p-5"
                        style={{ maxWidth: "900px", margin: "0 auto" }}
                    >
                        <form onSubmit={handleform}>
                            {/* Upload Image */}
                            <div className="mb-4">
                                <label className="form-label">Upload Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>

                            {/* Name Fields */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={Firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={Lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Gender */}



                            <div className="mb-4">
                                <label className="form-label d-block">Gender</label>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={Gender === "Male"}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className="form-check-label">Male</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={Gender === "Female"}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className="form-check-label">Female</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        value="Others"
                                        checked={Gender === "Others"}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    <label className="form-check-label">Other</label>
                                </div>
                            </div>

                            {/* Email & Password */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={Email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={Password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Location & Department */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="form-label">Location</label>
                                    <select
                                        className="form-select"
                                        value={Location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Location</option>
                                        <option value="Jalandhar" >Jalandhar</option>
                                        <option value="Mohali" >Mohali</option>
                                        <option value="Amritsar" >Amritsar</option>
                                        <option value="Chandigarh" >Chandigarh</option>

                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Department</label>
                                    <select
                                        className="form-select"
                                        value={Department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Department</option>
                                        <option value="B. Tech" >B. Tech</option>
                                        <option value="BCA" >BCA</option>
                                        <option value="B. com" >B. com</option>
                                        <option value="MBA" >MBA</option>
                                    </select>
                                </div>
                            </div>

                            {/* DOB & Contact */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="form-label">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={Dob}
                                        onChange={(e) => setDob(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Contact No.</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        maxLength="10"
                                        value={Contact}
                                        onChange={(e) =>
                                            setContact(e.target.value.replace(/[^0-9]/g, ""))
                                        }
                                    />

                                </div>
                            </div>

                            {/* Start Date & Job Title */}
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <label className="form-label">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        min={today}
                                        value={Startdate}
                                        onChange={(e) => setStartdate(e.target.value)}
                                    />


                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Job Title</label>
                                    <select
                                        className="form-select"
                                        value={JobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Select Job Title</option>
                                        <option value="Full Stack Developer" >Full Stack Developer</option>
                                        <option value="Frontent Developer" >Frontent  Developer</option>
                                        <option value="Backend Stack Developer" >Backend  Developer</option>
                                    </select>
                                </div>
                            </div>
                            <div className="d-grid mt-4">


                                <button
                                    type="submit"
                                    className="btn btn-lg"
                                    disabled={loading}
                                    style={{
                                        backgroundColor: "#E63946",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        borderRadius: "30px",
                                        transition: "all 0.8s ease",
                                        opacity: loading ? 0.7 : 1,
                                    }}
                                >
                                    {loading ? "Creating Employee..." : "Create Employee"}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


