import { useContext } from "react";
import { TestcaseStepType } from "../../../types";
import StepCardContext, {
  StepCardContextProps,
} from "../components/StepCard/StepCardContext";

const useStepCardContext = <T extends TestcaseStepType>() =>
  useContext<StepCardContextProps<T>>(StepCardContext);

export default useStepCardContext;
