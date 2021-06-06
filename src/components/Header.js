import React from 'react'
import PropTypes from 'prop-types'
import {bellIcon, palletMainIcon} from '../icons'
import "../css/Header.css"

function Header ({user}) {
    return (<header className="app-header medium-shadow">
        <div className="main-title light-shadow">Pallet prod.</div>
        <div className="user-container">
            <div className="utils">
                <a href="" className="util-item">
                    <img src={bellIcon} width={20} alt=""/>
                </a>
            </div>
            <a href='' className="user">
                <img src={user.avatarPath || palletMainIcon} width={30} alt="" className="avatar"/>
                <span className="username">{user.username }</span>
            </a>
        </div>
    </header>)
}

Header.propTypes = {
    user: PropTypes.object
}

export default Header