import InputComponent from "../../InputComponent/InputComponent";

const EmployeePage = () => {
  return (
    <div className="employee-page">
        <InputComponent label="Employee Code" inputType="text" />
        <InputComponent label="Employee Name" inputType="text" />
        <InputComponent label="Employee Image" inputType="file" accept="image/*" />
    </div>
  );
};
