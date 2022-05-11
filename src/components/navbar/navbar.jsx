import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import Users from '../../layouts/users/users'
import Login from '../../layouts/login/login'
import Main from '../../layouts/main/main'
const Navbar = () => {
  return (
    <>
      <ul className='nav'>
        <li className='nav-item'>
          <NavLink className='nav-link active' aria-current='page' to='/'>
            Main
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/login'>
            Login
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/users'>
            Users
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/login' component={Login} />
        <Route path='/users/:id?' component={Users} />
        <Redirect to='/' />
      </Switch>
    </>
  )
}

export default Navbar
