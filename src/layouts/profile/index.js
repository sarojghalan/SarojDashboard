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
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Library Imports
import { useState, useEffect } from "react";
import axios from "axios"; 
import Skeleton from "@mui/material/Skeleton";
import ProfileLoader from "./ProfileLoader";
function Overview() {
  const [profileData, setProfileData] = useState({});
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/teacher/my-profile`,
    })
      .then((res) => {
        setProfileData(res.data.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  }, [reload]);
  return (
    <DashboardLayout>
      {loading ? (
        <ProfileLoader />
      ) : (
        <>
          <Header profileData={profileData} reload={reload} setReload={setReload} />
          <SoftBox mt={5} mb={3}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12} md={6} xl={4}>
            <PlatformSettings />
          </Grid> */}
              <Grid item xs={12} md={12} xl={12}>
                <ProfileInfoCard
                  title="profile information"
                  description={profileData?.bio}
                  info={{
                    fullName: profileData?.name,
                    mobile: profileData?.phone,
                    email: profileData?.email,
                    location: profileData?.address,
                  }}
                  social={[
                    {
                      link: profileData?.facebook_url,
                      icon: <FacebookIcon />,
                      color: "facebook",
                    },
                    {
                      link: profileData?.twitter_url,
                      icon: <TwitterIcon />,
                      color: "twitter",
                    },
                    {
                      link: profileData?.instagram_url,
                      icon: <InstagramIcon />,
                      color: "instagram",
                    },
                  ]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                />
              </Grid>
              {/* <Grid item xs={12} xl={12}>
                <ProfilesList title="Upcoming Streams" profiles={profilesListData} />
              </Grid> */}
            </Grid>
          </SoftBox>
        </>
      )}
    </DashboardLayout>
  );
}

export default Overview;
