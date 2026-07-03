import { useEffect, useRef, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../Assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { FaAngleDown } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();

  const [sublinks, setSublinks] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSublinks(result.data.data);
    } catch (error) {
      console.log("could not fetch the category list");
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const mobileMenuRef = useRef(null);
  const mobileButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) {
      setMobileCatalogOpen(false);
    }
  }, [menuOpen]);

  const handleNavLinkClick = () => {
    setMenuOpen(false);
    setMobileCatalogOpen(false);
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-richblack-700 bg-richblack-900">
      <div className="mx-auto flex h-14 w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" width={160} height={162} loading="lazy" />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index} className="group relative">
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <FaAngleDown />
                    </div>

                    <div
                      className="invisible absolute left-1/2 top-full z-50 mt-2 flex w-60 -translate-x-1/2 flex-col rounded-md bg-richblack-5 p-2 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
                    >
                      {sublinks?.length ? (
                        sublinks.map((sublink, index) => (
                          <Link
                            to={`/catalog/${sublink?.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            key={index}
                            className="rounded px-3 py-2 text-sm hover:bg-richblack-50"
                          >
                            {sublink.name}
                          </Link>
                        ))
                      ) : (
                        <p className="px-3 py-2 text-sm">No categories available</p>
                      )}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link?.path}
                    className={`transition-colors duration-200 hover:text-yellow-25 ${
                      matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    {link.title}
                  </Link>
                )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-x-4 lg:flex">
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaCartArrowDown className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 grid h-5 min-w-5 place-items-center rounded-full bg-yellow-100 px-1 text-xs font-semibold text-richblack-900">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null ? (
            <>
              <Link to="/login">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>

        <button
          ref={mobileButtonRef}
          className="text-2xl text-richblack-25 lg:hidden"
          onClick={handleMenuToggle}
          aria-label="Toggle mobile menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-0 top-14 z-40 bg-black/40 lg:hidden" onClick={handleNavLinkClick} />
          <div
            ref={mobileMenuRef}
            className="fixed right-0 top-14 z-50 h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-l border-richblack-700 bg-richblack-900 p-6 lg:hidden"
          >
            <ul className="flex flex-col gap-2 text-richblack-25">
              {NavbarLinks.map((link, index) => {
                return (
                  <li key={index} className="rounded-md">
                    {link.title === "Catalog" ? (
                      <div>
                        <button
                          className="flex w-full items-center justify-between rounded-md px-3 py-2"
                          onClick={() => setMobileCatalogOpen((prev) => !prev)}
                        >
                          <span>{link.title}</span>
                          <FaAngleDown className={mobileCatalogOpen ? "rotate-180" : ""} />
                        </button>
                        {mobileCatalogOpen && (
                          <div className="mt-1 flex flex-col gap-1 pl-3">
                            {sublinks?.length ? (
                              sublinks.map((sublink, idx) => (
                                <Link
                                  key={idx}
                                  to={`/catalog/${sublink?.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded px-3 py-2 text-sm hover:bg-richblack-800"
                                  onClick={handleNavLinkClick}
                                >
                                  {sublink.name}
                                </Link>
                              ))
                            ) : (
                              <p className="px-3 py-2 text-sm">No categories available</p>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className="block rounded-md px-3 py-2 hover:bg-richblack-800"
                        onClick={handleNavLinkClick}
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-col gap-3">
              {user && user.accountType !== "Instructor" && (
                <Link to="/dashboard/cart" className="relative w-fit" onClick={handleNavLinkClick}>
                  <FaCartArrowDown className="text-2xl text-richblack-100" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 grid h-5 min-w-5 place-items-center rounded-full bg-yellow-100 px-1 text-xs font-semibold text-richblack-900">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}

              {token === null ? (
                <>
                  <Link to="/login" onClick={handleNavLinkClick}>
                    <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" onClick={handleNavLinkClick}>
                    <button className="w-full rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100">
                      Signup
                    </button>
                  </Link>
                </>
              ) : (
                <div className="w-fit">
                  <ProfileDropDown />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
