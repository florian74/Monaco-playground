import { yupResolver } from "@hookform/resolvers/yup";
import Editor from "@monaco-editor/react";
import {
  Button,
  DialogActions,
  Grid,
} from "@mui/material";
import { useController, useForm } from "react-hook-form";
import * as yup from "yup";
import { CheckTestcaseStepType, TestcaseStepTypeEnum } from "../../../../types";
import useStepFormContext from "../../hooks/useStepFormContext";
import { useEffect } from "react";
import DialogContent from "@mui/material/DialogContent";

const schema = yup.object({
  variableNames: yup.array().of(yup.string()),
  checkScript: yup.string(),
  description: yup.string(),
});

const CheckStepForm = () => {
  const { step, onSubmit, onClose, variables } =
    useStepFormContext<CheckTestcaseStepType>();

  const form = useForm<Omit<CheckTestcaseStepType, "id">>({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      type: TestcaseStepTypeEnum.CHECK,
      variableNames: [],
      checkScript: "{}",
    },
  });

  const submitForm = form.handleSubmit((data) => {
    onSubmit({ ...data });
  });

  const editorController = useController({
    control: form.control,
    name: "checkScript",
  });

  useEffect(() => {
    if (step) {
      editorController.field.onChange(step.checkScript);
    }
  }, [step]);

  // use CheckCardMonacoOption in option to fix
  return (
    <>
      <DialogContent>
        <Grid item xs={12}>
          <Editor
            height="400px"
            language="javascript"
            theme={"vs-dark"}
            options={{
              minimap: {
                enabled: false,
              },
              scrollbar: {
                alwaysConsumeMouseWheel: false,
              },
            }}
            data-testid={"step-form-checkScript"}
            onChange={(v) => editorController.field.onChange(v)}
            value={editorController.field.value}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={form.formState.isSubmitting}>
          Close
        </Button>
        <Button
          color="secondary"
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
          onClick={submitForm}
        >
          Save
        </Button>
      </DialogActions>
    </>
  );
};

export default CheckStepForm;
