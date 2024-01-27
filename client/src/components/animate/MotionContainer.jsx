import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import { varWrapBoth } from "./variants/Wrap";

export default function MotionContainer({ open, children, ...other }) {
  return (
    <Box
      initial={false}
      variants={varWrapBoth}
      component={motion.div}
      animate={open ? "animate" : "exit"}
      {...other}
    >
      {children}
    </Box>
  );
}
