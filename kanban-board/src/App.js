import React from "react";
import KanbanBoard from "./components/KanbanBoard";
import "./App.css"; // Import your global CSS styles

function App() {
  return (
    <div className="App">
      <header>
        <h1>Kanban Board App</h1>
      </header>
      <main>
        <KanbanBoard />
      </main>
    </div>
  );
}

export default App;
