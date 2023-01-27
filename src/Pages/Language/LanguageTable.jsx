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
import { LanguageForm } from "./LanguageForm";

export const LanguageTable = ({reload , setReload}) => {
    const [languageData , setLanguageData] = useState([]);

    useEffect(() => {
        const q = query(collection(firebaseDb, "language"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const language = [];
          querySnapshot.forEach((doc) => {
            language.push(doc.data());
          });
          setLanguageData(language);
        });
      }, []);

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
                Edit Language
              </SoftTypography>
    
              <LanguageForm
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
    
        const deleteLanguage = async () => {
          const deleteRef = doc(firebaseDb, "language", data?.id);
          await deleteDoc(deleteRef)
            .then((res) => {
              enqueueSnackbar("Project has been deleted successfulyy", { variant: "success" });
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
                Delete Language
              </SoftTypography>
              <SoftTypography color="dark" fontWeight="normal" textTransform="uppercase" mb={2}>
                Do you want to remove this Language?
              </SoftTypography>
              <LoadingButton
                title="confirm"
                loading={loading}
                color="success"
                action={deleteLanguage}
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
        { name: "Title", align: "center" },
        { name: "image", align: "left" },
        { name: "Action", align: "left" },
      ];

      const temp = [0, 1, 2, 3].map((item) => ({
        "S.No": <Skeleton animation="wave" width={50} />,
        "Title": <Skeleton animation="wave" width={50} />,
       "image": <Skeleton animation="wave" width={50} />,
        Action: <Skeleton animation="wave" width={50} />,
      }));
      const [rows, setRows] = useState(temp);

          useEffect(() => {
            if (languageData !== []) {
              let temp = [];
              for (let i = 0; i < languageData.length; i++) {
                let classData = languageData[i];
                temp.push({
                  "S.No": (
                    <SoftTypography variant="caption" color="secondary" fontWeight="medium">
                      {i + 1}
                    </SoftTypography>
                  ),
                  "Title": <Description name={classData?.title} />,
                  "image": <Author image={classData?.image} />,
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
          }, [languageData]);


    return{
        columns , rows
    }
}