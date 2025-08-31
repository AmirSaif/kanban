import React, { useState, useMemo } from "react";
import { Issue } from "../types";

type HomePageProps = {
  issues: Issue[];
};

export default function HomePage({ issues }: HomePageProps) {
  const [search, setSearch] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [sortByPriority, setSortByPriority] = useState(false);

  const filteredIssues = useMemo(() => {
    let result = issues;

    if (search.trim()) {
      result = result.filter((issue) =>
        issue.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (assigneeFilter) {
      result = result.filter((issue) => issue.assignee === assigneeFilter);
    }

    if (severityFilter) {
      result = result.filter(
        (issue) => issue.severity === Number(severityFilter)
      );
    }

    if (sortByPriority) {
      const priorityOrder: Record<"high" | "medium" | "low", number> = {
        high: 3,
        medium: 2,
        low: 1,
      };
      result = [...result].sort(
        (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    }

    return result;
  }, [issues, search, assigneeFilter, severityFilter, sortByPriority]);

  const uniqueAssignees = Array.from(new Set(issues.map((i) => i.assignee)));

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Issues Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            flex: "1",
          }}
        />

        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">All Assignees</option>
          {uniqueAssignees.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">All Severities</option>
          {[1, 2, 3, 4, 5].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button
          onClick={() => setSortByPriority((prev) => !prev)}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            background: sortByPriority ? "#2563eb" : "#6b7280",
            color: "white",
            cursor: "pointer",
          }}
        >
          {sortByPriority ? "Sorted by Priority" : "Sort by Priority"}
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Priority</th>
            <th style={thStyle}>Severity</th>
            <th style={thStyle}>Assignee</th>
            <th style={thStyle}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredIssues.map((issue) => (
            <tr key={issue.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={tdStyle}>{issue.id}</td>
              <td style={tdStyle}>{issue.title}</td>
              <td style={tdStyle}>{issue.status}</td>
              <td style={tdStyle}>{issue.priority}</td>
              <td style={tdStyle}>{issue.severity}</td>
              <td style={tdStyle}>{issue.assignee}</td>
              <td style={tdStyle}>
                {new Date(issue.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
          {filteredIssues.length === 0 && (
            <tr>
              <td colSpan={7} style={{ padding: "16px", textAlign: "center" }}>
                No issues found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #d1d5db",
};

const tdStyle: React.CSSProperties = {
  padding: "10px",
};
