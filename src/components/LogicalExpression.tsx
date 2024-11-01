import { FC, useState, useEffect } from "react";

import BooleanExpressionEvaluator from "../lib/booleanExpressionEvaluator";

const EXPRESSION: string = "(A AND B) OR (NOT C)";
const values: { [key: string]: boolean } = { A: true, B: false, C: true };
const booleanExpression = new BooleanExpressionEvaluator(EXPRESSION);

const LogicalExpression: FC = () => {
  const [result, setResult] = useState(false);

  useEffect(() => {
    setResult(booleanExpression.evaluate(values));
  }, []);

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Task 1</h5>
        <div className="mt-2">
          <p>{EXPRESSION} </p>
          <hr />
          <p>{result.toString()}</p>
        </div>
      </div>
    </div>
  );
};

export default LogicalExpression;
