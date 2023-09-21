import { useTheme } from "@emotion/react";
import React from "react";
import uiConfigs from "../../configs/ui.configs";
import RankIcons from "../../utils/rank";

const RankSvg = ({ numberIcon }) => {
  const theme = useTheme();

  const fillColor = uiConfigs.style.gradientBgImage[theme.palette.mode].color;

  const handleBuildSvg = (numberIcon, fillColor) => {
    switch (numberIcon) {
      case 0:
        return RankIcons(fillColor)[0];
      case 1:
        return RankIcons(fillColor)[1];
      case 2:
        return RankIcons(fillColor)[2];
      case 3:
        return RankIcons(fillColor)[3];
      case 4:
        return RankIcons(fillColor)[4];
      case 5:
        return RankIcons(fillColor)[5];
      case 6:
        return RankIcons(fillColor)[6];
      case 7:
        return RankIcons(fillColor)[7];
      case 8:
        return RankIcons(fillColor)[8];
      case 9:
        return RankIcons(fillColor)[9];
      case 10:
        return RankIcons(fillColor)[10];

      default:
        return null;
    }
  };
  return <>{handleBuildSvg(numberIcon, fillColor)}</>;
};

export default RankSvg;
