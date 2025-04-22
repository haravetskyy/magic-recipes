const processSteps = (index: number): string => {
  let step = (index + 1).toString();

  if (Number(step) < 10) {
    step = `0${step}`;
  }

  return step;
};

export { processSteps };
