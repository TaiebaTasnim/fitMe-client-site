import  { useContext, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import useRole from "../../hooks/useRole";


export const ComplexNavbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, signout } = useContext(AuthContext);
  const [role]=useRole()
  const navigate=useNavigate()

  const handlesignout = () => {
    signout()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/login")
      })
      .catch((error) => {
        toast.error(`Logout failed: ${error.message}`);
      });
  };

  return (
    <div className="bg-black text-white">
      <Navbar className="mx-auto container w-[90%] p-4 bg-black border-none">
        <div className="flex items-center justify-between">
          <Typography
            variant="h5"
            as="a"
            href="#"
            className="cursor-pointer flex gap-2 text-[25px]"
          >
            <img
              src="/logo-web.webp"
              alt="logo"
              className="h-10 w-10 bg-black rounded-full"
            />
            FitMe
          </Typography>
          <div className="hidden lg:flex gap-4">
            
              <NavLink
                
                to="/"
                // to={`/${item.replace(" ", "")}`}
                className={({ isActive }) =>
                  isActive ? "text-[#abc502] px-4 py-2" : "text-white px-4 py-2"
                }
              >
                <Typography  className="hover:underline">
                  Home
                </Typography>
              </NavLink>
              
              <NavLink
                
              to="/allTrainers"
              // to={`/${item.replace(" ", "")}`}
              className={({ isActive }) =>
                isActive ? "text-[#abc502] px-4 py-2" : "text-white px-4 py-2"
              }
            >
              
              
            
              <Typography  className="hover:underline">
                All Trainers
              </Typography>
            </NavLink>
            
            <NavLink
            
            to="/allClasses"
           
            className={({ isActive }) =>
              isActive ? "text-[#abc502] px-4 py-2" : "text-white px-4 py-2"
            }
          >
            <Typography className="hover:underline">
              All Classes
            </Typography>
          </NavLink>

            
           
          <NavLink
          
          
          to="/forum"
          className={({ isActive }) =>
            isActive ? "text-[#abc502] px-4 py-2" : "text-white px-4 py-2"
          }
        >
          <Typography  className="hover:underline">
            Community
          </Typography>
        </NavLink>
           
          </div>
          <div className="flex items-center">
            <div className="flex gap-0 lg:flex items-center lg:gap-4">
              {user ? (
                <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                  <MenuHandler>
                    <Button variant="text" className="flex items-center gap-2">
                      <Avatar
                        variant="circular"
                        size="sm"
                        src={user?.photoURL}
                      />
                      <ChevronDownIcon
                        strokeWidth={2}
                        className={`h-4 w-4 text-white ${isMenuOpen ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </MenuHandler>
                  <MenuList>
                  <MenuItem>
                  {role==="admin" && <Link to="dashboard/balance"><Button
                        
                        variant="text"
                        className="w-full text-left"
                      >
                       Dashboard
                        
                      </Button></Link>}
                      {role==="member" && <Link to={`/dashboard/profile/${user?.email}`}><Button
                        
                        variant="text"
                        className="w-full text-left"
                      >
                       Dashboard
                        
                      </Button></Link>}
                      {role==="trainer" && <Link to="/dashboard/manageSlots"><Button
                        
                        variant="text"
                        className="w-full text-left"
                      >
                       Dashboard
                        
                      </Button></Link>}
                     {/* <Link to="dashboard"><Button
                        
                        variant="text"
                        className="w-full text-left"
                      >
                       Dashboard
                        
                      </Button></Link> */}
                      
                    </MenuItem>
                    {/* {profileMenuItems.map(({ label, icon }, key) => (
                      <MenuItem key={key} onClick={() => setIsMenuOpen(false)}>
                        {React.createElement(icon, { className: "h-4 w-4" })}
                        <Typography
                          variant="small"
                          className="text-black px-4 py-2"
                        >
                          {label}
                        </Typography>
                      </MenuItem>
                    ))} */}
                    <MenuItem>
                      <Button
                        onClick={handlesignout}
                        variant="text"
                        className="w-full text-left"
                      >
                        Sign Out
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link to="/login">
                  <Button size="sm" variant="outlined" className="text-white border-white border-2">
                    Log In
                  </Button>
                </Link>
              )}
            </div>
            <IconButton
              variant="text"
              className="lg:hidden"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <Bars2Icon className="h-6 w-6 text-white" />
            </IconButton>
          </div>
        </div>
        <Collapse open={isNavOpen}>
          <div className="flex flex-col gap-2">
          <NavLink
                
                to="/"
                // to={`/${item.replace(" ", "")}`}
                className={({ isActive }) =>
                  isActive ? "text-[#abc502] px-4 py-2" : "text-white px-4 py-2"
                }
              >
                <Typography  className="hover:underline">
                  Home
                </Typography>
              </NavLink>
              
              <NavLink
                
              to="/allTrainers"
              
              className={({ isActive }) =>
                isActive ? "text-[#abc502] px-4 py-2" : "text-white px-4 py-2"
              }
            >
              
              
            
              <Typography  className="hover:underline">
                All Trainers
              </Typography>
            </NavLink>
            
            <NavLink
            
            to="/allClasses"
           
            className={({ isActive }) =>
              isActive ? "text-[#abc502] px-4 py-2" : "text-white px-4 py-2"
            }
          >
            <Typography className="hover:underline">
              All Classes
            </Typography>
          </NavLink>

            
           
          <NavLink
          
          
          to="/forum"
          className={({ isActive }) =>
            isActive ? "text-[#abc502] px-4 py-2" : "text-white px-4 py-2"
          }
        >
          <Typography  className="hover:underline">
            Community
          </Typography>
        </NavLink>
            
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
};
