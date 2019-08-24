import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Link from 'next/link'
import { startLogin } from '../../store/action.js'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import './login.less'

class Login extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit (e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.dispatch(startLogin(values))
            } else {
                return
            }           
        });
    }

    componentWillReceiveProps(prevProps) {
        if (prevProps.isLogin) {
            Router.replace('/')
        }
    }

    render () {
        if (this.props.isLogin) {
            return null
        }
        const { getFieldDecorator } = this.props.form

        return (
            <div className="login-container">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('user', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                          {getFieldDecorator('password', {
                              rules: [{ required: true, message: 'Please input your Password!' }],
                          })(
                              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                          )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" size="large" className="login-form-button">
                            Log in
                        </Button>
                            Or <Link href="/register">register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedNormalForm = Form.create({name: 'login_form'})(Login)

const mapStateToProps = state => {
    return {
        isLogin: state.login.isLogin
    }
}

export default connect(mapStateToProps)(WrappedNormalForm)