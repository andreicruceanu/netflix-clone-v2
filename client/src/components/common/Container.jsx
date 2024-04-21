import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const Container = ({ header, children }) => {
  return (
    <Box
      sx={{
        marginTop: { xs: "2rem", md: "8rem" },
        marginX: "auto",
        color: "text.primary",
      }}
    >
      <Stack spacing={4}>
        {header && (
          <Box
            sx={{
              position: "relative",
              paddingX: 0,
              maxWidth: "1466px",
              marginX: "auto",
              width: "100%",
              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "100%",
                height: { xs: "3px", md: "5px" },
                width: "100px",
                backgroundColor: "primary.main",
              },
            }}
          >
            <Typography
              sx={{ fontSize: { xs: "15px", md: "22px" } }}
              fontWeight="700"
              textTransform="uppercase"
            >
              {header}
            </Typography>
          </Box>
        )}
        {children}
      </Stack>
    </Box>
  );
};

export default Container;
