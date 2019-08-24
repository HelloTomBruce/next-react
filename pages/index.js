import React, { Component } from 'react'

import { connect } from 'react-redux'
import { saveListAsync, startLogin } from '../store/action.js'
import List from '../components/swiper/swiper.js'
import Layout from '../components/layout/layout.js'

import { checkUserAndPwd } from '../utils/utils'

class Index extends Component {
    constructor(props) {
        super(props)
    }

    static async getInitialProps({ req }) {}

    async componentDidMount () {
        this.checkLogin()
        this.props.dispatch(saveListAsync())
    }

    checkLogin() {
        if (this.props.isLogin) {
            return
        }
        let userInfo = checkUserAndPwd()
        if (userInfo) {
            this.props.dispatch(startLogin(userInfo))
        }
    }

    render () {
        return (
            <Layout>
                <List list={this.props.list}/>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    list: state.list.list,
    isLogin: state.login.isLogin
})

export default connect(mapStateToProps)(Index)