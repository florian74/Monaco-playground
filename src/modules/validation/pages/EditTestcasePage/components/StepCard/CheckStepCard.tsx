import { yupResolver } from "@hookform/resolvers/yup";
import Editor from "@monaco-editor/react";
import { CardContent } from "@mui/material";
import { Grid } from "@mui/material";
import { useController, useForm } from "react-hook-form";
import * as yup from "yup";
import { CheckTestcaseStepType } from "../../../../types";
import useStepCardContext from "../../hooks/useStepCardContext";

const schema = yup.object({
  description: yup.string(),
  option: yup.object(),
  variableNames: yup.array().of(yup.string()),
  checkScript: yup.string().required(),
});


const CheckStepCard = () => {
  const { step } =
    useStepCardContext<CheckTestcaseStepType>();

  const { control, handleSubmit, trigger } = useForm<
    Pick<
      CheckTestcaseStepType,
      "variableNames" | "checkScript" | "description"
    >
  >({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      variableNames: step.variableNames,
      checkScript: step.checkScript,
      description: step?.description || "",
    },
  });

  const variableController = useController({
    control: control,
    name: "variableNames",
  });

  const editorController = useController({
    control: control,
    name: "checkScript",
  });

  // use CheckCardMonacoOption in option to fix
  return (
    <CardContent>
      <Grid container spacing={2} data-testid="step-card-check">
        <Grid item xs={12}>
          <Editor
            height="400px"
            language="javascript"
            theme={"vs-dark"}
            options={
              {
                minimap: {
                  enabled: false,
                },
                scrollbar: {
                  alwaysConsumeMouseWheel: false,
                },
              }
            }  
            data-testid={"check-step-checkScript"}
            onChange={(v) => editorController.field.onChange(v)}
            value={editorController.field.value}
          />
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default CheckStepCard;
