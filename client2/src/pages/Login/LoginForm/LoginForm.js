import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import { validationSchema } from "./utils/validationSchema";

function LoginForm({ handleLogin, error }) {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (regObj) => {
      handleLogin(regObj);
    },
  });

  return (
    <form
      className="register_form"
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <Stack spacing={3}>
        <TextField
          style={{ width: 405 }}
          autoComplete="username"
          type="email"
          label="Email address"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {error ? (
          <span style={{ align: "center", color: "red" }}>
            Incorect email or password
          </span>
        ) : (
          ""
        )}

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={formik.values.email === "" || formik.values.password === ""}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
}

export default LoginForm;
