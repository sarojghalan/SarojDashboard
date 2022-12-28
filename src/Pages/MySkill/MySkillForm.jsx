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

export const MySkillForm = ({ setOpen, reload, setReload, editMode, data }) => {
  const initialState = {
    skill: "",
    description:""
  };
  const [mySkill, setMySkill] = useState(initialState);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editMode && data) {
      setMySkill({
        skill: data.skill,
        description: data.description
      });
    }
  }, [editMode, data]);

  const handleSkill = (e) => {
    setMySkill({ ...mySkill, [e.target.name]: e.target.value });
  };

  const docRef = doc(collection(firebaseDb, "myskill"));

  const createSkill = () => {
    if (mySkill.title === "" || mySkill.description === "") {
      enqueueSnackbar("Empty Filed Detected ! Please Fill Up", { variant: "error" });
    } else if(editMode){
        const docRefUpdate = doc(firebaseDb, "myskill",data?.id);
        updateDoc(docRefUpdate, { ...mySkill}).then((res) => {
            enqueueSnackbar("Your skill has been updated successfully", {
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
      setDoc(docRef, { ...mySkill, id: docRef.id })
        .then((res) => {
          enqueueSnackbar("Your Skill has been created successfully", {
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
            Skill Title
            <Required />
          </SoftTypography>
        </SoftBox>
        <SoftInput
          type="text"
          placeholder="Enter here..."
          required
          name="skill"
          value={mySkill.skill}
          onChange={handleSkill}
        />
      </SoftBox>
      <SoftBox mb={2}>
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Description
                <Required />
              </SoftTypography>
            </SoftBox>
            <SoftInput
              placeholder="Type here..."
              multiline
              rows={5}
              name="description"
              value={mySkill.description}
              onChange={handleSkill}
            />
          </SoftBox>
      <SoftBox mt={4} mb={1}>
        <LoadingButton
          title={editMode ? "Update Navbar Title" : "Create Navbar Title"}
          loading={loading}
          action={createSkill}
        />
        &nbsp;
        <SoftButton variant="gradient" color="error" onClick={() => setOpen(false)}>
          Close
        </SoftButton>
      </SoftBox>
    </SoftBox>
  );
};
