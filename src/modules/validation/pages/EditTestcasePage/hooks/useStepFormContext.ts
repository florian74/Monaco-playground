import { useContext } from "react";
import { TestcaseStepType } from "../../../types";
import StepFormContext, {
  StepFormContextProps,
} from "../components/StepForm/StepFormContext";

const useStepFormContext = <T extends TestcaseStepType>() =>
  useContext<StepFormContextProps<T>>(StepFormContext);

export default useStepFormContext;
