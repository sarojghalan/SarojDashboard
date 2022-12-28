/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, useMemo, useContext } from "react";
import "./App.css";
// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate, Outlet } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav/index";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard React routes
import routes from "routes";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator, setLayout } from "context";

// Images
import brand from "assets/favicon.ico";
import SignIn from "layouts/authentication/sign-in";
import Profile from "layouts/profile";

// Package import
import { Tooltip } from "@mui/material";
import axios from "axios";

// Components import
import { UserContext } from "context/user";
import { Logout } from "helpers/logout";
import { ProtectedRoute } from "ProtectRoute";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { user, setUser, loading } = useContext(UserContext);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  axios.defaults.headers.common["Authorization"] = "Bearer " + user?.access_token;

  // useEffect(() => {

  // }, [user]);

  const navigate = useNavigate();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  useEffect(() => {
    setLayout(dispatch, "stream");
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <Tooltip title="Logout">
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="3.5rem"
        height="3.5rem"
        bgColor="white"
        shadow="sm"
        borderRadius="50%"
        position="fixed"
        right="2rem"
        bottom="2rem"
        zIndex={99}
        color="dark"
        sx={{ cursor: "pointer" }}
        onClick={() => Logout(setUser, navigate)}
      >
        <Icon fontSize="default" color="primary">
          logout
        </Icon>
      </SoftBox>
    </Tooltip>
  );

  return (
    <ThemeProvider theme={theme}>
      {/* <Jutsu
        domain="mohansinghthagunna.com.np"
        containerStyles={{ width: "100vw", height: "100vh" }}
        roomName={room}
        displayName={displayName}
        password={password}
        onMeetingEnd={() => console.log("Meeting has ended")}
        loadingComponent={<p>loading ...</p>}
        errorComponent={<p>Oops, something went wrong</p>}
      /> */}
      <CssBaseline />
      {layout === "dashboard" && user && (
        <>
          <Sidenav
            color={sidenavColor}
            // brand={brand}
            brandName="SAROJ GHALAN"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}

      {layout === "stream" && user && (
        <>
          {/* <PollSidebar /> */}
          {/* <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Loksewa Bazaar"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          /> */}
          {/* <Configurator /> */}
          {/* {configsButton} */}
        </> 
      )}

      <Routes>
        <Route element={<ProtectedRoute user={user} loading={loading} />}>
          {getRoutes(routes)}
          <Route path="/profile" element={<Profile />} />
        </Route>
  
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
      </Routes>
    </ThemeProvider>
  );
}
 