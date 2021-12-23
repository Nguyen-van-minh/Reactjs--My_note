import { NavLink } from 'react-router-dom';
import './Nav.scss';

function Nav() {
    return (
        <div className='topnav'>
            <NavLink activeClassName='active1' to='/'> Home </NavLink>
            <NavLink activeClassName='active1' to='/todo'> Todo list </NavLink>
            <NavLink activeClassName='active1' to='/note'> Note </NavLink>
        </div>
    )
}

export default Nav;