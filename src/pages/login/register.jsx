import React, { useState } from "react";
import logo from "../../assets/coin.png";

const Register = () => {
  const [formData, setFormData] = useState({
    ReferId: "",
    ReferCandidateName: "",
    fullName: "",
    mobile: "",
    title: "",
    dob: "",
    gender: "",
    houseNum: "",
    area: "",
    landmark: "",
    state: "",
    district: "",
    City: "",
    pinCode: "",
    favFest: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.ReferId) newErrors.ReferId = "Required";
    if (!formData.ReferCandidateName) newErrors.ReferCandidateName = "Required";
    if (!formData.fullName) newErrors.fullName = "Required";
    if (!formData.mobile) newErrors.mobile = "Required";
    if (!formData.dob) newErrors.dob = "Required";
    if (!formData.gender) newErrors.gender = "Required";
    if (!formData.houseNum) newErrors.houseNum = "Required";
    if (!formData.area) newErrors.area = "Required";
    if (!formData.landmark) newErrors.landmark = "Required";
    if (!formData.state) newErrors.state = "Required";
    if (!formData.district) newErrors.district = "Required";
    if (!formData.City) newErrors.City = "Required";
    if (!formData.pinCode) newErrors.pinCode = "Required";
    if (!formData.favFest) newErrors.favFest = "Required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Submitted!");
    }
  };

  return (
    <div className="min-h-screen bg-[#1e293b] flex flex-col items-center justify-center p-6 animate-slide-bounce">
      <div className="rounded shadow p-6 md:w-[1300px] flex flex-col items-center mb-6">
        <img
          src={logo}
          alt="Logo"
          className="md:h-20 md:w-20 mb-2 h-[120px] w-[120px]"
        />
        <h2 className="md:text-[2.5rem] font-semibold text-white text-[25px]">
          VKT GOLD COIN
        </h2>
        <p className="md:text-[1.2rem] text-[15px] text-white mt-1">
          Register New User
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow p-6 space-y-6 w-full max-w-[1300px]"
      >
        {/* Refral Details */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Refrel Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Refer ID
              </label>
              <input
                type="text"
                name="ReferId"
                value={formData.ReferId}
                onChange={handleChange}
                className={`w-full border ${
                  errors.ReferId ? "border-red-500" : "border-gray-300"
                } p-2 rounded`}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Referal Candidate Name
              </label>
              <input
                type="text"
                name="ReferCandidateName"
                value={formData.ReferCandidateName}
                onChange={handleChange}
                className={`w-full border ${
                  errors.ReferCandidateName
                    ? "border-red-500"
                    : "border-gray-300"
                } p-2 rounded`}
              />
            </div>
          </div>
        </div>

        {/* Associate Details */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Associate Details
          </h2>

          <div className="flex flex-wrap gap-6">
            {/* Title & Full Name */}
            <div className="flex flex-col md:w-[49%] w-[100%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Title & Full Name
              </label>
              <div className="flex gap-2">
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-[100px]"
                >
                  <option value="">Title</option>
                  <option value="Mr.">Mr</option>
                  <option value="Mrs.">Ms</option>
                </select>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`flex-1 border ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  } p-2 rounded`}
                  placeholder="Full Name"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col md:w-[48%] w-[100%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <span className="bg-gray-100 border border-gray-300 px-3 py-2 rounded-l w-[100px] text-center">
                  IN +91
                </span>
                <input
                  type="number"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`flex-1 border ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  } p-2 rounded-r`}
                  placeholder="Enter Mobile Number"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-6">
            {/* Date of Birth */}
            <div className="flex flex-col md:w-[48%] w-[100%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col md:w-[48%] w-[100%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="flex gap-2">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-[250px]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Adress Details */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Adress</h2>

          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col md:w-[48%] w-[100%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                House No./Flat No./Apartment and Street
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="houseNum"
                  value={formData.houseNum}
                  onChange={handleChange}
                  className={`flex-1 border ${
                    errors.houseNum ? "border-red-500" : "border-gray-300"
                  } p-2 rounded`}
                  placeholder="House No./Flat No./Apartment and Street"
                />
              </div>
            </div>

            <div className="flex flex-col w-[48%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Area/Village
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className={`flex-1 border ${
                    errors.area ? "border-red-500" : "border-gray-300"
                  } p-2 rounded`}
                  placeholder="Area/Village"
                />
              </div>
            </div>
          </div>

          <div className="flex mt-6 flex-wrap gap-6">
            <div className="flex flex-col md:w-[48%] w-[100%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Landmark
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className={`flex-1 border ${
                    errors.landmark ? "border-red-500" : "border-gray-300"
                  } p-2 rounded`}
                  placeholder="Landmark"
                />
              </div>
            </div>

            <div className="flex flex-col w-[48%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                State
              </label>
              <div className="flex gap-2">
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-[250px]"
                >
                  <option value="Bihar">Bihar</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex mt-6 flex-wrap gap-6">
            <div className="flex flex-col md:w-[48%] w-[100%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                District
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className={`flex-1 border ${
                    errors.district ? "border-red-500" : "border-gray-300"
                  } p-2 rounded`}
                  placeholder="District"
                />
              </div>
            </div>

            <div className="flex flex-col md:w-[48%] w-[100%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                City
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="City"
                  value={formData.City}
                  onChange={handleChange}
                  className={`flex-1 border ${
                    errors.City ? "border-red-500" : "border-gray-300"
                  } p-2 rounded`}
                  placeholder="City"
                />
              </div>
            </div>
          </div>

          <div className="flex mt-6 flex-wrap gap-6">
            <div className="flex flex-col md:w-[48%] w-[100%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Pin Code
              </label>
              <div className="flex gap-2">
                <input
                  type="Number"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className={`flex-1 border ${
                    errors.pinCode ? "border-red-500" : "border-gray-300"
                  } p-2 rounded`}
                  placeholder="Pin Code"
                />
              </div>
            </div>

            <div className="flex flex-col md:w-[48%] w-[100%]">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Favourite Festival
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="favFest"
                  value={formData.favFest}
                  onChange={handleChange}
                  className={`flex-1 border ${
                    errors.favFest ? "border-red-500" : "border-gray-300"
                  } p-2 rounded`}
                  placeholder=" Favourite Festival"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 hover:bg-blue-700 md:mt-11 mt-1 text-white font-medium px-6 py-2 shadow-md transition duration-200"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
