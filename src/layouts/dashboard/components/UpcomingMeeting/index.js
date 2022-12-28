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
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import TimelineItem from "examples/Timeline/TimelineItem";
import { useEffect, useState } from "react";


function UpcomingMeeting() {
  const [upcomingClass, setUpcomingClass] = useState([]);

  return (
    <Card className="h-100">
      <SoftBox pt={3} px={3}>
        <SoftTypography variant="h6" fontWeight="medium">
          Upcoming Meeting
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        {upcomingClass.map((item, id) => (
          <TimelineItem
            key={id}
            color="success"
            icon="notifications"
            />
        ))}
        {/* 
        <TimelineItem
          color="success"
          icon="notifications"
          title="Meeting 2"
          dateTime="26 DEC, 10:00 AM to 26 DEC, 11.30 AM"
        /> */}
      </SoftBox>
    </Card>
  );
}

export default UpcomingMeeting;
