import React from "react";
import { BsCart3, BsFillArchiveFill, BsFillGearFill, BsFillGrid3X3GapFill, BsGrid1X2Fill, BsListCheck, BsMenuButtonWideFill, BsPeopleFill } from "react-icons/bs";

function Sidebar({openSidebarToggle, OpenSideBar}){
    const isReallyAdmin = false;
    return(
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className="sidebar-tittle">
                <div className="sidebar-brand">
                    {/* <BsCart3 className="icon_header" />Movelaria Ponce */}
                    Movelaria Ponce
                </div>
                <span className="icon close_icon" onClick={OpenSideBar}>X</span>
            </div>
            <ul className="sidebar-list">
                <li className="sidebar-list-item">
                    <a href="">
                        <BsGrid1X2Fill className="icon" /> Dashboard
                    </a>
                </li>
                { (isReallyAdmin === true) &&
                <li className="sidebar-list-item">
                    <a href="">
                        <BsFillArchiveFill className="icon" /> Produtos
                    </a>
                </li>
                }
                <li className="sidebar-list-item">
                    <a href="">
                        <BsFillGrid3X3GapFill className="icon" /> Categorias
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsPeopleFill className="icon" /> Clientes
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsListCheck className="icon" /> Inventário
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsMenuButtonWideFill className="icon" /> Relatórios
                    </a>
                </li>
                <li className="sidebar-list-item">
                    <a href="">
                        <BsFillGearFill className="icon" /> Configurações
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar;