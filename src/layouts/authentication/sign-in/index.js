/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useContext, useState } from "react";

// react-router-dom components
import { Link, NavLink } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { Signapi } from "./Signapi";
import { ValidEmail } from "helpers/validators";
import { useNavigate } from "react-router-dom";
import { UserContext } from "context/user";
import { useSnackbar } from "notistack";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, loading, setLoading } = useContext(UserContext);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [response, setResponse] = useState({
    success: null,
    error: null,
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      enqueueSnackbar("Empty Field Detected", { variant: "error" });
    } else if (ValidEmail(email) === false) {
      enqueueSnackbar("Invalid email ", {variant: "error"})
    } else {
      setLoading(true);
      await Signapi.getsignin({
        email: email,
        password: password,
      })
        .then((res) => {
          // console.log("Role", res.data.data.user.roles[0].name);
          if (res.data.status === true) {
            setResponse({
              success: " login successfully ",
              error: null,
            });

            setUser(res.data.data);

            navigate("/dashboard");
            setEmail("");
            setPassword("");
          } else {
            setResponse({
              success: null,
              error: res.data.message,
            });
          }
        })
        .catch((error) => {
          if (error?.response?.data) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
          } else {
            enqueueSnackbar("Failed to login");
          }
        });

      setLoading(false);
    }
    setTimeout(() => {
      setResponse({
        success: null,
        error: null,
      });
    }, 5000);
  };
  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </SoftBox>

        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" onClick={submit} fullWidth disabled={loading}>
            {loading ? "..." : "sign in"}
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
