import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import LogoutForm from './LogoutForm'
import {
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  leftSide: {
    flexGrow: 1
  }
}))

const NavBar = () => {
  const classes = useStyles()
  const user = useSelector(state => state.userReducer.user)

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        <div className={classes.leftSide}>
          <Button color='inherit' component={Link} to='/blogs'>Blogs</Button>
          <Button color='inherit' component={Link} to="/users">Users</Button>
        </div>
        {user === null
          ? <LoginForm />
          : <LogoutForm />}
      </Toolbar>
    </AppBar>
    // <div style={nbContStyle} >
    //   <Link to="/blogs" ><p style={nbPStyle}>Blogs</p></Link>
    //   <Link to="/users" ><p style={nbPStyle}>Users</p></Link>
    //   {user === null
    //     ? <LoginForm />
    //     : <LogoutForm />}
    // </div>
  )

}

export default NavBar