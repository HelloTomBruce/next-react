import React, { Component } from 'react'
import Header from './header.js'

export default class Layout extends Component {
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <div className="app">
                <Header/>
                {this.props.children}
            </div>
        )
    }
}