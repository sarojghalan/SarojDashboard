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

export const AboutMeForm = ({ setOpen, reload, setReload, editMode, data }) => {
  const initialState = {
    title:"",
    image: "",
    description: "",
  };

  const [aboutMeData, setAboutMeData] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && data) {
      setAboutMeData({
        title: data.title,
        image: data.image,
        description: data.description,
      });
    }
  }, [editMode, data]);

  const handleAboutMe = (e) => {
    if (e.target.name === "image") {
      setAboutMeData({
        ...aboutMeData,
        image: e.target.files[0],
      });
    } else {
      setAboutMeData({
        ...aboutMeData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const docRef = doc(collection(firebaseDb, "aboutme"));

  const createAboutMe = () => {
    if (aboutMeData.image === "" || aboutMeData.title === "" || aboutMeData.description === "") {
      enqueueSnackbar("Empty field detected !", {
        variant: "error",
      });
    } else if (editMode) {
      const docRefUpdate = doc(firebaseDb, "aboutme", data?.id);
      const file = aboutMeData.image;
      const storageRef = ref(fireStorage, `aboutme/${file.name}`);
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
              ...aboutMeData,
              image: downloadUrl,
              createdAt: new Date(),
            })
              .then((res) => {
                enqueueSnackbar("About Me data has been updated successfully", {
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
      const file = aboutMeData.image;
      const storageRef = ref(fireStorage, `aboutme/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log("k ma galti bhayo");
        },
        (error) => {
          enqueueSnackbar(error, { variant: "error" });
        },
        () => {
          console.log("yaa samma aaepugeko");
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            await setDoc(docRef, {
              ...aboutMeData,
              image: downloadUrl,
              id: docRef.id,
              createdAt: new Date(),
            })
              .then((res) => {
                enqueueSnackbar("About Me has been created successfully", {
                  variant: "success",
                });
                setOpen(false);
                console.log("k bhayo pheri");
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
            About Me Title
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          name="title"
          placeholder="Enter Title Here.."
          onChange={handleAboutMe}
        />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            About Me Image
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="file"
          name="image"
          placeholder="Input File Here.."
          onChange={handleAboutMe}
        />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            About Me
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          name="description"
          placeholder="Input File Here.."
          onChange={handleAboutMe}
        />
      </SoftBox>
      <SoftBox mt={4} mb={1}>
        <LoadingButton
          title={editMode ? "Update Navbar Title" : "Create Navbar Title"}
          loading={loading}
          action={createAboutMe}
        />
        &nbsp;
        <SoftButton variant="gradient" color="error" onClick={() => setOpen(false)}>
          Close
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
};
