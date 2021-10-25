import React from 'react'
import {Paper,Card,Typography,Button}  from '@mui/material'
import './home.css'
import {useHistory}  from 'react-router-dom'

import data from './data/app.json'
const Home = () => {

const history=useHistory()
    
    return (
<Paper  className='home'>
    <Typography className='head-1'>D-Parking</Typography>
        <Card className='homeText'>
<Typography>
    
Real
time
parking booking system that provides
customers an easy way of reserving a parking space online. It overcomes the
problem of finding a parking space in commercial ar
eas that unnecessary
consumes time. Hence this project offers a web
or mobile
based reservation
system where users can view various parking areas and select the space to view
whether space is available or not. If the booking space is available then he can
book it for specific time slot. The booked space will be marked yellow and will not
be available for anyone else for the specified time. This system provides an
additional feature of cancelling the bookings. User can cancel their books spa
ce
anytime. After
making booking
users are notified about the booking via email
along with unique parking numbe

real
-
time
parking booking system that provides
customers an easy way of reserving a parking space online. It overcomes the
problem of finding a parking space in commercial ar
eas that unnecessary
consumes time. Hence this project offers a web
or mobile

</Typography>
        </Card>
<Button variant='contained' onClick={()=>history.push('/signIn')} color='success' style={{width:100,marginRight:20}}>User</Button>
<Button variant='contained' onClick={()=>history.push('/adminSignIn')} color='primary' style={{width:100}}>Admin</Button>

</Paper>
    )
}

export default Home
