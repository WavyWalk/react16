import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ErrorPage } from '../pages/ErrorPage'
import { Col } from 'reactstrap'
import { Sidebar } from '../sidebar/Sidebar'
import { Test } from '../pages/Test'
import {WelcomePage} from "../pages/WelcomePage";
import {ReduxMinimal} from "../pages/ReduxMinimal";
import {TodoContainer, TodoState} from "../pages/Todo";

export const BaseLayout: React.FC = ()=>{

    return <div className="row page">
        <Col className="col sidebar">
            <Sidebar/>
        </Col>
        <Col>
            <Switch>
                <Route exact path={'/'}>
                    <WelcomePage/>
                </Route>
                <Route exact path="/redux-simple-example">
                    <ReduxMinimal/>
                </Route>
                <Route exact path="/test">
                    <Test/>
                </Route>
                <Route exact path="/todo-app">
                    <TodoContainer/>
                </Route>
                <Route>
                    <ErrorPage/>
                </Route>
            </Switch>
        </Col>
    </div>

}