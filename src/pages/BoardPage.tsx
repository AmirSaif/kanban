import React from "react";
import Modal from "../components/Modal";
import Cards from "../components/Cards";
import { Issue } from "../types";
import { useAuth } from "../auth/AuthContext";
export const BoardPage = ({
  issues,
  handleMovingBack,
  handleMovingForward,
  showRollback,
  undoStatusUpdate,
  lastMovedIssue,
}: {
  issues: Issue[];
  handleMovingBack: (issue: Issue) => void;
  handleMovingForward: (issue: Issue) => void;
  showRollback: boolean;
  undoStatusUpdate: (id: string) => void;
  lastMovedIssue: string;
}) => {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [recentIssues, setRecentIssues] = React.useState<Issue[]>([]);
  const openModal = () => {
    const stored = JSON.parse(localStorage.getItem("recentIssues") || "[]");
    setRecentIssues(stored);
    setIsModalOpen(true);
  };
  return (
    <>
      {isAuthenticated && (
        <button style={{padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",margin: "1rem"}} onClick={openModal}>Show Last 5 Issues</button>
      )}
      <div
        style={{
          padding: "1rem",
          height: "80vh",
          display: "flex",
          flexDirection: "row",
          border: "1px solid black",
        }}
      >
        <div
          style={{ flex: "1", background: "#EAFDFE", height: "100%" }}
        >
          <h2 style={{textAlign: "center"}}>Backlog</h2>
          <div style={{ padding: "1rem" }}>
            {issues
              .filter((issue) => issue.status === "Backlog")
              .map((issue) => (
                <Cards
                  lastMovedIssue={lastMovedIssue}
                  undoStatusUpdate={undoStatusUpdate}
                  showRollback={showRollback}
                  issue={issue}
                  key={issue.id}
                  handleMovingForward={handleMovingForward}
                  handleMovingBack={handleMovingBack}
                />
              ))}
          </div>
        </div>
        <div
          style={{ flex: "1", background: "#DBF9FA", height: "100%" }}
        >
          <h2 style={{textAlign: "center"}}>In progress</h2>
          <div style={{ padding: "1rem" }}>
            {issues
              .filter((issue) => issue.status === "In Progress")
              .map((issue) => (
                <Cards
                  lastMovedIssue={lastMovedIssue}
                  undoStatusUpdate={undoStatusUpdate}
                  showRollback={showRollback}
                  issue={issue}
                  key={issue.id}
                  handleMovingBack={handleMovingBack}
                  handleMovingForward={handleMovingForward}
                />
              ))}
          </div>
        </div>
        <div
          style={{ flex: "1", background: "#CDF7F9", height: "100%" }}
        >
          <h2 style={{textAlign: "center"}}>Resolved</h2>
          <div style={{ padding: "1rem" }}>
            {issues
              .filter((issue) => issue.status === "Done")
              .map((issue) => (
                <Cards
                  lastMovedIssue={lastMovedIssue}
                  undoStatusUpdate={undoStatusUpdate}
                  showRollback={showRollback}
                  issue={issue}
                  key={issue.id}
                  handleMovingBack={handleMovingBack}
                  handleMovingForward={handleMovingForward}
                />
              ))}
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Last 5 Visited Issues</h3>
        {recentIssues.length === 0 ? (
          <p>No issues visited yet</p>
        ) : (
          <ul>
            {recentIssues.map((issue) => (
              <li key={issue.id}>
                {issue.title} ({issue.status})
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  );
};
