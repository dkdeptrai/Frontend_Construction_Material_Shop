import "./AddEmployeePage.css";
import { useState } from "react";

//compoents
import InputComponent from "../../../InputComponent/InputComponent";
import BackButton from "../../../layouts/backButton/backButton.jsx";

const AddEmployee = () => {
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeImage, setEmployeeImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    const registerRequest = {
      email: email,
      password: password,
      name: employeeName,
      imageUrl: null,
      phone: phone,
      dateOfBirth: dateOfBirth,
      contactAddress: address,
      userType: "EMPLOYEE",
      employeeCode: employeeCode,
      salary: salary,
      startedWorkingDate: startDate,
      employeeType: position,
    };

    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerRequest),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      alert("Employee added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="employee-page">
      <BackButton content="Add Employee" />
      <form>
        <InputComponent
          label="Employee Code"
          type="text"
          value={employeeCode}
          setValue={setEmployeeCode}
        />
        <InputComponent
          label="Employee Name"
          type="text"
          value={employeeName}
          setValue={setEmployeeName}
        />
        <InputComponent
          label="Employee Image"
          type="file"
          accept="image/*"
          value={employeeImage}
          setValue={setEmployeeImage}
        />
        <InputComponent
          label="Email"
          type="email"
          value={email}
          setValue={setEmail}
        />
        <InputComponent
          label="Password"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <InputComponent
          label="Phone"
          type="tel"
          value={phone}
          setValue={setPhone}
        />
        <InputComponent
          label="Address"
          type="text"
          value={address}
          setValue={setAddress}
        />
        <InputComponent
          label="Date of Birth"
          type="date"
          value={dateOfBirth}
          setValue={setDateOfBirth}
        />
        <InputComponent
          label="Position"
          type="select"
          value={position}
          setValue={setPosition}
          options={["SALE", "WAREHOUSE", "SHIPPING"]}
        />
        <InputComponent
          label="Salary"
          type="number"
          value={salary}
          setValue={setSalary}
        />
        <InputComponent
          label="Start Date"
          type="date"
          value={startDate}
          setValue={setStartDate}
        />
        <div className="button-margin">
          <button onClick={handleClick}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
