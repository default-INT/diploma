import React from 'react'
import {NavLink} from "react-router-dom";
import '../css/NavMenu.css'
import {
    navBuilderWhiteIcon,
    navCalendarSolidWhiteIcon, navChart, navExport, navStore,
    navSuitcaseWhiteIcon,
    palletWhiteIcon,
    questionWhiteIcon
} from '../icons.js'

const NavItem = ({name = 'LINK', icon = questionWhiteIcon, path = '/'}) => (
    <div className="nav-item">
        <NavLink exact to={path} className='nav-link' activeClassName='active-link'>
            <img src={icon} className='nav-icon' width={20} alt=""/>
            <span className="text">
                {name}
            </span>
        </NavLink>
    </div>
)

const NavMenu = () => {
    return (
        <nav className="app-navigation">
            <div className="nav-group">
                <NavLink to='/' className="main-icon">
                    <img src={palletWhiteIcon} width={70} alt=""/>
                </NavLink>
            </div>
            <div className="nav-group">
                <NavItem name='Отчёты' path='/reports' icon={navCalendarSolidWhiteIcon} />
                <NavItem name='Склад' path='/other1' icon={navStore} />
                <NavItem name='Выгрузки со склада' path='/other2' icon={navExport} />
            </div>
            <div className="nav-group">
                <NavItem name='Сотрудники' path='/employees' icon={navBuilderWhiteIcon}/>
                <NavItem name='Тарифы' path='/positions' icon={navSuitcaseWhiteIcon}/>
                <NavItem name='Статистика' path='/other3' icon={navChart} />
            </div>
        </nav>
    )
}

export default NavMenu