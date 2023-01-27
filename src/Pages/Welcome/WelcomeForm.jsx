import React, { useState, useEffect } from "react";

import Required from "components/Required";
// Soft Imports
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import LoadingButton from "components/LoadingButton";
import { useSnackbar } from "notistack";
import firebaseDb from "config/firebase-config";
import { fireStorage } from "config/firebase-config";
import { setDoc, doc, collection, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const WelcomeForm = ({ setOpen, reload, setReload, editMode, data }) => {
  const initialState = {
    info: "",
  };
  const [welcomeInfo, setWelcomeInfo] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && data) {
      setWelcomeInfo(data);
    }
  }, [editMode, data]);

  const handlewelcomeInfo = (e) => {
    setWelcomeInfo({ ...welcomeInfo, [e.target.name]: e.target.value });
  };

  const docRef = doc(collection(firebaseDb, "welcome"));

  const createwelcomeInfo = () => {
    if (welcomeInfo.info === "") {
      enqueueSnackbar("Empty Filed Detected ! Please Fill Up", { variant: "error" });
    } else if(editMode){
        const docRefUpdate = doc(firebaseDb, "welcome",data?.id);
        updateDoc(docRefUpdate, { ...welcomeInfo}).then((res) => {
            enqueueSnackbar("Welcome Info has been updated successfully", {
              variant: "success",
            });
            setOpen(false);
          })
          .catch((err) => {
            enqueueSnackbar("Error occured !! Please try again", { variant: "error" });
            console.log(err)
            setOpen(false);
          });
    }
    else {
      setDoc(docRef, { ...welcomeInfo, id: docRef.id })
        .then((res) => {
          enqueueSnackbar("Welcome info has been created successfully", {
            variant: "success",
          });
          setOpen(false);
        })
        .catch((err) => {
          enqueueSnackbar("Error occured !! Please try again", { variant: "error" });
          console.log(err)
          setOpen(false);
        });
    }
  };

  return (
    <SoftBox component="form" role="form">
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Welcome Info
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          placeholder="Enter here..."
          required
          name="info"
          value={welcomeInfo.info}
          onChange={handlewelcomeInfo}
        />
      </SoftBox>
      <SoftBox mt={4} mb={1}>
        <LoadingButton
          title={editMode ? "Update Navbar Title" : "Create Navbar Title"}
          loading={loading}
          action={createwelcomeInfo}
        />
        &nbsp;
        <SoftButton variant="gradient" color="error" onClick={() => setOpen(false)}>
          Close
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
};
