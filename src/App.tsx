import LogicalExpression from "./components/LogicalExpression";
import TruthTableExpression from "./components/TruthTableExpression";

import "./includes";

function App() {
  return (
    <section className="app">
      <div className="container">
        <div className="text-center mt-5">
          <h1>Boolean Expression Evaluator</h1>
        </div>
        <LogicalExpression />
        <TruthTableExpression />
      </div>
    </section>
  );
}

export default App;
