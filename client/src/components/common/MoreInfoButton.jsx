import React from "react";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TooltipNetflix from "./TooltipNetflix";
import { PREFERENCES } from "../../utils/constants";
export default function MoreInfoButton({ sx, ...others }) {
  return (
    <TooltipNetflix title={PREFERENCES.moreInfo}>
      <Button
        variant="contained"
        startIcon={
          <InfoOutlinedIcon
            sx={{
              fontSize: {
                xs: "24px !important",
                sm: "32px !important",
                md: "40px !important",
              },
            }}
          />
        }
        {...others}
        sx={{
          ...sx,
          px: { xs: 1, sm: 2 },
          py: { xs: 0.5, sm: 1 },
          fontSize: { xs: 18, sm: 24, md: 28 },
          lineHeight: 1.5,
          fontWeight: "bold",
          textTransform: "capitalize",
          bgcolor: "#6d6d6eb3",
          whiteSpace: "nowrap",
          "&:hover": { bgcolor: "#6d6d6e66" },
        }}
      >
        More Info
      </Button>
    </TooltipNetflix>
  );
}
