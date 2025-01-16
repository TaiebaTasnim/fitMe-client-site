import React from "react";
import {
  Navbar,
  MobileNav,
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
  UserCircleIcon,
  CubeTransparentIcon,
  CodeBracketSquareIcon,
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";

const profileMenuItems = [
  { label: "Dashboard", icon: UserCircleIcon },
  { label: "Edit Profile", icon: CubeTransparentIcon },
  { label: "Sign Out", icon: CodeBracketSquareIcon },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button variant="text" className="flex items-center gap-2">
          <Avatar
            variant="circular"
            size="sm"
            src="https://via.placeholder.com/150"
          />
          <ChevronDownIcon
            strokeWidth={2}
            className={`h-4 w-4 text-white ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList>
        {profileMenuItems.map(({ label, icon }, key) => (
         <div  key={key} >
             <MenuItem onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-4">
            {React.createElement(icon, { className: "h-4 w-4 " })}
            <NavLink to="/dashboard" className={({ isActive }) =>
              isActive
                ? " text-[#abc502] px-4 py-2 "
                : "text-black  px-4 py-2"
            }>
               <Typography variant="small" className="">
              {label}
            </Typography>
              
            </NavLink>
           
          </MenuItem>
         </div>
        ))}
      </MenuList>
    </Menu>
  );
}

export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  return (
      
    <div className="bg-black text-white">
      <Navbar className="mx-auto container w-[90%] p-4 bg-black border-none ">
      <div className="flex items-center justify-between">
        <Typography variant="h5" as="a" href="#" className="cursor-pointer flex gap-2 text-[25px]">
            <img src="/logo-web.webp" alt="logo" className="h-10 w-10 bg-black rounded-full"/>
          FitMe
        </Typography>
        <div className="hidden lg:flex gap-4">
        <NavLink to="/" className={({ isActive }) =>
              isActive
                ? " text-[#abc502] px-4 py-2 "
                : "text-white  px-4 py-2"
            }>
              <Typography as="a" href="#" className="hover:underline">
            Home
          </Typography>
            </NavLink>
            
            <NavLink to="/allTrainer" className={({ isActive }) =>
              isActive
                ? " text-[#abc502] px-4 py-2 "
                : "text-white  px-4 py-2"
            }>
              <Typography as="a" href="#" className="hover:underline">
            All Trainer
          </Typography>
            </NavLink>
            <NavLink to="/allClasses" className={({ isActive }) =>
              isActive
                ? " text-[#abc502] px-4 py-2 "
                : "text-white  px-4 py-2"
            }>
              <Typography as="a" href="#" className="hover:underline">
            All Classes
          </Typography>
            </NavLink>
            <NavLink to="/community" className={({ isActive }) =>
              isActive
                ? " text-[#abc502] px-4 py-2 "
                : "text-white  px-4 py-2"
            }>
              <Typography as="a" href="#" className="hover:underline">
            Community
          </Typography>
            </NavLink>
        </div>
        <div className="flex items-center">
        
        <div className="flex gap-0 lg:flex items-center lg:gap-4 ">
          <Link to="/login">
          <Button size="sm" variant="outlined" className="text-white border-white border-2">
            Log In
          </Button>
          </Link>
          <ProfileMenu />
        </div>
        <IconButton
          variant="text"
          className="lg:hidden  "
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <Bars2Icon className="h-6 w-6 text-white" />
        </IconButton>

        </div>
        
      </div>
      <MobileNav open={isNavOpen}>
        <div className="flex flex-col gap-2">
        <NavLink to="/" className={({ isActive }) =>
              isActive
                ? " text-[#abc502] px-4 py-2 "
                : "text-white  px-4 py-2"
            }>
              <Typography as="a" href="#" className="hover:underline">
            Home
          </Typography>
            </NavLink>
            
            <NavLink to="/allTrainer" className={({ isActive }) =>
              isActive
                ? " text-[#abc502] px-4 py-2 "
                : "text-white  px-4 py-2"
            }>
              <Typography as="a" href="#" className="hover:underline">
            All Trainer
          </Typography>
            </NavLink>
            <NavLink to="/allClasses" className={({ isActive }) =>
              isActive
                ? " text-[#abc502] px-4 py-2 "
                : "text-white  px-4 py-2"
            }>
              <Typography as="a" href="#" className="hover:underline">
            All Classes
          </Typography>
            </NavLink>
            <NavLink to="/community" className={({ isActive }) =>
              isActive
                ? " text-[#abc502] px-4 py-2 "
                : "text-white  px-4 py-2"
            }>
              <Typography as="a" href="#" className="hover:underline">
            Community
          </Typography>
            </NavLink>
        </div>
      </MobileNav>
    </Navbar>
    </div>
  );
}
