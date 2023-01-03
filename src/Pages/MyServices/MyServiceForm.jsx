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

export const MyServiceForm = ({ setOpen, reload, setReload, editMode, data }) => {
  const initialState = {
    title: "",
    description: "",
  };

  const [myServiceData, setMyServiceData] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && data) {
      setMyServiceData({
        title: data.title,
        description: data.description,
      });
    }
  }, [editMode, data]);

  const handleMyService = (e) => {
    setMyServiceData({ ...myServiceData, [e.target.name]: e.target.value });
  };

  const docRef = doc(collection(firebaseDb, "myservice"));

  const createMyService = () => {
    if(myServiceData.title === "" || myServiceData.description === ""){
        enqueueSnackbar("Empty Filed Detected ! Please Fill Up", { variant: "error" });
    }else if(editMode){
        const docRefUpdate = doc(firebaseDb, "myservice",data?.id);
        updateDoc(docRefUpdate, { ...myServiceData}).then((res) => {
            enqueueSnackbar("My Service has been updated successfully", {
              variant: "success",
            });
            setOpen(false);
          })
          .catch((err) => {
            enqueueSnackbar("Error occured !! Please try again", { variant: "error" });
            console.log(err)
            setOpen(false);
          });
    }else{
        setDoc(docRef, { ...myServiceData, id: docRef.id ,createdAt: new Date()})
        .then((res) => {
          enqueueSnackbar("My Service has been created successfully", {
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
  }

  return (
    <SoftBox component="form" role="form">
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Service Title
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          placeholder="Enter here..."
          required
          name="title"
          value={myServiceData.title}
          onChange={handleMyService}
        />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Service Description
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          placeholder="Enter here..."
          required
          name="description"
          value={myServiceData.description}
          onChange={handleMyService}
        />
      </SoftBox>
      <SoftBox mt={4} mb={1}>
        <LoadingButton
          title={editMode ? "Update Service" : "Create Service"}
          loading={loading}
          action={createMyService}
        />
        &nbsp;
        <SoftButton variant="gradient" color="error" onClick={() => setOpen(false)}>
          Close
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
};
