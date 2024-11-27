import React from "react";

function Notification({ type, message }) {
  const bgColor = type === "success" ? "bg-green-500" : "bg-orange-400";

  return (
    <div className={`${bgColor} text-white p-3 rounded-md mb-4`}>{message}</div>
  );
}

export default Notification;
