import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {hashHistory, Link} from 'react-router'
import {
    Spin,
    message,
    Form,
    Icon,
    Input,
    Button,
    Row,
    Col
} from 'antd'
import {fetchLogin, userInfo} from 'actions/common'
import styles from './login.less'
const FormItem = Form.Item


@Form.create({
    onFieldsChange(props, items) {}
})

export default class Login extends Component {
    // 初始化页面常量 绑定事件方法
    constructor(props, context) {
        super(props)
        this.state = {
            loading: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.checkPass = this.checkPass.bind(this)
        this.checkName = this.checkName.bind(this)
        this.noop = this.noop.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const testMessage={
                    account:"admin",
                    username:values.username,
                    password:values.password,
                    img:"img/avtar01.png",
                    UserLevel:"administer",
                    Permission:[]
                }
                // this.state.loading = true
                // this.setState({loading: true})
                Object.keys(values).map(key => values[key] = (values[key] && values[key].trim()))
                sessionStorage.setItem('token', testMessage)
                hashHistory.push('/')
            }
        })
    }

    // 组件已经加载到dom中
    componentDidMount() {
        // this.props.dispatch(fetchLogin({ currentPage: 1 }))
    }

    checkName = (rule, value, callback) => {
        // const { validateFields } = this.props.form
        if (value) {
            // validateFields([''])
        }
        callback()
    }

    checkPass = (rule, value, callback) => {
        // const { validateFields } = this.props.form
        if (value) {
            // validateFields([''])
        }
        callback()
    }

    noop = () => false

    render() {
        const {getFieldDecorator} = this.props.form
        return (<div className="login">
            <div className="sy_top"/>
            <div className="btmLogin">
                <div className="sy_bottom">
                    <h1 id="PerformName">T-MES智能制造执行系统</h1>
                    <Row className="ul-wrap">
                        <Col span={24}>
                            <Spin spinning={this.state.loading}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem hasFeedback="hasFeedback">
                                        {
                                            getFieldDecorator('username', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入用户名'
                                                    }, {
                                                        validator: this.checkName
                                                    },
                                                    // { pattern: regExpConfig.IDcardTrim, message: '身份证号格式不正确' }
                                                ],
                                                // validateTrigger: 'onBlur',
                                            })(<Input prefix={<Icon type = "user" style = {{ fontSize: 13 }}/>} placeholder="请输入用户名" type="text"/>)
                                        }
                                    </FormItem>
                                    <FormItem hasFeedback="hasFeedback">
                                        {
                                            getFieldDecorator('password', {
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入密码'
                                                    },
                                                    // { pattern: regExpConfig.pwd, message: '密码只能是6-16个数字或者字母组成' }
                                                ],
                                                // validateTrigger: 'onBlur',
                                            })(<Input prefix={<Icon type = "lock" style = {{ fontSize: 13 }}/>} placeholder="请输入密码" type="password"/>)
                                        }

                                    </FormItem>
                                    <FormItem>
                                        <Button className="loginBtn" type="primary" htmlType="submit">登录</Button>
                                        {/* <Link to="/register">注册</Link> */}
                                    </FormItem>
                                </Form>
                            </Spin>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>)
    }
}
