import InputComponent from "../../../InputComponent/InputComponent";
import "./AddEmployeePage.css";
import BackButton from "../../../layouts/backButton/backButton.jsx";

const AddEmployee = () => {
  const handleClick = () => {
    console.log("Submit");
  };

  return (
    <div className="employee-page">
      <BackButton content="Add Employee" />
      <InputComponent label="Employee Code" inputType="text" />
      <InputComponent label="Employee Name" inputType="text" />
      <InputComponent
        label="Employee Image"
        inputType="file"
        accept="image/*"
      />
      <InputComponent label="Email" inputType="email" />
      <InputComponent label="Password" inputType="password" />
      <InputComponent label="Phone" inputType="tel" />
      <InputComponent label="Address" inputType="text" />
      <InputComponent label="Date of Birth" inputType="date" />
      <InputComponent label="Position" inputType="text" />
      <InputComponent label="Salary" inputType="number" />
      <InputComponent label="Start Date" inputType="date" />
      <div className="button-margin">
        <button onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
};

export default AddEmployee;
