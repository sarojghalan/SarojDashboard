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

export const LanguageForm = ({ setOpen, reload, setReload, editMode, data }) => {
  const initialState = {
    title:"",
    image: "",
  };

  const [LanguageData, setLanguageData] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    if (editMode && data) {
      setLanguageData({
        image: data.image,
        description: data.description,
      });
    }
  }, [editMode, data]);

  const handleLanguageData = (e) => {
    if (e.target.name === "image") {
      setLanguageData({
        ...LanguageData,
        image: e.target.files[0],
      });
    } else {
      setLanguageData({
        ...LanguageData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const docRef = doc(collection(firebaseDb, "language"));

  const createLanguage = () => {
    if (LanguageData.image === "" || LanguageData.title === "" ) {
      enqueueSnackbar("Empty field detected !", {
        variant: "error",
      });
    } else if (editMode) {
      const docRefUpdate = doc(firebaseDb, "language", data?.id);
      const file = LanguageData.image;
      const storageRef = ref(fireStorage, `language/${file.name}`);
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
              ...LanguageData,
              image: downloadUrl,
              createdAt: new Date(),
            })
              .then((res) => {
                enqueueSnackbar("Language has been updated successfully", {
                  variant: "success",
                });
                setOpen(false);
              })
              .catch((err) => {
                console.log(err);
                setOpen(false);
              });
          });
        }
      );
    } else {
      const file = LanguageData.image;
      const storageRef = ref(fireStorage, `language/${file.name}`);
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
              ...LanguageData,
              image: downloadUrl,
              id: docRef.id,
              createdAt: Date.now().toLocaleString(),
            })
              .then((res) => {
                enqueueSnackbar("Language has been created successfully", {
                  variant: "success",
                });
                setOpen(false);
              })
              .catch((err) => {
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
            Language Title
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          name="title"
          placeholder="Language Title Here.."
          onChange={handleLanguageData}
        />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Project Image
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="file"
          name="image"
          placeholder="Input File Here.."
          onChange={handleLanguageData}
        />
      </SoftBox>
      <SoftBox mt={4} mb={1}>
        <LoadingButton
          title={editMode ? "Update Language" : "Create Language"}
          loading={loading}
          action={createLanguage}
        />
        &nbsp;
        <SoftButton variant="gradient" color="error" onClick={() => setOpen(false)}>
          Close
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
};
