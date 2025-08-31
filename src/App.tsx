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
import { AuthProvider, useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage";

export const App = () => {
  const [issues, setIssues] = React.useState<Issue[]>(issuesData as Issue[]);
  const [showRollback, setShowRollback] = React.useState(false);
  const [previousStatus, setPreviousStatus] = React.useState<string>("");
  const [lastMovedIssue, setLastMovedIssue] = React.useState<string>("");
  

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
        );
        setPreviousStatus(issue.status);
        setLastMovedIssue(issue.id);
        break;
      case "Done":
        setIssues(
          issues.map((i) =>
            i.id === issue.id ? { ...i, status: "In Progress" } : i
          )
        );
        setPreviousStatus(issue.status);
        setLastMovedIssue(issue.id);
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
        );
        setPreviousStatus(issue.status);
        setLastMovedIssue(issue.id);
        break;
      case "In Progress":
        setIssues(
          issues.map((i) => (i.id === issue.id ? { ...i, status: "Done" } : i))
        );
        setPreviousStatus(issue.status);
        setLastMovedIssue(issue.id);
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
      issues.map((i) =>
        i.id === id ? { ...i, status: previousStatus } : i
      ) as Issue[]
    );
  };

  return (
    <AuthProvider>
      <Router>
        <Navigation />
        
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<ProtectedRoute><HomePage issues={issues} /></ProtectedRoute>} />
          <Route
            path="/board"
            element={
              <ProtectedRoute>
              <BoardPage
                lastMovedIssue={lastMovedIssue}
                undoStatusUpdate={undoStatusUpdate}
                showRollback={showRollback}
                issues={issues}
                handleMovingBack={handleMovingBack}
                handleMovingForward={handleMovingForward}
              />
              </ProtectedRoute>
            }
          />
          <Route
            path="/issue/:id"
            element={
              <ProtectedRoute>
              <IssueDetailPage
                issues={issues}
                handleResolution={handleResolution}
              />
              </ProtectedRoute>
            }
          />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        
      </Router>
    </AuthProvider>
  );
};
