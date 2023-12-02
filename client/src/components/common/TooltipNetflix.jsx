import { styled } from "@mui/material/styles";
import React from "react";
import { useSelector } from "react-redux";
import Fade from "@mui/material/Fade";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    padding: "10px 15px",
    fontSize: "16px",
    fontWeight: 800,
    backgroundColor: "white",
    color: "black",
    borderRadius: "5px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "white",
  },
});

const TooltipNetflix = ({ title, children }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    <CustomTooltip
      disableFocusListener
      disableTouchListener
      placement="top"
      arrow
      title={title}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 200 }}
    >
      {children}
    </CustomTooltip>
  );
};

export default TooltipNetflix;
