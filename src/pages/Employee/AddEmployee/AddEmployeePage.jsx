import "./AddEmployeePage.css";
import { useState } from "react";

//compoents
import InputComponent from "../../../components/InputComponent/InputComponent";
import BackButton from "../../../components/layouts/backButton/backButton.jsx";
import { API_CONST } from "../../../constants/apiConstants.jsx";
import ImageInputComponent from "../../../components/imageInputComponent/imageInputComponent.jsx";
import { ClipLoader } from "react-spinners";

const AddEmployee = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeImage, setEmployeeImage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [employeeType, setEmployeeType] = useState("SALE"); //["SALE", "WAREHOUSE", "SHIPPING"]
  const [salary, setSalary] = useState("");
  const [startDate, setStartDate] = useState("");

  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    setLoading(true);

    const registerRequest = {
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

    for (let key in registerRequest) {
      if (registerRequest[key] === null || registerRequest[key] === "") {
        alert(`Please fill in the ${key}`);
        return;
      }
      formData.append(key, registerRequest[key]);
    }

    try {
      const response = await fetch(API_CONST + "/users/employees", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setLoading(false);
      
    } catch (error) {
      console.log(error);
    } finally {
      if (loading) {
        setLoading(false);
      }
      window.history.back();
    }
  };

  return (
    <div className="employee-page">
      {loading && (
        <div className="blur-background">
          <ClipLoader color={"#123abc"} size={100} />
        </div>
      )}
      <BackButton content="Add Employee" />
      <form>
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
          label="Name"
          type="text"
          value={employeeName}
          setValue={setEmployeeName}
        />
        <label>
          {
            <>
              Image<span className="required-star">*</span>
            </>
          }
        </label>
        <ImageInputComponent setImage={setEmployeeImage} />

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
              Employee type<span className="required-star">*</span>
            </>
          }
          type="select"
          value={employeeType}
          setValue={setEmployeeType}
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
