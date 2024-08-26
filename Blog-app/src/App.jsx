import React from "react";
import { Container, Header } from "./Components";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <Container>
      <Header />
      <Outlet>
        <h1 className="text-5xl text-center m-8 font-bold">Blog-app</h1>
      </Outlet>
    </Container>
  );
}
