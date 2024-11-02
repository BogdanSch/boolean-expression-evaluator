import { FC, useState, useEffect } from "react";

import { TruthTable } from "../lib/types/booleanExpressionTypes";
import BooleanExpressionEvaluator from "../lib/booleanExpressionEvaluator";

// const EXPRESSION = "(A AND B) OR C";
// const EXPRESSION = "A EQUIV B";
// const EXPRESSION = "(A AND B) OR (B IMPLIES C)";
const EXPRESSION: string = "NOT A IMPLIES B AND C";
const booleanExpression = new BooleanExpressionEvaluator(EXPRESSION);

const TruthTableExpression: FC = () => {
  const [truthTable, setTruthTable] = useState<TruthTable>([]);

  useEffect(() => {
    setTruthTable(booleanExpression.generateTruthTable());
  }, []);

  return (
    <div className="mt-5">
      <div className="text-left">
        <h3>Task 2: Truth Table</h3>
      </div>
      <table className="table table-bordered table-striped mt-3 text-center">
        <thead>
          <tr>
            {Object.keys(truthTable[0] || {}).map(
              (col, index, headerColumns) => (
                <th key={col}>
                  {index === headerColumns.length - 1
                    ? EXPRESSION
                    : col.toUpperCase()}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {truthTable.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value.toString()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TruthTableExpression;
