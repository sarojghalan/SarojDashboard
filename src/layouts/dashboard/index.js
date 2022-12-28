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

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

// Dashboard layout components

import UpcomingMeeting from "layouts/dashboard/components/UpcomingMeeting";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import { useEffect, useState } from "react";

function Dashboard() {
  const [totalStream, setTotalStream] = useState(0);
  const [completedStream, setCompletedStream] = useState(0);
  const [upcoming, setUpcoming] = useState(0);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Total Streams" }}
                count={totalStream}
                // percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "live_tv" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Total Completed" }}
                count={completedStream}
                // percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "check" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Remaining Meetings" }}
                count={upcoming}
                // percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "upcoming" }}
              />
            </Grid>
          </Grid>
        </SoftBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <UpcomingMeeting />
          </Grid>
        </Grid>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
