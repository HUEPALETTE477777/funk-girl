import React from 'react'
import { NavLink } from "react-router"

const navItems = [
    {name: "Home", path: "/"},
    {name: "About", path: "/about"},
    {name: "Contact", path: "/contact"},
];

const Navbar = () => {
  return (
    <div className="py-4 px-10 bg-amber-300">
        {/* CONTAINER TO HOLD LOGO + UL LIST*/}
        <div className="flex mx-auto justify-between items-center">
            {/* LOGO */}
            <a href="/">
                <img src="/logo.jpg" className="w-14 h-14"/>
            </a>
            <h1 className="text-2xl">Funk Girl</h1>
            
            {/* UL ITEMS */}
            <ul className="flex items-center gap-20">
                {
                    navItems.map((list, index) => (
                        <li key={index}>
                            <NavLink to={`${list.path}`} >{list.name}</NavLink>
                        </li>
                    ))
                }
            </ul>

        </div>

    </div>
  )
}

export default Navbar
