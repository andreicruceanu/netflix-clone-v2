import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import Fade from "@mui/material/Fade";

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
    marginBottom: "22px !important",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "white",
  },
});

const TooltipNetflix = ({ title, children }) => {
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
