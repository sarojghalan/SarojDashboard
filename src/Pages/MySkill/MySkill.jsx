import { useState } from "react";
import Card from "@mui/material/Card";
import { Icon } from "@mui/material";

import MyModal from "components/Modal/Modal";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import { MySkillTable } from "./MySkillTable";
import { MySkillForm } from "./MySkillForm";

export const MySkill = () => {
  const [reload, setReload] = useState(false);

  const { columns, rows } = MySkillTable({ reload, setReload });
  const [openForm, setOpenForm] = useState(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">My Skill</SoftTypography>
              <SoftButton color="success" onClick={() => setOpenForm(true)}>
                New
                <Icon>add</Icon>
              </SoftButton>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>

      {/* New Class Modal */}
      <MyModal open={openForm} setOpen={setOpenForm} height="100vh">
        <SoftTypography
          color="success"
          fontWeight="bolder"
          textTransform="uppercase"
          textAlign="center"
        >
          Create New Skill
        </SoftTypography>
        <MySkillForm setOpen={setOpenForm} reload={reload} setReload={setReload} />
      </MyModal>
    </DashboardLayout>
  );
};
