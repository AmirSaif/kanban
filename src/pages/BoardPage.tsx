import Cards from "../components/Cards";
import { Issue } from "../types";
export const BoardPage = ({issues,handleMovingBack,handleMovingForward}:{issues:Issue[],handleMovingBack:(issue:Issue)=>void,handleMovingForward:(issue:Issue)=>void}) => {

  return (
    <div
      style={{
        padding: "1rem",
        height: "80vh",
        display: "flex",
        flexDirection: "row",
        border: "1px solid black",
      }}
    >
      <div style={{ flex: "1", backgroundColor: "lightgray", height: "100%" }}>
        <h1>Backlog</h1>
        <div style={{padding: '1rem'}}>
          {issues
            .filter((issue) => issue.status === "Backlog")
            .map((issue) => (
              <Cards issue={issue} key={issue.id} handleMovingForward={handleMovingForward} handleMovingBack={handleMovingBack}/>
            ))}
        </div>
      </div>
      <div style={{ flex: "1", backgroundColor: "lightblue", height: "100%" }}>
        <h1>In progress</h1>
        <div style={{padding: '1rem'}}>
          {issues
            .filter((issue) => issue.status === "In Progress")
            .map((issue) => (
              <Cards issue={issue} key={issue.id} handleMovingBack={handleMovingBack} handleMovingForward={handleMovingForward}/>
            ))}
        </div>
      </div>
      <div style={{ flex: "1", backgroundColor: "lightgreen", height: "100%" }}>
        <h1>Resolved</h1>
        <div style={{padding: '1rem'}}>
          {issues
            .filter((issue) => issue.status === "Done")
            .map((issue) => (
              <Cards issue={issue} key={issue.id} handleMovingBack={handleMovingBack} handleMovingForward={handleMovingForward}/>
            ))}
        </div>
      </div>
    </div>
  );
};
