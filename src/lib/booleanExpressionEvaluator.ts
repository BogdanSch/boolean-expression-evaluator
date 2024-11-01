import { TruthTable, Values } from "./types/booleanExpressionTypes";

class BooleanExpressionEvaluator {
  #expression: string;

  constructor(expression: string) {
    this.#expression = expression;
  }

  #createQueue(values: Values): (string | boolean)[] {
    const tokens: string[] = this.#expression
      .replace(/\(/g, " ( ")
      .replace(/\)/g, " ) ")
      .split(" ")
      .filter((token) => token);

    const queue: (string | boolean)[] = [];

    tokens.forEach((token) => {
      if (token === "AND") queue.push("&&");
      else if (token === "OR") queue.push("||");
      else if (token === "NOT") queue.push("!");
      // else if (token === "(" || token === ")") queue.push(token);
      else if (values.hasOwnProperty(token)) queue.push(values[token]);
      else queue.push(token);
    });

    return queue;
  }

  /**
   * Evaluates the expression with given values for variables.
   */
  evaluate(values: Values): boolean {
    const queue = this.#createQueue(values);

    const stack: boolean[] = [];
    const operatorStack: (string | boolean)[] = [];

    const applyOperator = (operator: string) => {
      if (operator === "!") {
        const a = stack.pop();
        if (a === undefined)
          throw new Error("Invalid expression: missing operand for NOT");
        stack.push(!a);
      } else {
        const b = stack.pop();
        const a = stack.pop();
        if (a === undefined || b === undefined)
          throw new Error(
            "Invalid expression: missing operand for binary operation"
          );
        stack.push(operator === "&&" ? a && b : a || b);
      }
    };

    queue.forEach((item) => {
      if (item === "&&" || item === "||" || item === "!") {
        operatorStack.push(item);
      } else if (item === "(") {
        operatorStack.push(item);
      } else if (item === ")") {
        while (
          operatorStack.length &&
          operatorStack[operatorStack.length - 1] !== "("
        ) {
          const operator = operatorStack.pop();
          if (typeof operator === "string") applyOperator(operator);
        }
        operatorStack.pop();
      } else {
        stack.push(Boolean(item));
      }
    });

    while (operatorStack.length) {
      const operator = operatorStack.pop();
      if (typeof operator === "string") applyOperator(operator);
    }

    const result = stack.pop();
    if (result === undefined)
      throw new Error("Invalid expression: empty stack");

    return result;
  }

  generateTruthTable(): TruthTable {
    const variables = Array.from(
      new Set(this.#expression.match(/\b[A-Z]\b/g) || [])
    );

    const truthTable: TruthTable = [];

    const generateCombinations = (index: number, currentValues: Values) => {
      if (index === variables.length) {
        const result = this.evaluate(currentValues);
        truthTable.push({ ...currentValues, result });
        return;
      }

      currentValues[variables[index]] = true;
      generateCombinations(index + 1, currentValues);

      currentValues[variables[index]] = false;
      generateCombinations(index + 1, currentValues);
    };

    generateCombinations(0, {});

    return truthTable;
  }
}

export default BooleanExpressionEvaluator;