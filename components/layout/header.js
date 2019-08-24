import React, { Component } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import { logout } from '../../store/action'
import './header.less'

class Header extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout () {
        this.props.dispatch(logout())
    }

    render () {
        let navHtml = this.props.modules.map((item, index) => {
            return (
                <Link key={index} href={item.path}>
                    <span className="nav-one">
                        {item.label}
                    </span>
                </Link>
            )
        })
        if (this.props.isLogin) {
            navHtml.push(
                <span key={this.props.modules.length} className="nav-one" onClick={this.logout}>
                    Logout
                </span>
            )
        }
        return (
            <div className="header">
                {navHtml}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        modules: state.login.modules,
        isLogin: state.login.isLogin
    }
}

export default connect(mapStateToProps)(Header)