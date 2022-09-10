import { Breakpoint, Dialog, DialogTitle } from "@mui/material";
import { useMemo, useState } from "react";
import {
  TestcaseStepType,
  TestcaseStepTypeEnum,
  TestcaseType,
  VariablesType,
} from "../../../types";
import CheckStepForm from "./StepForm/CheckStepForm";
import StepFormContext from "./StepForm/StepFormContext";

type StepDialogProps = {
  open: boolean;
  testcase: TestcaseType;
  stepType: TestcaseStepTypeEnum | undefined;
  stepId?: string;
  onUpdate?: (data: Omit<TestcaseStepType, "id">) => void;
  dialogSize?: Breakpoint | undefined;
  onClose?: () => void;
};


const StepDialog = ({
  testcase,
  stepId,
  onUpdate,
  stepType,
  dialogSize,
  onClose,
  open,
}: StepDialogProps) => {
  const [size, setSize] = useState<Breakpoint | undefined>(dialogSize);

  const contextValues = useMemo(
    () => ({
      step: stepId ? testcase.steps.find((s) => s.id === stepId) : undefined,
      onSubmit: (data: Omit<TestcaseStepType, "id">) => {
        if (onUpdate !== undefined) {
          onUpdate(data);
        }
        if (onClose !== undefined) {
          onClose();
        }
      },
      onClose: onClose || (() => {}),
      setDialogSize: setSize,
      existingSteps: testcase.steps,
      variables: [
        {
          name: "1",
          available: true,
        }
      ],
    }),
    [onClose, stepId, testcase, onUpdate]
  );

  return (
    <Dialog
      maxWidth={size || "sm"}
      fullWidth
      open={open}
      scroll="paper"
      data-testid="step-dialog"
    >
      <DialogTitle>{stepId ? "Edit" : "Create"} step</DialogTitle>
      <StepFormContext.Provider value={contextValues}>
        {stepType && <CheckStepForm />}
      </StepFormContext.Provider>
    </Dialog>
  );
};

export default StepDialog;
