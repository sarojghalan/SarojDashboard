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

export const WebServiceForm = ({ setOpen, reload, setReload, editMode, data }) => {
  const initialState = {
    title: "",
    description: "",
    image: "",
  };

  const [webService, setWebService] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && data) {
      setWebService({
        title: data.title,
        description: data.description,
        image: data.image,
      });
    }
  }, [editMode, data]);

  const handleWebService = (e) => {
    if (e.target.name === "image") {
      setWebService({
        ...webService,
        image: e.target.files[0],
      });
    } else {
      setWebService({ ...webService, [e.target.name]: e.target.value });
    }
  };

  const docRef = doc(collection(firebaseDb, "webservice"));

  const createWebService = () => {
    if (webService.title === "" || webService.description === "") {
      enqueueSnackbar("Empty Filed Detected ! Please Fill Up", { variant: "error" });
    } else if (editMode) {
      const docRefUpdate = doc(firebaseDb, "webservice", data?.id);
      const file = webService.image;
      const storageRef = ref(fireStorage, `webservice/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          enqueueSnackbar(error, { variant: "error" });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            await updateDoc(docRefUpdate, {
              ...webService,
              image: downloadUrl,
            })
              .then((res) => {
                enqueueSnackbar("Web Service has been updated successfully", {
                  variant: "success",
                });
                setOpen(false);
              })
              .catch((err) => {
                enqueueSnackbar("Error occured !! Please try again", { variant: "error" });
                console.log(err);
                setOpen(false);
              });
          });
        }
      );
    } else {
      const file = webService.image;
      const storageRef = ref(fireStorage, `webservice/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          enqueueSnackbar(error, { variant: "error" });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            await setDoc(docRef, {
              ...webService,
              image: downloadUrl,
              id: docRef.id,
              createdAt: Date.now().toLocaleString(),
            })
              .then((res) => {
                enqueueSnackbar("Web Service has been created successfully", {
                  variant: "success",
                });
                setOpen(false);
              })
              .catch((err) => {
                enqueueSnackbar("Error occured !! Please try again", { variant: "error" });
                console.log(err);
                setOpen(false);
              });
          });
        }
      );
    }
  };

  return (
    <SoftBox component="form" role="form">
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Web Service Title
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          placeholder="Enter here..."
          required
          name="title"
          value={webService.title}
          onChange={handleWebService}
        />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Web Service Description
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          placeholder="Enter here..."
          required
          name="description"
          value={webService.description}
          onChange={handleWebService}
        />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Web Service Image
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="file"
          name="image"
          placeholder="Input File Here.."
          onChange={handleWebService}
        />
      </SoftBox>
      <SoftBox mt={4} mb={1}>
        <LoadingButton
          title={editMode ? "Update Web Service" : "Create Web Service"}
          loading={loading}
          action={createWebService}
        />
        &nbsp;
        <SoftButton variant="gradient" color="error" onClick={() => setOpen(false)}>
          Close
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
};
