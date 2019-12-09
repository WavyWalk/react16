import * as React from 'react'
import { Container } from 'reactstrap'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { BaseLayout } from './layouts/BaseLayout'
import { ErrorPage } from './pages/ErrorPage'

export const AppComponent: React.FC = () => {
    return <Container fluid>
        <Router>
            <Switch>
                <Route path="/">
                    <BaseLayout/>
                </Route>
                <Route>
                    <ErrorPage/>
                </Route>
            </Switch>
        </Router>
    </Container>
}