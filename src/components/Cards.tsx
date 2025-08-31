import { Issue } from "../types";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
export default function Cards({ issue,handleMovingBack,handleMovingForward,showRollback,undoStatusUpdate, lastMovedIssue }: { issue: Issue,handleMovingBack:(issue:Issue)=>void,handleMovingForward:(issue:Issue)=>void,showRollback:boolean,undoStatusUpdate:(id:string)=>void, lastMovedIssue:string }) {
  const {role} = useAuth();
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "white",
        border: "1px solid black",
      }}
    >
      <h3>{issue.title}</h3>
      <Link to={`/issue/${issue.id}`}>View Details &rarr;</Link>
      <div style={{ padding: "0.5rem" }}>
        {issue.status!=='Backlog' && role==='admin' && <button onClick={()=>handleMovingBack(issue)}>&larr;</button>}
        {issue.status!=='Done' && role==='admin' && <button onClick={()=>handleMovingForward(issue)}>&rarr;</button>}
      </div>
      {lastMovedIssue===issue.id && showRollback && <div style={{padding: '0.5rem'}}><button onClick={()=>undoStatusUpdate(issue.id)}>Undo</button></div>}
    </div>
  );
}
