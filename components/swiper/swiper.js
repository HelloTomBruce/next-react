import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListOne from './listOne.js'
import './swiper.less'

class Swiper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: 1
        }
        this.slideToRight = this.slideToRight.bind(this)
        this.slideToLeft = this.slideToLeft.bind(this)
        this.myRef = React.createRef()
    }

    async componentDidMount () {
        this.startPlay()
    }

    render () {
        let listHtml = this.props.list.map((item, index) => {
            let className = ''
            let { active } = this.state
            let maxIndex = this.props.list.length - 1
            if (index === active) {
                className = 'active'
            } else if (index === active - 1 || (active === 0 && index === maxIndex )) {
                className = 'prev'
            } else if (index === active + 1 || (active === maxIndex && index === 0)) {
                className = 'next'
            }
            return <ListOne key={index} cover={item.cover} activeClass={className}/>
        })
        return (
            <div className="list-container" ref={this.myRef}>
                <div className="list-display">
                    {listHtml}
                </div>
            </div>
        )
    }

    startPlay () {
        setInterval(() => {
            this.slideToRight()
        }, 6000)
    }

    slideToRight () {
        this.setState({
            active: this.state.active + 1 >= this.props.list.length ? 0 : this.state.active + 1
        })
    }

    slideToLeft () {
        this.setState({
            active: this.state.active === 0 ? this.props.list.length - 1 : this.state.active - 1
        })
    }
}

Swiper.propTypes = {
    list: PropTypes.array
}

export default Swiper