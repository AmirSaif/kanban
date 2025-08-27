import { Issue } from "../types";
import { Link } from "react-router-dom";
export default function Cards({ issue,handleMovingBack,handleMovingForward }: { issue: Issue,handleMovingBack:(issue:Issue)=>void,handleMovingForward:(issue:Issue)=>void }) {
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
        {issue.status!=='Backlog' && <button onClick={()=>handleMovingBack(issue)}>&larr;</button>}
        {issue.status!=='Done' && <button onClick={()=>handleMovingForward(issue)}>&rarr;</button>}
      </div>
    </div>
  );
}
