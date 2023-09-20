import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";

const main = [
  {
    display: "Home",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home",
  },
  {
    display: "TV Shows",
    path: "/tv",
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
const menuConfigs = { main };

export default menuConfigs;
