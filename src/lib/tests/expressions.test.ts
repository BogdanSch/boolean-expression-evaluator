import { expect, test } from "vitest";

import { Values } from "../types/booleanExpressionTypes";
import BooleanExpressionEvaluator from "../booleanExpressionEvaluator";

// const EXPRESSION: string = "(A AND B) OR (NOT C)";
const EXPRESSION: string = "(A AND B) OR (C EQUIV A)";
const values: Values = { A: true, B: false, C: true };
const booleanExpression = new BooleanExpressionEvaluator(EXPRESSION);

test(`Evaluates boolean expression: ${EXPRESSION}`, () => {
  expect(booleanExpression.evaluate(values)).toBeTruthy();
});
