import "./AddEmployeePage.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// components
import InputComponent from "../../../components/InputComponent/InputComponent";
import BackButton from "../../../components/layouts/backButton/backButton.jsx";
import { API_CONST } from "../../../constants/apiConstants.jsx";
import ImageInputComponent from "../../../components/imageInputComponent/imageInputComponent.jsx";
import LoadingScreen from "../../../components/LoadingScreen/LoadingScreen.jsx";

const AddEmployee = () => {
  const dispatch = useDispatch();
  // const subroute
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
      setLoading(false);
    } finally {
      if (loading) {
        setLoading(false);
      }
      window.history.back();
    }
  };

  return (
    <div className="employee-page">
      {loading && <LoadingScreen />}
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
          errorMessage={isEmailValid ? null : "Missing email"}
        />

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
          errorMessage={isNameValid ? null : "Missing name"}
        />

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
          errorMessage={isImageValid ? null : "Missing image"}
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
          className={isPhoneValid ? "" : "invalid-input"}
          errorMessage={isPhoneValid ? null : "Missing phone"}
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
          className={isDateOfBirthValid ? "" : "invalid-input"}
          errorMessage={isDateOfBirthValid ? null : "Missing date of birth"}
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
          className={isAddressValid ? "" : "invalid-input"}
          errorMessage={isAddressValid ? null : "Missing address"}
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
          className={isSalaryValid ? "" : "invalid-input"}
          errorMessage={isSalaryValid ? null : "Missing salary"}
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
          className={isStartDateValid ? "" : "invalid-input"}
          errorMessage={isStartDateValid ? null : "Missing start date"}
        />

        <div className="button-margin">
          <button onClick={handleClick}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
