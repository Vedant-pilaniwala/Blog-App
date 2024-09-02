import React, { useState } from "react";
import { Container, Button, Input } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import services from "../appwrite/authServices";
import { login } from "../Redux/Slice/authSlice";

function Signup() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFromSubmit = async (data) => {
    setError("");
    try {
      const userData = await services.createAccount(data);
      if (userData) {
        const userData = await services.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-2/5 h-auto p-7 mt-24 mx-auto bg-gradient-to-r from-gray-100 to-gray-300 rounded-lg shadow-2xl shadow-gray-600 mb-24">
        <Container className="mb-3">
          <div className="w-full mb-3 p-2">
            <h1 className="text-4xl text-gray-900 font-bold font-2 text-center">
              Blog-app
            </h1>
          </div>
          <div className="w-full p-3 justify-center">
            <span className="w-full mx-auto">
              <h1 className="text-center text-3xl font-medium">
                Sign up to your account
              </h1>
              <span className="flex justify-center  items-center p-2 mt-2">
                <p className="text-lg">
                  Already have an account?&nbsp;
                  <Link
                    to="/login"
                    className="text-blue-800 font-medium hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </span>
            </span>
          </div>
          {error && (
            <p className="text-red-600 text-lg mt-2 font-light text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit(onFromSubmit)}>
            <Input
              label="Username: "
              placeholder="Enter your username"
              type="text"
              {...register("username", {
                required: true,
              })}
            />
            <Input
              label="Email address: "
              placeholder="Enter your email-address"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email addres is not a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              className="w-full bg-gray-900 rounded-md text-white text-xl text-center p-2 hover:bg-gray-800"
              type="submit"
            >
              Signup
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default Signup;
