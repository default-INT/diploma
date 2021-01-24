import React from 'react'
import calendarIcon from '../icon/nav/calendar-solid-white.svg'
import palletIcon from '../icon/pallet-white.svg'
import questionIcon from '../icon/question-white.svg'
import positionIcon from '../icon/nav/suitcase-white.svg'
import employeeIcon from '../icon/nav/builder-white.svg'
import '../css/NavMenu.css'
import {NavLink} from "react-router-dom";

const NavItem = ({name = 'LINK', icon = questionIcon, path = '/'}) => (
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
                    <img src={palletIcon} width={70} alt=""/>
                </NavLink>
            </div>
            <div className="nav-group">
                <NavItem name='Report' path='/reports' icon={calendarIcon} />
                <NavItem name='Position' path='/positions' icon={positionIcon}/>
                <NavItem name='Employees' path='/employees' icon={employeeIcon}/>
            </div>
            <div className="nav-group">
                <NavItem path='/other4' />
                <NavItem path='/other5' />
                <NavItem path='/other6' />
            </div>
        </nav>
    )
}

export default NavMenu