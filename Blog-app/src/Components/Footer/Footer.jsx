import React from "react";
import { Container, SVGSection } from "../index";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const arr = [
    {
      title: "Company",
      list: ["Features", "Pricing", "Affilitate marketing", "Press kit"],
    },
    {
      title: "Support",
      list: ["Account", "Help", "Contact us", "Customer support"],
    },
    {
      title: "Legals",
      list: ["Terms & Conditions", "Privacy Policy", "Licensing"],
    },
  ];

  return (
    // Footer
    <Container className="bg-gradient-to-r from-gray-100 to-gray-300">

      {/* SVG */}
      <SVGSection />
      <div className="h-72 grid grid-cols-5">
        <div className="col-span-2">
          <div className="mr-auto ml-0 mt-2 text-gray-800 text-4xl font-bold p-5 font-2">
            Blog app
          </div>
        </div>
        {/* Footer listing by using array map method on 'arr' */}
        {arr.map((obj) => (
          <div key={obj.title} className="p-5">
            <h1 className="mr-auto ml-0 text-2xl font-semibold p-5 font-2">
              {obj.title}
            </h1>
            <ul className="mr-auto ml-0 p-5">
              {obj.list.map((item) => (
                <li key={item} className="text-lg">
                  <Link to={`/${item.toLocaleLowerCase()}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Footer;
