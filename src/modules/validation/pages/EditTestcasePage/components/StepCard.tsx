import {
  Create as EditIcon,
  DeleteForever as DeleteIcon,
  Description,
  FindInPage,
  Loop,
  NextPlan,
  PlayCircleFilled as RunIcon,
} from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  alpha,
  Badge,
  Card as MUICard,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import equal from "fast-deep-equal";
import React, { useMemo, useState } from "react";
import {
  TestcaseStepType,
  TestcaseStepTypeEnum,
  TestcaseType,
} from "../../../types";
import CheckStepCard from "./StepCard/CheckStepCard";
import StepCardContext, {
  StepCardContextProps,
} from "./StepCard/StepCardContext";
import StepDialog from "./StepDialog";

type StepCardProps = {
  testcase: TestcaseType;
  step: TestcaseStepType;
  index: number;
};

const StepCard = ({
  step,
  testcase,
  index,
}: StepCardProps) => {
  const [title, setTitle] = useState<string>();
  const [stepOverride, setStepOverride] = useState<TestcaseStepType>();

  const [edit, setEdit] = useState(false);

  // Menu settings
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const contextValues = useMemo((): StepCardContextProps<any> => {
    return {
      step: step,
    };
  }, [
    step,
    stepOverride,
    testcase,
    index,
  ]);

  const stepComponent = useMemo(() => {
    switch (step.type) {
      case TestcaseStepTypeEnum.CHECK:
        return <CheckStepCard />;
        return null;
    }
  }, [step.type]);

    
  return (
    <MUICard>
      <CardHeader
        title={title}
        data-testid={"card-header-" + step.type}
        action={
          <>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              data-testid={`more-step-${step.id}`}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiSvgIcon-root": {
                    ml: -0.5,
                    mr: 2,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                data-testid={`edit-step-${step.id}`}
                onClick={() => setEdit(true)}
              >
                <EditIcon /> Edit
              </MenuItem>
            </Menu>
          </>
        }
      />
      <Divider />

      <CardContent>
        <StepCardContext.Provider value={contextValues}>
          {stepComponent}
        </StepCardContext.Provider>
      </CardContent>

      <StepDialog
        open={edit}
        testcase={testcase}
        stepId={step.id}
        onUpdate={(data) => {
          
        }}
        stepType={testcase.steps.find((s) => s.id === step.id)!.type}
        onClose={() => setEdit(false)}
      />
    </MUICard>
  );
};

export default StepCard;
