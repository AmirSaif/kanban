import React from 'react';
import {useParams} from 'react-router-dom';
import { Issue } from "../types";
import { useAuth } from "../auth/AuthContext";


export const IssueDetailPage = ({issues,handleResolution}:{issues:Issue[],handleResolution:(issue:Issue)=>void}) => {
    const {id} = useParams();
    const issue = issues.find(issue => issue.id === id);
  const {role} = useAuth();
React.useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentIssues") || "[]");

    const filtered = stored.filter((i: Issue) => i.id !== issue?.id);

    const updated = [issue, ...filtered].slice(0, 5);

    localStorage.setItem("recentIssues", JSON.stringify(updated));
  }, [issue]);

    if (!issue) return <div>Issue not found</div>;
    return <div style={{padding: '1rem'}}><h2>{issue.title}</h2>
      <p>Status: {issue.status}</p>
      <p>Priority: {issue.priority}</p>
      <p>Severity: {issue.severity}</p>
      <p>Created At: {new Date(issue.createdAt).toLocaleString()}</p>
      <p>Assignee: {issue.assignee}</p>
      <p>Tags: {issue.tags.join(", ")}</p>
      {issue.status!=='Done' && role==='admin' && <button style={{padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            background: "#2563eb",
            color: "white",
            cursor: "pointer",margin: "1rem"}}  onClick={()=>handleResolution(issue)}>Resolve</button>}
      </div>;
};
