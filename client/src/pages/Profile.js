import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaSave } from "react-icons/fa";
import "./Profile.css";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateProfile(form);
    setLoading(false);
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <FaUser className="profile-icon" />
            <div>
              <h1>My Profile</h1>
              <p>Manage your account information</p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="profile-form">
            <label>
              <span>
                <FaUser /> Name
              </span>
              <input name="name" value={form.name} onChange={onChange} />
            </label>
            <label>
              <span>
                <FaEnvelope /> Email
              </span>
              <input name="email" value={form.email} onChange={onChange} />
            </label>
            <label>
              <span>
                <FaPhone /> Phone
              </span>
              <input name="phone" value={form.phone} onChange={onChange} />
            </label>
            <button type="submit" className="save-btn" disabled={loading}>
              <FaSave /> {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
