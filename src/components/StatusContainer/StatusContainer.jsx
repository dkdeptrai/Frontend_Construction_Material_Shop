import "./StatusContainer.css";

const StatusContainer = ({ status }) => {
  const pascalCaseStatus = status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return (
    <div
      className={
        "status-container " +
        {
          PROCESSING: "processing",
          DELIVERING: "delivering",
          COMPLETED: "completed",
          CANCELLED: "cancelled",
        }[status]
      }
    >
      {pascalCaseStatus}
    </div>
  );
};

export default StatusContainer;
