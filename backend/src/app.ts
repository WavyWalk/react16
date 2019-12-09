import express from 'express';
import { Router } from './router'
import {WebpackStatsInfo} from "./assetsmanagement/WebpackStatsInfo";

export class App {

    static init() {
        const app = express()
        WebpackStatsInfo.readAndAssignStats()
        app.set('view engine', 'pug')
        app.disable('x-powered-by')
        app.use(express.json())
        Router.setRoutes(app)
        app.listen(3000)
    }

}