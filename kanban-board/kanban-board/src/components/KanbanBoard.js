import React, { useEffect, useState } from "react";
import "./KanbanBoard.css"; // Import your CSS file for styling

const KanbanBoard = () => {
  // State for API data and user preferences
  const [data, setData] = useState([]);
  const [grouping, setGrouping] = useState("user");
  const [sorting, setSorting] = useState("priority");

  // Define a function to fetch data from the API
  const fetchKanbanData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error) {
      console.error("API request failed: " + error.message);
    }
  };

  useEffect(() => {
    fetchKanbanData();
  }, []); // Fetch data when the component mounts

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

  // Function to group and sort data based on user preferences
  const groupAndSortData = () => {
    let groupedData = [...data];
    if (grouping === "user") {
      // Group by user
      groupedData.sort((a, b) => a.user.localeCompare(b.user));
    } else if (grouping === "status") {
      // Group by status
      groupedData.sort((a, b) => a.status.localeCompare(b.status));
    } else if (grouping === "priority") {
      // Group by priority (considering sorting)
      groupedData.sort((a, b) => {
        if (sorting === "priority") {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    }
    return groupedData;
  };

  const groupedAndSortedData = groupAndSortData();

  return (
    <div className="kanban-board">
      <div className="controls">
        <button onClick={() => setGrouping("user")}>Group by User</button>
        <button onClick={() => setGrouping("status")}>Group by Status</button>
        <button onClick={() => setGrouping("priority")}>Group by Priority</button>
        <button onClick={() => setSorting("priority")}>Sort by Priority</button>
        <button onClick={() => setSorting("title")}>Sort by Title</button>
      </div>
      <div className="cards">
        {groupedAndSortedData.map((ticket) => (
          <div className={`card priority-${ticket.priority}`} key={ticket.id}>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <div className="priority-label">
              Priority: {getPriorityLabel(ticket.priority)}
            </div>
            <div className="user-label">User: {ticket.user}</div>
            <div className="status-label">Status: {ticket.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
