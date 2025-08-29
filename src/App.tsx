import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { BoardPage } from "./pages/BoardPage";
import { IssueDetailPage } from "./pages/IssueDetailPage";
import { SettingsPage } from "./pages/SettingsPage";
import { Navigation } from "./components/Navigation";
import { Issue } from "./types";
import issuesData from "./data/issues.json";
import Modal from "./components/Modal";

export const App = () => {
  const [issues, setIssues] = React.useState<Issue[]>(issuesData as Issue[]);
const [showRollback, setShowRollback] = React.useState(false);
const [previousStatus, setPreviousStatus] = React.useState<string>("");
const [lastMovedIssue, setLastMovedIssue] = React.useState<string>("");
 const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [recentIssues, setRecentIssues] = React.useState<Issue[]>([]);

  const openModal = () => {
    const stored = JSON.parse(localStorage.getItem("recentIssues") || "[]");
    setRecentIssues(stored);
    setIsModalOpen(true);
  };



  const handleResolution = (issue: Issue) => {
    setIssues(
      issues.map((i) => (i.id === issue.id ? { ...i, status: "Done" } : i))
    );
  };

  const handleMovingBack = (issue: Issue) => {
    switch (issue.status) {
      case "In Progress":
        setIssues(
          issues.map((i) =>
            i.id === issue.id ? { ...i, status: "Backlog" } : i
          )
        );setPreviousStatus(issue.status);setLastMovedIssue(issue.id);
        break;
      case "Done":
        setIssues(
          issues.map((i) =>
            i.id === issue.id ? { ...i, status: "In Progress" } : i
          )
        );setPreviousStatus(issue.status);setLastMovedIssue(issue.id);
        break;
    }
    setShowRollback(true);
    setTimeout(() => {
      setShowRollback(false);
      setLastMovedIssue("");
    }, 5000);
  };

  const handleMovingForward = (issue: Issue) => {
    switch (issue.status) {
      case "Backlog":
        setIssues(
          issues.map((i) =>
            i.id === issue.id ? { ...i, status: "In Progress" } : i
          )
        );setPreviousStatus(issue.status);setLastMovedIssue(issue.id);
        break;
      case "In Progress":
        setIssues(
          issues.map((i) =>
            i.id === issue.id ? { ...i, status: "Done" } : i
          )
        );setPreviousStatus(issue.status);setLastMovedIssue(issue.id);
        break;
    }
    setShowRollback(true);
    setTimeout(() => {
      setShowRollback(false);
      setLastMovedIssue("");
    }, 5000);
  };

  const undoStatusUpdate = (id: string) => {
    setIssues(
      issues.map((i) => (i.id === id ? { ...i, status: previousStatus } : i)) as Issue[]
    );
  }


  return (
    <Router>
      <Navigation />
      <button onClick={openModal}>Show Last 5 Issues</button>
      <Routes>
        <Route path="/board" element={<BoardPage lastMovedIssue={lastMovedIssue} undoStatusUpdate={undoStatusUpdate} showRollback={showRollback} issues={issues} handleMovingBack={handleMovingBack} handleMovingForward={handleMovingForward} />} />
        <Route
          path="/issue/:id"
          element={
            <IssueDetailPage
              issues={issues}
              handleResolution={handleResolution}
            />
          }
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/board" />} />
      </Routes>
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
    </Router>
  );
};
