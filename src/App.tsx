import {
  createTheme,
  responsiveFontSizes,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import { useMemo } from "react";
import { Link, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route } from "react-router-dom";
import useMonacoProvider from "./modules/core/hooks/useMonacoProvider";
import loadable from "@loadable/component";
import CheckStepCard from "modules/validation/pages/EditTestcasePage/components/StepCard/CheckStepCard";
import StepCardContext, { StepCardContextProps } from "modules/validation/pages/EditTestcasePage/components/StepCard/StepCardContext";
import StepCard from "modules/validation/pages/EditTestcasePage/components/StepCard";
import {CheckTestcaseStepType, TestcaseStepTypeEnum, TestcaseType } from "modules/validation/types";
import { DateTime } from "luxon";



// use this in options to fix the bug
export const CheckCardMonacoOption = {
    minimap: {
        enabled: false,
    },
    scrollbar: {
        alwaysConsumeMouseWheel: false,
    },
};

function App() {
  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: "dark",
          },
        })
      ),
    []
  );

  // register completion provider for js editor
  useMonacoProvider();
  
  const checkStep = {
      type: TestcaseStepTypeEnum.CHECK,
      variableNames: ["1"],
      checkScript: ""
  } as CheckTestcaseStepType

    const stepCardContext = {
        step: checkStep
    }
  const testcase: TestcaseType = {
      id: "1234",
      name: "editor error",
      steps: [checkStep],
      initialValues: [],
      creationDate: DateTime.now(),
      updateDate: DateTime.now()
  }
  
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ToastContainer theme="colored" autoClose={3000} />
        <StepCardContext.Provider value={stepCardContext}>
        <Routes>
          <Route
            path={"/"} element={<StepCard testcase={testcase} step={checkStep} index={0}/>}
          />
        </Routes>
        </StepCardContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
