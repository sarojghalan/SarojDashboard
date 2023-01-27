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

export const MyProjectForm = ({ setOpen, reload, setReload, editMode, data }) => {
  const initialState = {
    title:"",
    image: "",
    description: "",
    link:"",
    myPart:""
  };

  const [projectData, setProjectData] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => { 
    if (editMode && data) {
      setProjectData({
        image: data.image,
        description: data.description,
        title: data.title,
        link: data.link,
        myPart:data.myPart
      });
    }
  }, [editMode, data]);

  console.log("data are : ",data)

  const handleProjectData = (e) => {
    if (e.target.name === "image") {
      setProjectData({
        ...projectData,
        image: e.target.files[0],
      });
    } else {
      setProjectData({
        ...projectData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const docRef = doc(collection(firebaseDb, "myproject"));

  const createimage = () => {
    if (projectData.image === "" || projectData.title === "" || projectData.description === "") {
      enqueueSnackbar("Empty field detected !", {
        variant: "error",
      });
    } else if (editMode) {
      const docRefUpdate = doc(firebaseDb, "myproject", data?.id);
      const file = projectData.image;
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
              ...projectData,
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
      const file = projectData.image;
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
              ...projectData,
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
          value={projectData.title}
          placeholder="Project Title Here.."
          onChange={handleProjectData}
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
          value={projectData.link}
          placeholder="Project Link Here.."
          onChange={handleProjectData}
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
          value={projectData.imaage}
          placeholder="Input File Here.."
          onChange={handleProjectData}
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
          value={projectData.description}
          placeholder="Project Description Here ..."
          onChange={handleProjectData}
        />
      </SoftBox>
      <SoftBox mb={2}>
        <SoftBox mb={1} ml={0.5}>
          <SoftTypography component="label" variant="caption" fontWeight="bold">
            What You have done 
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          name="myPart"
          value={projectData.myPart}
          placeholder="Project Description Here ..."
          onChange={handleProjectData}
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
