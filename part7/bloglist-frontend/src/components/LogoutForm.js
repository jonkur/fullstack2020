import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync } from '../actions/userActions'
import { Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  logoutBtn: {
    marginLeft: theme.spacing(2)
  }
}))

const LogoutForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user)

  const logoutUser = () => {
    dispatch(logoutUserAsync())
  }

  return (
    <>
      <Typography variant='subtitle2' >Logged in as {user.username}</Typography>
      <Button variant='contained' className={classes.logoutBtn} onClick={logoutUser}>Log out</Button>
    </>
  )
}

LogoutForm.propTypes = {
}

export default LogoutForm