import { Breakpoint } from "@mui/material";
import { createContext } from "react";
import { TestcaseStepType, TestCaseVariable } from "../../../../types";



export type StepFormContextProps<T extends TestcaseStepType> = {
  step?: Omit<T, "id">;
  existingSteps: TestcaseStepType[];
  onSubmit: (step: Omit<T, "id">) => void;
  onClose: () => void;
  setDialogSize: (size: Breakpoint) => void;
  variables: TestCaseVariable[];
};

const StepFormContext = createContext<StepFormContextProps<any>>(
  {} as StepFormContextProps<any>
);

export default StepFormContext;
