import MyModal from "components/Modal/Modal";
import { useState, useEffect, useContext } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";
import Icon from "@mui/material/Icon";
import Skeleton from "@mui/material/Skeleton";
import { useSnackbar } from "notistack";
import LoadingButton from "components/LoadingButton";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import firebaseDb from "config/firebase-config";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { MasterBannerForm } from "./MasterBannerForm";

export const MasterBannerTable = ({reload , setReload}) => {
    const [masterBannerData , setMasterBannerData] = useState([]);

    useEffect(() => {
        const q = query(collection(firebaseDb, "masterBanner"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const banner = [];
          querySnapshot.forEach((doc) => {
            banner.push(doc.data());
          });
          setMasterBannerData(banner);
        });
      }, []);

      console.log("Master Banner Data : ",masterBannerData)

      function Author({ image }) {
        return (
          <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="button" fontWeight="medium">
            <SoftAvatar src={image} alt="masterBanner" size="sm" variant="rounded" />
            </SoftTypography>
          </SoftBox>
        );
      }
      function Description({ name }) {
        return (
          <SoftBox display="flex" flexDirection="column">
            <SoftTypography variant="button" fontWeight="medium">
            {name}
            </SoftTypography>
          </SoftBox>
        );
      }

      function EditAction({ reload, setReload, data }) {
        const [openEdit, setOpenEdit] = useState(false);
    
        return (
          <>
            <SoftBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
              <SoftBox mr={1}>
                <SoftButton variant="text" color="primary" onClick={() => setOpenEdit(true)}>
                  <Icon>edit</Icon>&nbsp;Edit
                </SoftButton>
              </SoftBox>
            </SoftBox>
            <MyModal open={openEdit} setOpen={setOpenEdit} height="100vh">
              <SoftTypography
                color="success"
                fontWeight="bolder"
                textTransform="uppercase"
                textAlign="center"
              >
                Edit Master Banner
              </SoftTypography>
    
              <MasterBannerForm
                editMode={true}
                setOpen={setOpenEdit}
                data={data}
                reload={reload}
                setReload={setReload}
              />
            </MyModal>
          </>
        );
      }
    
      function DeleteAction({ data, reload, setReload }) {
        const [openDelete, setOpenDelete] = useState(false);
        const [loading, setLoading] = useState(false);
        const { enqueueSnackbar } = useSnackbar();
    
        const deleteSkill = async () => {
          const deleteRef = doc(firebaseDb, "masterBanner", data?.id);
          await deleteDoc(deleteRef)
            .then((res) => {
              enqueueSnackbar("Master Banner has been deleted successfulyy", { variant: "success" });
            })
            .catch((err) => {
              enqueueSnackbar("Error Occured !!! Try Again", { variant: "error" });
              console.log(err);
            });
        };
    
        return (
          <>
            <SoftBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
              <SoftBox mr={1}>
                <SoftButton variant="text" color="error" onClick={() => setOpenDelete(true)}>
                  <Icon>delete</Icon>&nbsp;Delete
                </SoftButton>
              </SoftBox>
            </SoftBox>
            <MyModal open={openDelete} setOpen={setOpenDelete}>
              <SoftTypography
                color="error"
                fontWeight="bolder"
                textTransform="uppercase"
                textAlign="center"
                mb={2}
              >
                Delete Skill
              </SoftTypography>
              <SoftTypography color="dark" fontWeight="normal" textTransform="uppercase" mb={2}>
                Do you want to remove this Skill?
              </SoftTypography>
              <LoadingButton
                title="confirm"
                loading={loading}
                color="success"
                action={deleteSkill}
                size="small"
              />
              &nbsp;
              <SoftButton color="error" onClick={() => setOpenDelete(false)} size="small">
                Cancel
              </SoftButton>
            </MyModal>
          </>
        );
      }

      const columns = [
        { name: "S.No", align: "center" },
        { name: "Master Banner", align: "left" },
        { name: "Description", align: "left" },
        { name: "Action", align: "left" },
      ];

      const temp = [0, 1, 2, 3].map((item) => ({
        "S.No": <Skeleton animation="wave" width={50} />,
       "Master Banner": <Skeleton animation="wave" width={50} />,
       "Description": <Skeleton animation="wave" width={50} />,
        Action: <Skeleton animation="wave" width={50} />,
      }));
      const [rows, setRows] = useState(temp);

          useEffect(() => {
            if (masterBannerData !== []) {
              let temp = [];
              for (let i = 0; i < masterBannerData.length; i++) {
                let classData = masterBannerData[i];
                temp.push({
                  "S.No": (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                      {i + 1}
                    </SoftTypography>
                  ),
                  "Master Banner": <Author image={classData?.masterBanner} />,
                  "Description": <Description name={classData?.description} />,
                  Action: (
                    <>
                      <>
                        <SoftBox
                          display="flex"
                          alignItems="center"
                          mt={{ xs: 2, sm: 0 }}
                          ml={{ xs: -1.5, sm: 0 }}
                        >
                          <SoftBox>
                            <EditAction data={classData} reload={reload} setReload={setReload} />
                          </SoftBox>
        
                          <SoftBox>
                            <DeleteAction data={classData} reload={reload} setReload={setReload} />
                          </SoftBox>
                        </SoftBox>
                      </>
                    </>
                  ),
                });
              }
              setRows(temp);
            }
          }, [masterBannerData]);


    return{
        columns , rows
    }
}