import {
  Alert,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Container,
  Link,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Form, Link as RouterLink, useNavigate } from "react-router-dom";
import LinearIndeterminate from "../component/LinearIndeterminate";
import useCart from "../hook/useCart";

const FormContainer = styled(Box)<BoxProps>(() => ({
  maxWidth: "400px",
  color: "black",
  backgroundColor: "#FFFBDA",
  margin: "3em auto",
}));

const FormTextField = styled(TextField)({
  marginTop: "1.5em",
  "& input:valid + fieldset": {
    borderColor: "black",
    borderWidth: 1,
  },
  "& input:hover": {
    borderColor: "#ED9455",
    borderWidth: 1,
  },
  "& input:invalid + fieldset": {
    borderColor: "red",
    borderWidth: 1,
  },
  "& input:valid:focus + fieldset": {
    borderColor: "#ED9455",
    borderLeftWidth: 4,
    padding: "4px !important", // override inline-style
  },
});

const FormButton = styled(Button)<ButtonProps>(() => ({
  color: "white",
  backgroundColor: "#ED9455",
  "&:hover": {
    backgroundColor: "#FE8344",
  },
  marginTop: "1.5rem",
  width: "100%",
}));

type InputType = {
  email: string;
  password: string;
};

const Login = () => {
  const {getCartOfUser} = useCart()
  const [isLoading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [statusAlert, setStatusAlert] = useState<{
    message: string;
    statusCode: number;
  }>({ message: "", statusCode: 0 });
  const navigator = useNavigate();
  const Validate = {
    email: {
      required: {
        value: true,
        message: "Please enter your email",
      },
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: "Please enter correct email format",
      },
    },
    password: {
      required: {
        value: true,
        message: "Please enter your password",
      },
      minLength: {
        value: 6,
        message: "Password is atleast 6 letters",
      },
    },
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<InputType> = async (data: InputType) => {
    console.log(data);
    try {
      setLoading(true);
      await fetch("http://localhost:3000/auth/signin", {
        body: JSON.stringify(data),
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((info) => {
          // handle login & redirect
          setTimeout(() => {
            if (info.statusCode == 400) {
              setStatusAlert(info);
              setStatus(true);
              setLoading(false);
              setTimeout(() => {
                setStatus(false);
              }, 4000);
            } else if (info.statusCode == 200) {
              localStorage.setItem("token", JSON.stringify(info.token));
              localStorage.setItem("user", JSON.stringify(info.user));
              getCartOfUser(info.user._id)
              setStatusAlert(info);
              setStatus(true);
              setLoading(false);
              setTimeout(() => {
                navigator("/");
              }, 3000);
            }
          }, 3000);
        });
    } catch (err) {
      // Alert Error
      setLoading(false);
      setStatus(true);
      console.error(err);
    }
  };
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {status && (
          <Alert
            variant="filled"
            severity={statusAlert.statusCode == 200 ? "success" : "error"}
            sx={{ width: "100%", maxWidth: "400px" }}
          >
            {statusAlert.message}
          </Alert>
        )}
      </Box>
      {isLoading && <LinearIndeterminate />}
      <Container maxWidth={"xl"} disableGutters>
        <FormContainer>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Box>
                  <FormTextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    type="text"
                    InputLabelProps={{ style: { color: "black" } }}
                    {...register("email", Validate.email)}
                    {...field}
                  />
                  <Box sx={{ height: "20px" }}>
                    {errors.email && (
                      <Typography color={"#ff1111"}>
                        {errors.email.message}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Box>
                  <FormTextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type="password"
                    InputLabelProps={{ style: { color: "black" } }}
                    {...register("password", Validate.password)}
                    {...field}
                  />
                  <Box sx={{ height: "20px" }}>
                    {errors.password && (
                      <Typography color={"#ff1111"}>
                        {errors.password.message}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            />
            <FormButton variant="contained" type="submit">
              Login
            </FormButton>
          </Form>
          <Box
            sx={{ display: "flex", justifyContent: "center", marginTop: "1em" }}
          >
            <Link
              component={RouterLink}
              to={"/register"}
              sx={{
                color: "black",
                textDecoration: "none",
                textAlign: "center",
              }}
            >
              Don't have account? Register now
            </Link>
          </Box>
        </FormContainer>
      </Container>
    </>
  );
};

export default Login;
