import MyModal from "components/Modal/Modal";
import { useState, useEffect, useContext } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Icon from "@mui/material/Icon";
import Skeleton from "@mui/material/Skeleton";
import { useSnackbar } from "notistack";
import LoadingButton from "components/LoadingButton";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";
import firebaseDb from "config/firebase-config";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { MyServiceForm } from "./MyServiceForm";

export const MyServiceTable = ({ reload, setReload }) => {
  const [myServiceData, setMyServiceData] = useState([]);

  useEffect(() => {
    const q = query(collection(firebaseDb, "myservice"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const service = [];
      querySnapshot.forEach((doc) => {
        service.push(doc.data());
      });
      setMyServiceData(service);
    });
  }, []);

  console.log("navbar list : ",myServiceData)

  function Author({ name }) {
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
            Edit Navbar List
          </SoftTypography>

          <MyServiceForm
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

    const deleteMyService = async () => {
      const deleteRef = doc(firebaseDb, "myservice", data?.id);
      await deleteDoc(deleteRef)
        .then((res) => {
          enqueueSnackbar("My Service has been deleted successfulyy", { variant: "success" });
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
            Delete Navbar List
          </SoftTypography>
          <SoftTypography color="dark" fontWeight="normal" textTransform="uppercase" mb={2}>
            Do you want to remove this Service?
          </SoftTypography>
          <LoadingButton
            title="confirm"
            loading={loading}
            color="success"
            action={deleteMyService}
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
    { name: "Service Title", align: "left" },
    { name: "Service Description", align: "left" },
    { name: "Description Topic", align: "left" },
    { name: "Action", align: "left" },
  ];

  const temp = [0, 1, 2, 3].map((item) => ({
    "S.No": <Skeleton animation="wave" width={50} />,
    "Service Title": <Skeleton animation="wave" width={50} />,
    "Service Description": <Skeleton animation="wave" width={50} />,
    "Description Topic": <Skeleton animation="wave" width={50} />,
    Action: <Skeleton animation="wave" width={50} />,
  }));

  const [rows, setRows] = useState(temp);

  useEffect(() => {
    if (myServiceData !== []) {
      let temp = [];
      for (let i = 0; i < myServiceData.length; i++) {
        let classData = myServiceData[i];
        temp.push({
          "S.No": (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {i + 1}
            </SoftTypography>
          ),
          "Service Title": <Author name={classData?.title} />,
          "Service Description": <Author name={classData?.description.substring(0,20)} />,
          "Description Topic": <Author name={classData?.description_title} />,
          Action: (
            <>
              <>
                <SoftBox
                  display="flex"
                  alignItems="center"
                  mt={{ xs: 2, sm: 0 }}
                  ml={{ xs: -1.5, sm: 0 }}
                >
                  <SoftBox>{/* <StartAction data={classData} /> */}</SoftBox>
                  <SoftBox>
                    <EditAction data={classData} reload={reload} setReload={setReload} />
                  </SoftBox>

                  <SoftBox>
                    <DeleteAction
                      data={classData}
                      reload={reload}
                      setReload={setReload}
                    />
                  </SoftBox>
                </SoftBox>
              </>
            </>
          ),
        });
      }
      setRows(temp);
    }
  }, [myServiceData]);

  return {
    columns,
    rows
  };
};
