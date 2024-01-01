import "./StatusContainer.css";

const StatusContainer = ({ status }) => {
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
      {status}
    </div>
  );
};

export default StatusContainer;
