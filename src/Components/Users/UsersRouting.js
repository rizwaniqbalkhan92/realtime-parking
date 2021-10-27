import React from 'react'
import {Link , useHistory,Route,BrowserRouter as Router,Switch}  from 'react-router-dom'
import Booking from './Booking'
import Feedback from './Feedback'
import {Card, Paper,Button, Typography} from '@mui/material'
import './user.css'
import ParkingAvailable  from './ParkingAvailable'

const UserRouting = () => {

const history=useHistory()

    return (
<Router >
<Paper className='cards'>
    <Card className='card1'>
        <img width='150' style={{marginTop:80,marginLeft:50}} height='150' src='data:image/png;base64,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' />

<div className='btns'>
<Button variant='contained' color='primary'>
<Link to='/booking'>Booking</Link>

</Button>
<Button variant='contained' color='info'>
<Link to='/parkingavailabe'>Parking Availabe</Link>

</Button>

<Button variant='contained' color='success'>
<Link to='/feedback'>Feedback</Link>

</Button>
<Button variant='contained' onClick={()=>history.push('/')}  color='info'>
<Link to='/signIn'>Logout</Link>

</Button>

</div>
    </Card>
    <Card className='card2'>
    <Switch>
        <Route path='/booking' component={Booking}  />
        <Route path='/feedback' component={Feedback}  />
        <Route path='/parkingavailabe' component={ParkingAvailable}  />


    </Switch>

    </Card>
</Paper>



</Router>
    )
}

export default UserRouting
