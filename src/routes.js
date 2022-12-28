// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Settings from "examples/Icons/Settings";

import LanguageIcon from "@mui/icons-material/Language";
import ArchiveIcon from "@mui/icons-material/Archive";
import PollIcon from "@mui/icons-material/Poll";
import { Navbar } from "Pages/Navbar/Navbar";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
    authentication: true,
  },
  {
    type: "collapse",
    name: "Navbar Title List",
    key: "navbar-title",
    route: "/navbar-title",
    icon: <Shop size="12px" />,
    component: <Navbar />,
    noCollapse: true,
    authentication: true,
  },
];

export default routes;
