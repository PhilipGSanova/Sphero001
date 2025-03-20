import { useState } from "react";
import { auth, db } from "../firebase/firebase"; // Firebase Auth & Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/bubbles.css";

const Signup = () => {
  const [step, setStep] = useState(1); // Step 1: Collect Info, Step 2: Password
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if Email & Phone are Unique
  const checkUniqueness = async () => {
    setError("");
    const usersRef = collection(db, "users");

    // Query to check if email exists
    const emailQuery = query(usersRef, where("email", "==", formData.email));
    const phoneQuery = query(usersRef, where("phone", "==", formData.phone));

    const emailSnapshot = await getDocs(emailQuery);
    const phoneSnapshot = await getDocs(phoneQuery);

    if (!emailSnapshot.empty) {
      setError("Email already exists!");
      return;
    }
    if (!phoneSnapshot.empty) {
      setError("Phone Number already exists!");
      return;
    }

    // Proceed to Password Step
    setStep(2);
  };

  // Check if Password is Unique
  const isPasswordUnique = async (password) => {
    const usersRef = collection(db, "users");
    const passwordQuery = query(usersRef, where("password", "==", password));
    const passwordSnapshot = await getDocs(passwordQuery);

    return passwordSnapshot.empty; // true if unique, false if already exists
  };

  // Handle Sign-Up
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Validate Passwords
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Check if Password is Unique
    const passwordUnique = await isPasswordUnique(formData.password);
    if (!passwordUnique) {
      setError("This password is already in use. Choose another one!");
      return;
    }

    try {
      // Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Store User Info in Firestore
      await addDoc(collection(db, "users"), {
        name: formData.name,
        dob: formData.dob,
        email: formData.email,
        phone: formData.phone,
        password: formData.password, // Storing for uniqueness check (NOT recommended, should hash it instead)
        uid: userCredential.user.uid,
      });

      // Redirect to Login
      navigate("/Login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="bubble-animation"></div>
      <div className="login-container">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}

        {step === 1 ? (
          // Step 1: Collect Name, DOB, Email, Phone
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Enter Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={checkUniqueness}>
              Next
            </button>
          </form>
        ) : (
          // Step 2: Password Entry
          <form onSubmit={handleSignup}>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
