import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import { routesGen } from "../routes/routes";

const main = [
  {
    display: "Home",
    path: `${routesGen.home}`,
    icon: <HomeOutlinedIcon />,
    state: "home",
  },
  {
    display: "TV Shows",
    path: `${routesGen.tvShows(22)}`,
    icon: <LiveTvOutlinedIcon />,
    state: "tv",
  },
  {
    display: "Movies",
    path: "/movie",
    icon: <SlideshowOutlinedIcon />,
    state: "movie",
  },
  {
    display: "New & Popular",
    path: "/movie",
    icon: <SlideshowOutlinedIcon />,
    state: "new&polular",
  },
];

const user = [
  {
    display: "Account",
    path: "/account",
    icon: <PersonOutlineIcon />,
    state: "account",
  },
  {
    display: "favorites",
    path: "/favorites",
    icon: <FavoriteBorderOutlinedIcon />,
    state: "favorite",
  },
  {
    display: "reviews",
    path: "/reviews",
    icon: <RateReviewOutlinedIcon />,
    state: "reviews",
  },
  {
    display: "password update",
    path: "/password-update",
    icon: <LockResetOutlinedIcon />,
    state: "password.update",
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
