import React from 'react'

import ReactDOM from 'react-dom'
import Users from './components/users/users'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

ReactDOM.render(
    <React.StrictMode>
        <Users />
    </React.StrictMode>,
    document.getElementById('root'),
)
