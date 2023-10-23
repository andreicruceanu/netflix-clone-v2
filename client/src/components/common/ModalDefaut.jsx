import { Box, Modal, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalDefault = ({ open, onClose, children, action }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "fixed",
          display: "inline-flex",
          flexDirection: "column",
          top: "50%",
          left: "50%",
          transform: "translate(-50% , -50%)",
          width: "100%",
          maxWidth: { xs: "300px", md: "850px", lg: "500px" },
          outline: "none",
          backgroundColor: "#1f1f1f",
          borderTopLeftRadius: "0.25rem",
          borderTopRightRadius: "0.25rem",
          minHeight: { xs: "420px", md: "520px", lg: "500px" },
          zIndex: "9999999",
        }}
      >
        <Box
          sx={{
            backgroundColor: "transparent",
            color: "white",
            padding: "1rem",
            borderBottom: "1px solid grey",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zindex: "99999",
          }}
        >
          <Typography
            component="h5"
            variant="body1"
            sx={{
              margin: 0,
              fontSize: "1.1rem",
              lineHeight: "1.5",
              overflow: "hidden",
              fontWeight: "500",
            }}
          >
            {action === "password" && "Change Password"}
            {action === "email" && "Change Email"}
          </Typography>
          <Button
            onClick={onClose}
            variant="text"
            sx={{ color: "white", padding: "0" }}
          >
            <CloseIcon />
          </Button>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalDefault;
