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

    for (let key in registerRequest) {
      if (key !== "imageURL" && (registerRequest[key] === null || registerRequest[key] === "")) {
        alert(`Please fill in the ${key}`);
        return;
      }
    }

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
          label={
            <>
              Employee Code<span className="required-star">*</span>
            </>
          }
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
          label={
            <>
              Employee Code<span className="required-star">*</span>
            </>
          }
          type="file"
          accept="image/*"
          value={employeeImage}
          setValue={setEmployeeImage}
        />
        <InputComponent
          label={
            <>
              Email<span className="required-star">*</span>
            </>
          }
          type="email"
          value={email}
          setValue={setEmail}
        />
        <InputComponent
          label={
            <>
              Password<span className="required-star">*</span>
            </>
          }
          type="password"
          value={password}
          setValue={setPassword}
        />
        <InputComponent
          label={
            <>
              Phone<span className="required-star">*</span>
            </>
          }
          type="tel"
          value={phone}
          setValue={setPhone}
        />
        <InputComponent
          label={
            <>
              Address<span className="required-star">*</span>
            </>
          }
          type="text"
          value={address}
          setValue={setAddress}
        />
        <InputComponent
          label={
            <>
              Date of birth<span className="required-star">*</span>
            </>
          }
          type="date"
          value={dateOfBirth}
          setValue={setDateOfBirth}
        />
        <InputComponent
          label={
            <>
              Postition<span className="required-star">*</span>
            </>
          }
          type="select"
          value={position}
          setValue={setPosition}
          options={["SALE", "WAREHOUSE", "SHIPPING"]}
        />
        <InputComponent
          label={
            <>
              Salary<span className="required-star">*</span>
            </>
          }
          type="number"
          value={salary}
          setValue={setSalary}
        />
        <InputComponent
          label={
            <>
              Start date<span className="required-star">*</span>
            </>
          }
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
