import React from "react";
import { Container, Logo, Logoutbtn } from "../index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const naitems = [
    {
      label: "Home",
      path: "/",
      active: true,
    },
    {
      label: "login",
      path: "/login",
      active: !isAuthenticated,
    },
    {
      label: "signup",
      path: "/signup",
      active: !isAuthenticated,
    },
    {
      label: "All posts",
      path: "/all-posts",
      active: isAuthenticated,
    },
    {
      label: "Add Posts",
      path: "/add-post",
      active: isAuthenticated,
    },
  ];

  return (
    <header className="py-3 px-10 shadow bg-gray-200 pr-100">
      <Container>
        <nav className="flex">
          <nav className="flex">
            <div className="mr-4">
              <Link
                to="/"
                className="text-2xl font-bold text-gray-900 hover:text-gray-800"
              >
                <Logo />
              </Link>
            </div>

            <ul className="inline-flex justify-end space-x-4 py-5 ">
              {naitems.map((item) =>
                item.active ? (
                  <li key={item.label}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full"
                    >
                      {item.label}
                    </button>
                  </li>
                ) : null
              )}
              {isAuthenticated && (
                <li>
                  <Logoutbtn />
                </li>
              )}
            </ul>
          </nav>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
