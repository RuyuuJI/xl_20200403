//应用根组件
import React, { Component } from 'react'


//路由器与路由(,,切换路由，路由)
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom"
import Login from './pages/login/login.jsx';
import Admin from './pages/admin/admin.jsx'


export default class App extends Component {
    render() {
        return (

            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/" component={Admin} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}