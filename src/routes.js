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
import { MySkill } from "Pages/MySkill/MySkill";
import { MasterBanner } from "Pages/MasterBanner/MasterBanner";
import { MyService } from "Pages/MyServices/MyService";
import { AboutMe } from "Pages/AboutMe/AboutMe";
import { MyProject } from "Pages/MyProjects/MyProject";
import { WelcomeInfo } from "Pages/Welcome/WelcomeInfo";
import { MyLanguage } from "Pages/Language/Language";
import { WebService } from "Pages/WebServices/WebService";

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
    name: "Welcome Info",
    key: "welcome-info",
    route: "/welcome_info",
    icon: <Shop size="12px" />,
    component: <WelcomeInfo />,
    noCollapse: true,
    authentication: true,
  },
  {
    type: "collapse",
    name: "Langauge",
    key: "language",
    route: "/language",
    icon: <Shop size="12px" />,
    component: <MyLanguage />,
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
  {
    type: "collapse",
    name: "My Skill",
    key: "my-skill",
    route: "/my-skill",
    icon: <Shop size="12px" />,
    component: <MySkill />,
    noCollapse: true,
    authentication: true,
  },
  {
    type: "collapse",
    name: "Master Banner",
    key: "master-banner",
    route: "/master-banner",
    icon: <Shop size="12px" />,
    component: <MasterBanner />,
    noCollapse: true,
    authentication: true,
  },
  {
    type: "collapse",
    name: "My Services",
    key: "my-services",
    route: "/my-services",
    icon: <Shop size="12px" />,
    component: <MyService />,
    noCollapse: true,
    authentication: true,
  },
  {
    type: "collapse",
    name: "About Me",
    key: "about-me",
    route: "/about-me",
    icon: <Shop size="12px" />,
    component: <AboutMe />,
    noCollapse: true,
    authentication: true,
  },
  {
    type: "collapse",
    name: "My Project",
    key: "my-project",
    route: "/my-project",
    icon: <Shop size="12px" />,
    component: <MyProject />,
    noCollapse: true,
    authentication: true,
  },
  {
    type: "collapse",
    name: "Web Service",
    key: "web-service",
    route: "/web-service",
    icon: <Shop size="12px" />,
    component: <WebService />,
    noCollapse: true,
    authentication: true,
  },
];

export default routes;
