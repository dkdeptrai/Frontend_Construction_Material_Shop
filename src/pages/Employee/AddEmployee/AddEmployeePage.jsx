import "./AddEmployeePage.css";
import { useState } from "react";

//compoents
import InputComponent from "../../../components/InputComponent/InputComponent";
import BackButton from "../../../components/layouts/backButton/backButton.jsx";
import { API_CONST } from "../../../constants/apiConstants.jsx";
import ImageInputComponent from "../../../components/imageInputComponent/imageInputComponent.jsx";
import LoadingCircle from "../../../components/LoadingCircle/LoadingCircle.jsx";

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

  //valid states
  const [isNameValid, setIsNameValid] = useState(true);
  const [isImageValid, setIsImageValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(true);
  const [isSalaryValid, setIsSalaryValid] = useState(true);
  const [isStartDateValid, setIsStartDateValid] = useState(true);

  const handleClick = async (e) => {
    e.preventDefault();

    setLoading(true);
    setIsNameValid(employeeName !== "");
    setIsImageValid(employeeImage !== "");
    setIsEmailValid(email !== "");
    setIsPhoneValid(phone !== "");
    setIsAddressValid(address !== "");
    setIsDateOfBirthValid(dateOfBirth !== "");
    setIsSalaryValid(salary !== "");
    setIsStartDateValid(startDate !== "");

    if (
      employeeName === "" ||
      employeeImage === "" ||
      email === "" ||
      phone === "" ||
      address === "" ||
      dateOfBirth === "" ||
      salary === "" ||
      startDate === ""
    ) {
      setLoading(false);
      return;
    }

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
        setLoading(false);
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
      {loading && <LoadingCircle />}
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
          className={isEmailValid ? "" : "invalid-input"}
        />
        {!isEmailValid && (
          <div className="input-missing-alert">
            <span>Missing email</span>
          </div>
        )}
        <InputComponent
          label={
            <>
              Name<span className="required-star">*</span>
            </>
          }
          type="text"
          value={employeeName}
          setValue={setEmployeeName}
          className={isNameValid ? "" : "invalid-input"}
        />
        {!isNameValid && (
          <div className="input-missing-alert">
            <span>Missing name</span>
          </div>
        )}
        <label>
          {
            <>
              Image<span className="required-star">*</span>
            </>
          }
        </label>
        <ImageInputComponent
          setImage={setEmployeeImage}
          className={isImageValid ? "" : "invalid-input"}
        />
        {!isImageValid && (
          <div className="input-missing-alert">
            <span>Missing image</span>
          </div>
        )}

        <InputComponent
          label={
            <>
              Phone<span className="required-star">*</span>
            </>
          }
          type="tel"
          value={phone}
          setValue={setPhone}
          className={isPhoneValid ? "" : "invalid-input"}
        />
        {!isPhoneValid && (
          <div className="input-missing-alert">
            <span>Missing phone</span>
          </div>
        )}
        <InputComponent
          label={
            <>
              Date of birth<span className="required-star">*</span>
            </>
          }
          type="date"
          value={dateOfBirth}
          setValue={setDateOfBirth}
          className={isDateOfBirthValid ? "" : "invalid-input"}
        />
        {!isDateOfBirthValid && (
          <div className="input-missing-alert">
            <span>Missing date of birth</span>
          </div>
        )}
        <InputComponent
          label={
            <>
              Address<span className="required-star">*</span>
            </>
          }
          type="text"
          value={address}
          setValue={setAddress}
          className={isAddressValid ? "" : "invalid-input"}
        />
        {!isAddressValid && (
          <div className="input-missing-alert">
            <span>Missing address</span>
          </div>
        )}
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
          className={isSalaryValid ? "" : "invalid-input"}
        />
        {!isSalaryValid && (
          <div className="input-missing-alert">
            <span>Missing salary</span>
          </div>
        )}
        <InputComponent
          label={
            <>
              Start date<span className="required-star">*</span>
            </>
          }
          type="date"
          value={startDate}
          setValue={setStartDate}
          className={isStartDateValid ? "" : "invalid-input"}
        />
        {!isStartDateValid && (
          <div className="input-missing-alert">
            <span>Missing start date</span>
          </div>
        )}
        <div className="button-margin">
          <button onClick={handleClick}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
