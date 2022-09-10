import { createContext } from "react";
import { TestcaseStepType } from "../../../../types";

export type StepCardContextProps<T extends TestcaseStepType> = {
  step: T;
};

const StepCardContext = createContext<StepCardContextProps<any>>(
  {} as StepCardContextProps<any>
);

export default StepCardContext;
