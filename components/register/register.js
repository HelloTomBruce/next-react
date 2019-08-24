import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd'
import './register.less'

class Register extends Component {
    constructor (props) {
        super(props)
        this.state = {
            confirmDirty: false,
            autoCompleteResult: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.validateToNextPwd = this.validateToNextPwd.bind(this)
        this.validateToFirstPwd = this.validateToFirstPwd.bind(this)
        this.handleWebsiteChange = this.handleWebsiteChange.bind(this)
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
    }

    validateToNextPwd (rule, value, callback) {
        const form = this.props.form
        if (value && this.state.confirmDirty) {
            form.validateField(['confirm'], { force: true})
        }
        callback()
    }

    validateToFirstPwd (rule, value, callback) {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!')
        } else {
            callback()
        }
    }

    handleWebsiteChange (value) {
        let autoCompleteResult
        if (!value) {
            autoCompleteResult = []
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`)
        }
        this.setState({
            autoCompleteResult
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values)
            }
        })
    }

    handleConfirmBlur(e) {
        const value = e.target.value
        this.setState({
            confirmDirty: this.state.confirmDirty || !!value
        })
    }

    render () {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16}
            }
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        }
        const { getFieldDecorator } = this.props.form

        const residences = [
            {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [{
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [{
                        value: 'xihu',
                        label: 'West Lake',
                    }],
                }],
            }, 
            {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [{
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [{
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    }],
                }],
            }
        ];

        const { Option } = Select

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86'
        })(
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        )

        const AutoCompleteOption = AutoComplete.Option

        const websiteOptions = this.state.autoCompleteResult.map(website => {
            return (
                <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
            )
        })

        return (
            <div className="register-container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="E-Mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not invalid e-mail!'
                                },
                                {
                                    required: true,
                                    message: 'Please input your e-mail!'
                                }
                            ]
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                },
                                {
                                    validator: this.validateToNextPwd
                                }
                            ]
                        })(
                            <Input type="password"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Confirm password"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!'
                                },
                                {
                                    validator: this.validateToFirstPwd
                                }
                            ]
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={
                            (
                                <span>
                                    Nickname&nbsp;
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o"/>
                                    </Tooltip>
                                </span>
                            )
                        }
                    >
                        {getFieldDecorator('nickname', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your nickname!',
                                    whitespace: true
                                }
                            ]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Habitual Residence"
                    >
                        {getFieldDecorator('residence', {
                            rules: [
                                {
                                    type: 'array',
                                    required: true,
                                    message: 'Please select your residence'
                                }
                            ],
                            initialValue: ['zhejiang', 'hangzhou', 'xihu']
                        })(
                            <Cascader options={residences}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Phone number"
                    >
                        {getFieldDecorator('phone', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your phone number!'
                                }
                            ]
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%'}}/>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Website"
                    >
                        {getFieldDecorator('website', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your website!'
                                }
                            ]
                        })(
                            <AutoComplete 
                                dataSource={websiteOptions}
                                onChange={this.handleWebsiteChange}
                                placeholder="website"
                            >
                                <Input/>
                            </AutoComplete>
                        )}

                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Captcha"
                        extra="We must make sure that you are a human"
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                                {getFieldDecorator('captcha', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input the captcha you got!'
                                        }
                                    ]
                                })(
                                    <Input/>
                                )}
                            </Col>
                            <Col span={12}>
                                <Button>Get Captcha</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        {...tailFormItemLayout}
                    >
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked'
                        })(
                            <Checkbox>I have read the  <a href="">agreement</a></Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...tailFormItemLayout}
                    >
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const RegisterForm = Form.create({ name: 'register'})(Register)

export default RegisterForm