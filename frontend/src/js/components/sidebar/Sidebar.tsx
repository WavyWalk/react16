import * as React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar: React.FC = () => {

    const [dropdownOpen, setDropdownOpen] = React.useState(false)
    const toggle = () => setDropdownOpen((prevState)=>{return !prevState})

    return <div>
        <ul>
            <li>
                <Link to={'/test'}>
                    test
                </Link>
            </li>
            <li>
                <Link to={'/redux-simple-example'}>
                    redux simple example
                </Link>
            </li>
            <li>
                <Link to={'/todo-app'}>todo app</Link>
            </li>
        </ul>
    </div>
}