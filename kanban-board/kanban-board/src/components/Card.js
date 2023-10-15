import React from "react";
import "./Card.css"; // Import your CSS file for styling

const Card = ({ ticket }) => {
  // Function to map priority levels to labels
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4:
        return "Urgent";
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      case 0:
        return "No priority";
      default:
        return "Unknown";
    }
  };

  return (
    <div className={`card priority-${ticket.priority}`}>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <div className="priority-label">
        Priority: {getPriorityLabel(ticket.priority)}
      </div>
      <div className="user-label">User: {ticket.user}</div>
      <div className="status-label">Status: {ticket.status}</div>
    </div>
  );
};

export default Card;
