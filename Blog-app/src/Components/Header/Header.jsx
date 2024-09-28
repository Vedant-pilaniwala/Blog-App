import React from "react";
import { Container, Button, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.authStatus);

  // For shortening of coder building an array which can be mapped and used while rendering component
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
      <Container className='h-96 bg-fixed top-28 z-0 flex justify-center items-center bg-cover bg-no-repeat bg-[url("https://cdn.pixabay.com/photo/2015/10/02/15/00/diary-968592_1280.jpg")]'>
        {/* background opacity */}
        <a
          href={null}
          className="h-96 w-full absolute top-0 left-0 z-20 opacity-40 bg-black"
        />
        <div className="z-20 mx-auto w-full text-center">
          <h1 className="text-white text-8xl font-1">Blog app</h1>
        </div>
      </Container>

      {/* navbar */}
      <Container
        className={`h-28 shadow-2xl shadow-gray-400 bg-gradient-to-r from-gray-100 to-gray-300 `}
      >
        <nav className="w-full h-full flex justify-end items-center">
          <ul className="w-full h-full flex justify-end items-center">
            <div className="mr-auto ml-0 text-4xl font-bold p-5 font-2">
              Blog app
            </div>

            {routingPages.map((page) => {
              if (page.status) {
                return (
                  <NavLink
                    key={page.name}
                    className={({ isActive }) =>
                      `hover:bg-gray-100/40 h-full flex justify-center itmes-center w-1/6 p-0 font-2
                    ${isActive
                        ? "text-black font-semibold text-2xl bg-gray-100/60"
                        : "text-gray-700 font-medium text-xl bg-transparent"
                      }`
                    }
                    to={page.slug}
                  >
                    <li className="bg-transparent flex items-center">
                      <Button styles="p-5 outline-none">{page.name}</Button>
                    </li>
                  </NavLink>
                );
              }
            })}

            {/* Logout button */}
            {isAuthenticated && (
              <li
                key="logout"
                className="bg-transparent flex items-center text-2xl text-gray-700 font-medium hover:bg-gray-100/40 h-full justify-center itmes-center w-1/6 p-0 font-2"
              >
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
