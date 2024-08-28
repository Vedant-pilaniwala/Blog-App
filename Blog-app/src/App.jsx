import React, { useEffect, useState } from "react";
import { Container, Header, Footer } from "./Components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import services from "./appwrite/authServices";
import { login, logout } from "./Redux/Slice/authSlice";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  //Loading and authentication checking
  useEffect(() => {
    services
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  //  Building logic for loading
  if (isLoading) {
    return(
      // Loading... will be displayed if isLoading
      <div className="w-full h-full text-7xl mt-14 font-bold text-center p-5">
        Loading...
      </div>
    )
  } else {
    return (
      // Home page will be displayed if the page is loaded
      <Container>
        <Header />
        <main className="min-h-96">
          {/* components inside the <main> tag will be controlled by router  */}
          <Outlet>
            <h1 className="text-5xl text-center m-8 font-bold">Blog-app</h1>
          </Outlet>
        </main>
        <Footer />
      </Container>
    );
  }
}
