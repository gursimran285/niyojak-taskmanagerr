import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { auth, firestore } from "../Firebase";

export default function LandingLogin() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const handleform = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      /* ================= AUTH LOGIN ================= */
      const userCred = await signInWithEmailAndPassword(
        auth,
        Email,
        Password
      );

      const uid = userCred.user.uid;

      /* ================= USER ROLE ================= */
      const userRef = doc(firestore, "users", uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("User record not found!");
        setLoading(false);
        return;
      }

      const userData = userSnap.data();

      // Common session data
      sessionStorage.setItem("userId", uid);
      sessionStorage.setItem("email", Email);
      sessionStorage.setItem("userType", userData.userType);

      toast.success("Login successful!");

      /* ================= ADMIN ================= */
      if (userData.userType === 1) {
        setTimeout(() => nav("/admin"), 1500);
        return;
      }

      /* ================= EMPLOYEE ================= */
      const empRef = doc(firestore, "employee", uid);
      const empSnap = await getDoc(empRef);

      if (!empSnap.exists()) {
        toast.error("Employee profile not found!");
        setLoading(false);
        return;
      }

   
      setTimeout(() => {
        nav(`/employee/view-profile`);
      }, 1500);

    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="position-relative"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      <ToastContainer />

      {/* 🔄 Fullscreen Loader */}
      {loading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50 z-3">
          <BeatLoader color="#ffffff" size={15} />
        </div>
      )}

      {/* 🔄 Background Carousel */}
      <div
        id="carouselId"
        className="carousel slide position-absolute top-0 start-0 w-100 h-100"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner h-100">
          <div className="carousel-item active h-100">
            <img
              src="/assets/img/carousel-1.jpg"
              className="w-100 h-100 object-fit-cover"
              alt="Background"
              style={{ filter: "brightness(0.5)" }}
            />
          </div>
          <div className="carousel-item h-100">
            <img
              src="/assets/img/carousel-2.jpg"
              className="w-100 h-100 object-fit-cover"
              alt="Background"
              style={{ filter: "brightness(0.5)" }}
            />
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="position-relative z-2 d-flex flex-column align-items-center justify-content-center text-center text-white min-vh-100 px-3">
        <h1 className="fw-bold mb-3">Welcome to Niyojak</h1>
        <p className="mb-4" style={{ maxWidth: 600 }}>
          Streamline your tasks, empower your team, and manage projects with
          cultural clarity.
        </p>

        {/* ================= LOGIN CARD ================= */}
        <div
          className="bg-light text-dark p-4 rounded-4 shadow-lg w-100"
          style={{ maxWidth: 400 }}
        >
          <h4 className="text-center fw-bold mb-4" style={{ color: "#03257E" }}>
            Login to Niyojak
          </h4>

          <form onSubmit={handleform}>
            <div className="mb-3 text-start">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 text-start">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{
                backgroundColor: "#E63946",
                borderRadius: 30,
                fontWeight: "bold",
              }}
              disabled={loading}
            >
              Login Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
