import React, { useState, useEffect } from "react";

import Required from "components/Required";
// Soft Imports
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Grid, Icon } from "@mui/material";
import LoadingButton from "components/LoadingButton";

// Library imports
import axios from "axios";
import { useSnackbar } from "notistack";

const initialState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  bio: "",
  dob: new Date("1998-04-05"),
  subject: "Science",
  facebook_url: "",
  instagram_url: "",
  linkedin_url: "",
  twitter_url: "",
  profile_image: "",
};

export default function ProfileForm({ setOpen, reload, setReload, data }) {
  const [profileData, setProfileData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
      setProfileData({ ...profileData, profile_image: e.target.files[0] });
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  useEffect(() => {
    if (data) {
      setProfileData({ ...profileData, ...data });
    }
  }, [data]);

  const handleProfileDataChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    setLoading(true);
    const formData = new FormData();

    for (const property in profileData) {
      formData.append(property, profileData[property]);
    }
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/teacher/profile/update`,
      data: formData,
    })
      .then((res) => {
        setOpen(false);
        enqueueSnackbar("Profile has been updated.", { variant: "success" });
        setReload(!reload);
      })
      .catch((e) => {
        if (e.response.data) {
          enqueueSnackbar(e.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar("Failed to create poll");
        }
      });
    setLoading(false);
  };

  return (
    <SoftBox component="form" role="form">
      <Grid container spacing={1}>
        <Grid item lg={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="upload-button">
              {image.preview || profileData.profile_image ? (
                <img
                  src={image.preview || profileData.profile_image}
                  alt="dummy"
                  width="150"
                  height="150"
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <>
                  <img
                    style={{ borderRadius: "50%" }}
                    src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png"
                    width="150"
                    height="150"
                  />
                </>
              )}
            </label>
            <input
              type="file"
              id="upload-button"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <br />
          </div>
        </Grid>
        <Grid item lg={12}>
          <SoftBox mb={1}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Full Name <Required />
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="Enter here..."
              required
              name="name"
              value={profileData.name}
              onChange={handleProfileDataChange}
            />
          </SoftBox>
        </Grid>

        <Grid item lg={6}>
          <SoftBox mb={1}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Email Address <Required />
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="email"
              placeholder="Enter here..."
              required
              name="email"
              value={profileData.email}
              onChange={handleProfileDataChange}
            />
          </SoftBox>
        </Grid>

        <Grid item lg={6}>
          <SoftBox mb={1}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Contact Number <Required />
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="Enter here..."
              required
              name="phone"
              value={profileData.phone}
              onChange={handleProfileDataChange}
            />
          </SoftBox>
        </Grid>

        <Grid item lg={12}>
          <SoftBox mb={1}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Address <Required />
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="Enter here..."
              required
              name="address"
              value={profileData.address}
              onChange={handleProfileDataChange}
            />
          </SoftBox>
        </Grid>

        <Grid item lg={12}>
          <SoftBox mb={1}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Bio <Required />
              </SoftTypography>
            </SoftBox>
            <SoftInput
              placeholder="Type here..."
              multiline
              rows={5}
              name="bio"
              value={profileData.bio}
              onChange={handleProfileDataChange}
            />{" "}
          </SoftBox>
        </Grid>

        <Grid item lg={4}>
          <SoftBox mb={1}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Facebook URL
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="Enter here..."
              required
              name="facebook_url"
              value={profileData.facebook_url}
              onChange={handleProfileDataChange}
            />
          </SoftBox>
        </Grid>
        <Grid item lg={4}>
          <SoftBox mb={1}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Twitter URL
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="Enter here..."
              required
              name="twitter_url"
              value={profileData.twitter_url}
              onChange={handleProfileDataChange}
            />
          </SoftBox>
        </Grid>
        <Grid item lg={4}>
          <SoftBox mb={1}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Instagram URL
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="text"
              placeholder="Enter here..."
              required
              name="instagram_url"
              value={profileData.instagram_url}
              onChange={handleProfileDataChange}
            />
          </SoftBox>
        </Grid>
      </Grid>

      <SoftBox mt={4} mb={1}>
        <LoadingButton title="Save" loading={loading} color="success" action={updateProfile} />
        &nbsp;
        <SoftButton variant="gradient" color="error" onClick={() => setOpen(false)}>
          Close
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
}
