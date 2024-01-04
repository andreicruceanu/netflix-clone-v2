const uiConfigs = {
  style: {
    gradientBgImage: {
      dark: {
        backgroundImage:
          "linear-gradient(to top, rgba(20,20,20,1), rgba(20,20,20,0.6))",
      },
      light: {
        backgroundImage:
          "linear-gradient(to top, rgba(245,245,245,1), rgba(0,0,0,0))",
      },
    },
    horizontalGradientBgImage: {
      dark: {
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))",
      },
      light: {
        backgroundImage:
          "linear-gradient(to right, rgba(245,245,245,1), rgba(0,0,0,0))",
      },
    },
    typoLines: (lines, textAlign) => ({
      textAlign: textAlign || "justify",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: lines,
    }),
    tagline: {
      fontSize: "20px",
      lineHeight: "28px",
      marginBottom: "5px",
      marginTop: "10px",
      fontWeight: 600,
      opacity: 0.6,
      fontStyle: "italic",
      xs: { fontSize: "16px" },
    },
    mainContent: {
      maxWidth: "94%",
      margin: "0 auto",
      padding: "0 20px",
    },
    RankSvg: {
      dark: {
        color: "#141414",
      },
      light: {
        color: "white",
      },
    },
    backgroundImage: (imgPath) => ({
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "darkgrey",
      backgroundImage: `url(${imgPath})`,
    }),
    backgroundImageMoreDetails: (imgPath) => ({
      position: "absolute",
      backgroundPosition: "center",
      backgroundImage: `url(${imgPath})`,
    }),
  },
};
export default uiConfigs;
