import {
  Alert,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import LinearIndeterminate from "../component/LinearIndeterminate";
import useCart from "../hook/useCart";

const FormContainer = styled(Box)<BoxProps>(() => ({
  width: "100%",
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
}));

type InputType = {
  email: string;
  username: string;
  password: string;
  confirmpassword:string
};

const Register = () => {
  const {createNewCart} = useCart()
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
    username: {
      required: {
        value: true,
        message: "Please enter your name",
      },
      minLength:{
        value: 3,
        message: "Name must be more than 3 letters"
      }
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
    confirmpassword: {
      required: {
        value: true,
        message: "Please enter your password",
      },
      validate: (val: string) => {
        if (watch('password') != val) {
          return "Your passwords do no match";
        }
      },
      
    }
  };
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>(
    {
      defaultValues: {
        email: "",
        username: "",
        password: "",
        confirmpassword:""
      },
    }
  );
  const onSubmit: SubmitHandler<InputType> = async (data: InputType) => {
    console.log(data);
    try {
      setLoading(true);
      await fetch("http://localhost:3000/auth/signup", {
        body: JSON.stringify(data),
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((info) => {
          console.log(info);

          setTimeout(() => {
            if (info.statusCode == 400) {
              setStatusAlert(info);
              setStatus(true);
              setLoading(false);
              setTimeout(() => {
                setStatus(false);
              }, 4000);
            } else if (info.statusCode == 200) {
              setStatusAlert(info);
              // create new user's new cart
              createNewCart(info.data._id)
              setStatus(true);
              setLoading(false);
              setTimeout(() => {
                navigator("/login");
              }, 3000);
            }
          }, 3000);
        });
    } catch (err) {
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
            name="username"
            control={control}
            render={({ field }) => (
              <Box>
                <FormTextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  type="text"
                  InputLabelProps={{ style: { color: "black" } }}
                  {...register("username", Validate.username)}
                  {...field}
                />
                <Box sx={{ height: "20px" }}>
                  {errors.username && (
                    <Typography color={"#ff1111"}>
                      {errors.username.message}
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
          <Controller
            name="confirmpassword"
            control={control}
            render={({ field }) => (
              <Box>
                <FormTextField
                  fullWidth
                  label="Confirm password"
                  variant="outlined"
                  type="password"
                  InputLabelProps={{ style: { color: "black" } }}
                  {...register("confirmpassword", Validate.confirmpassword)}
                  {...field}
                />
                <Box sx={{ height: "20px" }}>
                  {errors.confirmpassword && (
                    <Typography color={"#ff1111"}>
                      {errors.confirmpassword.message}
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          />
          <FormButton variant="contained" type="submit">
            Register
          </FormButton>
        </Form>
      </FormContainer>
    </>
  );
};

export default Register;
