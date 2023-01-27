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

export const CVForm = ({ setOpen, reload, setReload, editMode, data }) => {
  const initialState = {
    image: "",
  };

  const [cV, setCV] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && data) {
      setCV({
        image: data.image,
      });
    }
  }, [editMode, data]);

  const handlecV = (e) => {
    if (e.target.name === "image") {
      setCV({
        ...cV,
        image: e.target.files[0],
      });
    } else {
      setCV({
        ...cV,
        [e.target.name]: e.target.value,
      });
    }
  };

  const docRef = doc(collection(firebaseDb, "myproject"));

  const createimage = () => {
    if (cV.image === "" || cV.title === "" || cV.description === "") {
      enqueueSnackbar("Empty field detected !", {
        variant: "error",
      });
    } else if (editMode) {
      const docRefUpdate = doc(firebaseDb, "myproject", data?.id);
      const file = cV.image;
      const storageRef = ref(fireStorage, `myproject/${file.name}`);
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
              ...cV,
              image: downloadUrl,
              createdAt: new Date(),
            })
              .then((res) => {
                enqueueSnackbar("Project has been updated successfully", {
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
      const file = cV.image;
      const storageRef = ref(fireStorage, `myproject/${file.name}`);
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
              ...cV,
              image: downloadUrl,
              id: docRef.id,
              createdAt: Date.now(),
            })
              .then((res) => {
                enqueueSnackbar("Project has been created successfully", {
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
            Project Title
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          name="title"
          placeholder="Project Title Here.."
          onChange={handlecV}
        />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Project Link
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          name="link"
          placeholder="Project Link Here.."
          onChange={handlecV}
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
          onChange={handlecV}
        />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            Project Description
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          name="description"
          placeholder="Project Description Here ..."
          onChange={handlecV}
        />
      </SoftBox>
      <SoftBox mt={4} mb={1}>
        <LoadingButton
          title={editMode ? "Update Navbar Title" : "Create Navbar Title"}
          loading={loading}
          action={createimage}
        />
        &nbsp;
        <SoftButton variant="gradient" color="error" onClick={() => setOpen(false)}>
          Close
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
};
