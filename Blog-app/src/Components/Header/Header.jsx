import React from "react";
import { Container, Button, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.authStatus);
  const navigate = useNavigate();

  const routingPages = [
    {
      name: "Home",
      slug: "/",
      status: true,
    },
    {
      name: "Login",
      slug: "/login",
      status: !isAuthenticated,
    },
    {
      name: "Signup",
      slug: "/signup",
      status: !isAuthenticated,
    },
    {
      name: "All-posts",
      slug: "/allposts",
      status: isAuthenticated,
    },
    {
      name: "Add-posts",
      slug: "/addposts",
      status: isAuthenticated,
    },
  ];

  return (
    <Container className="h-auto">
      {/* background-image */}
      <Container className='h-96 flex justify-center items-center bg-cover bg-no-repeat bg-[url("https://cdn.pixabay.com/photo/2015/10/02/15/00/diary-968592_1280.jpg")] z-0'>
        {/* background opacity */}
        <a
          href=""
          className="absolute h-96 w-full top-0 left-0 z-10 opacity-40 bg-black"
        />
        <div className="z-20 mx-auto w-full text-center">
          <h1 className="text-white text-8xl font-1">Blog app</h1>
        </div>
      </Container>

      {/* navbar */}
      <Container className="h-28 bg-gradient-to-r from-gray-100 to-gray-300">
        <nav className="w-full h-full flex justify-end items-center">
          <ul className="w-full h-full flex justify-end items-center">
            <div className="mr-auto ml-0 text-4xl font-bold p-5 font-2">
              Blog app
            </div>

            {routingPages.map((page) => {
              if (page.status) {
                return (
                  <NavLink
                    className={({ isActive }) =>
                      `hover:bg-gray-100/40 h-full flex justify-center itmes-center w-1/6 p-0 font-2
                    ${
                      isActive
                        ? "text-black font-semibold text-3xl bg-gray-100/60"
                        : "text-gray-700 font-medium text-2xl bg-transparent"
                    }`
                    }
                    to={page.slug}
                  >
                    <li
                      key={page.name}
                      className="bg-transparent flex items-center"
                    >
                      <Button styles="p-5">{page.name}</Button>
                    </li>
                  </NavLink>
                );
              }
            })}

            {/* Logout button */}
            {isAuthenticated && (
              <li className="bg-transparent flex items-center text-2xl text-gray-700 font-medium hover:bg-gray-100/40 h-full justify-center itmes-center w-1/6 p-0 font-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </Container>
  );
}

export default Header;
