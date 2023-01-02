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

export const MasterBannerForm = ({ setOpen, reload, setReload, editMode, data }) => {
  const initialState = {
    masterBanner: "",
  };

  const [masterBannerData, setMasterBannerData] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && data) {
      setMasterBanner({
        masterBanner: data.masterBanner,
      });
    }
  }, [editMode, data]);

  const handleMasterBanner = (e) => {
    setMasterBannerData({
      ...masterBannerData,
      masterBanner: e.target.files[0],
    });
  };

  const docRef = doc(collection(firebaseDb, "masterBanner"));

  const createMasterBanner = () => {
    if (masterBannerData.masterBanner === "") {
      enqueueSnackbar("Empty field detected !", {
        variant: "error",
      });
    } else if (editMode) {
      const docRefUpdate = doc(firebaseDb, "masterBanner", data?.id);
      const file = masterBannerData.masterBanner;
      const storageRef = ref(fireStorage, `masterBanner/${file.name}`);
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
            await updateDoc(docRefUpdate, { ...masterBannerData, masterBanner: downloadUrl,createdAt: new Date() })
              .then((res) => {
                enqueueSnackbar("Master Banner has been updated successfully", {
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
      const file = masterBannerData.masterBanner;
      const storageRef = ref(fireStorage, `masterBanner/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log("k ma galti bhayo")
      },()=> {
        console.log("yaa samma aaepugeko")
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadUrl)=> {
            await setDoc(docRef, { ...masterBannerData, masterBanner:downloadUrl,id: docRef.id,createdAt:new Date()})
            .then((res) => {
              enqueueSnackbar("Master Banner has been created successfully", { variant: "success" });
              setOpen(false);
              console.log("k bhayo pheri")
            })
            .catch((err) => {
              console.log(err);
              setOpen(false);
            });
        })
      });
    }
  };

  return (
    <SoftBox component="form" role="form">
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Master Banner
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="file"
          name="masterBanner"
          placeholder="Input File Here.."
          onChange={handleMasterBanner}
        />
      </SoftBox>
      <SoftBox mt={4} mb={1}>
        <LoadingButton
          title={editMode ? "Update Navbar Title" : "Create Navbar Title"}
          loading={loading}
          action={createMasterBanner}
        />
        &nbsp;
        <SoftButton variant="gradient" color="error" onClick={() => setOpen(false)}>
          Close
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
};
