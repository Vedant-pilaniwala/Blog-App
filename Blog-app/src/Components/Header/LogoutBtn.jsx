import React from "react";
import { Button } from "../index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Slice/authSlice";
import services from "../../appwrite/authServices";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = () => {
    services
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .finally(() => {
        navigate("/");
      });
  };

  return (
    <Button onClick={handleOnClick} styles="p-5 outline-none">
      Logout
    </Button>
  );
}

export default LogoutBtn;
