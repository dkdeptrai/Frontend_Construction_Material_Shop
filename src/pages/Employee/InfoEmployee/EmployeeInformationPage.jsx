import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//pages and components
import BackButton from "../../../components/layouts/backButton/backButton";
import InputComponent from "../../../components/InputComponent/InputComponent";
import ImageInputComponent from "../../../components/ImageInputComponent/ImageInputComponent.jsx";
import { API_CONST } from "../../../constants/apiConstants";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen.jsx";

function EmployeeInformationPage() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeImage, setEmployeeImage] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [employeeType, setEmployeeType] = useState(); //["SALE", "WAREHOUSE", "SHIPPING"]
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState("");

  const [loading, setLoading] = useState(false);

  //get employee information
  useEffect(() => {
    fetch(API_CONST + "/users/employees/" + id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((respone) => respone.json())
      .then((data) => {
        const employee = {
          email: data.email,
          name: data.name,
          imageUrl: data.imageUrl,
          phone: data.phone,
          dateOfBirth:
            data.dateOfBirth[0] +
            "-" +
            String(data.dateOfBirth[1]).padStart(2, "0") +
            "-" +
            String(data.dateOfBirth[2]).padStart(2, "0"),
          contactAddress: data.contactAddress,
          employeeType: data.employeeType,
          salary: data.salary,
          startedWorkingDate:
            data.startedWorkingDate[0] +
            "-" +
            String(data.dateOfBirth[1]).padStart(2, "0") +
            "-" +
            String(data.dateOfBirth[2]).padStart(2, "0"),
        };
        setEmail(employee.email);
        setEmployeeName(employee.name);
        setEmployeeImage(employee.imageUrl);
        setPhone(employee.phone);
        setDateOfBirth(employee.dateOfBirth);
        setAddress(employee.contactAddress);
        setEmployeeType(employee.employeeType);
        setSalary(employee.salary);
        setStartDate(employee.startedWorkingDate);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  //update employee
  const handleUpdate = () => {
    setLoading(true);

    const employee = {
      email: email,
      name: employeeName,
      image: employeeImage,
      phone: phone,
      dateOfBirth: dateOfBirth,
      contactAddress: address,
      employeeType: employeeType,
      salary: salary,
      startedWorkingDate: startDate,
    };

    const formData = new FormData();

    for (let key in employee) {
      if (employee[key] === null || employee[key] === "") {
        alert(`Please fill in the ${key}`);
        return;
      }
      formData.append(key, employee[key]);
    }

    console.log(formData);

    fetch(API_CONST + "/users/employees/" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then(() => {
        setLoading(false);
        window.history.back();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Update customer failed!");
      });
  };

  return (
    <div>
      {loading && <LoadingScreen />}
      <BackButton content="Employee Information" />
      <form>
        <InputComponent
          label="Email"
          type="text"
          value={email}
          setValue={setEmail}
        />

        <InputComponent
          label="Name"
          type="text"
          value={employeeName}
          setValue={setEmployeeName}
        />

        <label>Image</label>
        <ImageInputComponent
          setImage={setEmployeeImage}
          imageUrl={employeeImage}
        />

        <InputComponent
          label="Phone"
          type="text"
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
          label="Date of birth"
          type="date"
          value={dateOfBirth}
          setValue={setDateOfBirth}
        />
        <InputComponent
          label={
            <>
              Employee type<span className="required-star">*</span>
            </>
          }
          type="select"
          value={employeeType}
          setValue={setEmployeeType}
          options={["SALE", "WAREHOUSE", "SHIPPING"]}
        />
        <InputComponent
          label="Salary"
          type="text"
          value={salary}
          setValue={setSalary}
        />
        <InputComponent
          label="Start date"
          type="date"
          value={startDate}
          setValue={setStartDate}
        />
      </form>
      <div className="button-container">
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}

export default EmployeeInformationPage;
