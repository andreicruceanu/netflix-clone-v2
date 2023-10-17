import { useDispatch, useSelector } from "react-redux";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import menuConfigs from "../../configs/menu.config";
import { Link } from "react-router-dom";
import { setUser } from "../../redux/features/userSlice";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  useEffect(() => {
    if (anchorEl) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [anchorEl]);

  return (
    <>
      {user && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
              gap: 1,
              cursor: "pointer",
            }}
            onClick={toggleMenu}
          >
            <img src={user.profilePicture} width={40} alt={"avatar"} />
            <KeyboardArrowDownIcon
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Box>
          <Menu
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorEl={anchorEl}
            sx={{
              ".MuiPaper-root": {
                backgroundColor: "black",
                marginTop: "10px",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                padding: "10px",
                borderBottom: "1px solid grey",
              }}
            >
              <img src={user.profilePicture} width={30} alt={"avatar"} />
              <Typography sx={{ marginLeft: ".8rem" }}>
                Hello, {user.firstName}
              </Typography>
            </Box>
            {menuConfigs.user.map((item, index) => (
              <ListItemButton component={Link} to={item.path} key={index}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}

            <ListItemButton
              sx={{ borderRadius: "10px" }}
              onClick={() => dispatch(setUser(null))}
            >
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase">sign out</Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
