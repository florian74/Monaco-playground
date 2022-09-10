import { DateTime } from "luxon";

export enum TestcaseStepTypeEnum {
  CHECK = "Check",
}

export type BaseTestcaseStepType = {
  id: string;
  type: TestcaseStepTypeEnum;
  description: string;
};

export type CheckTestcaseStepType = BaseTestcaseStepType & {
  type: TestcaseStepTypeEnum.CHECK;
  variableNames: string[];
  checkScript: string;
};

export type TestcaseStepType = CheckTestcaseStepType

export type TestcaseType = {
  id: string;
  name: string;
  initialValues: VariablesType[];
  creationDate: DateTime;
  updateDate?: DateTime;
  steps: TestcaseStepType[];
};

export type VariablesType = {
  name: string;
  value: any;
  checked?: boolean;
};

export type TestCaseVariable = {
  name: string;
  available: boolean;
};