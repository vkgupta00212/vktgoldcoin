import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/coin.png";
import registerAPI from "../../backend/register/Register.js";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    Gender: "",
    Dob: "",
    Phone: "",
    AadharCard: "",
    PenCard: "",
    ReferFriend: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Phone") {
      // Remove all non-digit characters
      const cleanedValue = value.replace(/\D/g, "");

      // Restrict to 10 digits max
      if (cleanedValue.length > 10) return;

      setFormData((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.Name) newErrors.Name = true;
    if (!formData.Email || !formData.Email.includes("@"))
      newErrors.Email = true;
    if (!formData.Phone || formData.Phone.length !== 10) newErrors.Phone = true;
    if (!formData.Password) newErrors.Password = true;
    if (formData.Password !== formData.ConfirmPassword)
      newErrors.ConfirmPassword = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    try {
      const response = await registerAPI(
        formData.Name,
        formData.Email,
        formData.Password,
        formData.Gender,
        formData.Dob,
        formData.Phone,
        formData.AadharCard,
        formData.PenCard,
        formData.ReferFriend
      );

      if (response?.Message === "Already Exist") {
        alert("Already exist");
        return;
      }
      alert("✅ Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.message || "❌ Registration failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-6 md:p-10 rounded-[15px] shadow-md w-full max-w-2xl">
        <div className="flex flex-col items-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="h-20 w-20 md:h-24 md:w-24 mb-2"
          />
          <h2 className="text-2xl md:text-3xl font-bold">VKT GOLD COIN</h2>
          <p className="text-gray-500">Register to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className={`w-full p-[2px] border rounded ${
                errors.Name ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Mobile Number</label>
            <div className="flex">
              <span className="bg-gray-100 border p-2 rounded-l">+91</span>
              <input
                name="Phone"
                type="tel"
                maxLength={10}
                value={formData.Phone}
                onChange={handleChange}
                className={`flex-1 p-2 border rounded-r ${
                  errors.Phone ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Gender</label>
              <select
                name="Gender"
                value={formData.Gender}
                onChange={handleChange}
                className="w-full p-2 border rounded border-gray-300"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">DOB</label>
              <input
                name="Dob"
                type="date"
                value={formData.Dob}
                onChange={handleChange}
                className="w-full p-2 border rounded border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="Email"
              type="email"
              value={formData.Email}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.Email ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Password</label>
              <input
                name="Password"
                type="password"
                value={formData.Password}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.Password ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                name="ConfirmPassword"
                type="password"
                value={formData.ConfirmPassword}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${
                  errors.ConfirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Aadhar Card</label>
              <input
                name="AadharCard"
                value={formData.AadharCard}
                onChange={handleChange}
                className="w-full p-2 border rounded border-gray-300"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">PAN Card</label>
              <input
                name="PenCard"
                value={formData.PenCard}
                onChange={handleChange}
                className="w-full p-2 border rounded border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Refer Code (optional)</label>
            <input
              name="ReferFriend"
              value={formData.ReferFriend}
              onChange={handleChange}
              className="w-full p-2 border rounded border-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold rounded-full transition"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
