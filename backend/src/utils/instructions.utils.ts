import { capitalizeFirstLetter } from './text.utils';

export const processInstructions = (instructionsText: string): string[] => {
  let instructions: string[] = [];
  if (instructionsText) {
    let rawInstructions = instructionsText
      .split('\r\n')
      .filter(
        (step: string) =>
          step.trim() && !/^step\s+\d+$/i.test(step.trim()) && !/^\d+$/.test(step.trim()),
      );

    rawInstructions = rawInstructions.map(step => {
      let inParentheses = false;
      let result = '';
      for (let i = 0; i < step.length; i++) {
        const char = step[i];
        if (char === '(') inParentheses = true;
        else if (char === ')') inParentheses = false;
        result += inParentheses && char === '.' ? ';' : char;
      }
      return result;
    });

    let splitInstructions = rawInstructions.flatMap((step: string) =>
      step
        .split('.')
        .map(s => s.trim().toLowerCase().replace(/;/g, '.'))
        .filter(s => s && !/^\d+$/.test(s)),
    );

    instructions = [];
    for (const step of splitInstructions) {
      if ((step.startsWith('(') || step.endsWith(')')) && instructions.length > 0) {
        instructions[instructions.length - 1] += ` ${step}`;
      } else {
        instructions.push(step);
      }
    }

    instructions = instructions.map(capitalizeFirstLetter);
  }
  return instructions;
};
