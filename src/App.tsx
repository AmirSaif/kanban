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

export const App = () => {
  const [issues, setIssues] = React.useState<Issue[]>(issuesData as Issue[]);
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
        break;
      case "Done":
        setIssues(
          issues.map((i) =>
            i.id === issue.id ? { ...i, status: "In Progress" } : i
          )
        );
        break;
    }
  };

  const handleMovingForward = (issue: Issue) => {
    switch (issue.status) {
      case "Backlog":
        setIssues(
          issues.map((i) =>
            i.id === issue.id ? { ...i, status: "In Progress" } : i
          )
        );
        break;
      case "In Progress":
        setIssues(
          issues.map((i) =>
            i.id === issue.id ? { ...i, status: "Done" } : i
          )
        );
        break;
    }
  };


  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/board" element={<BoardPage issues={issues} handleMovingBack={handleMovingBack} handleMovingForward={handleMovingForward} />} />
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
    </Router>
  );
};
