import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import './listOne.less'

export default class ListOne extends Component {
    constructor (props) {
        super(props)
    }
    render () {
        return (
            <div className={'list-one ' + this.props.activeClass}>
                <Link href="/img">
                    <img src={this.props.cover}/>
                </Link>
            </div>
        )
    }
}

ListOne.defaultProps = {
    activeClass: '',
    cover: ''
}

ListOne.propTypes = {
    activeClass: PropTypes.string,
    cover: PropTypes.string
}

