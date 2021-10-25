import React from 'react'
import {Link , Route,BrowserRouter as Router,Switch}  from 'react-router-dom'
import CreateParkingArea from './CreateParkingArea'
import ViewAdminBooking from './ViewAdminBooking'
import BookParking from './BookParking'
import {Paper,Card,Typography,Button}  from '@mui/material'
import './admin.css'
import FeedbackAndReply  from './FeedbackAndReply'
import ViewParkingPlaces from './ViewParkingPlaces'

const AdminRouting = () => {
    return (
<Router >
    <Paper className="adminMain">
    <Switch>


    </Switch>
<Card className='card1'>
<Card  className='logo'>
<img src='data:image/jpeg;base64,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' />
    </Card>
    <Card className='links' >
        <Button  variant='contained'  color='primary'>
    <Link to='/createparking' >CreateParkingArea</Link>
    
</Button  >
        <Button  variant='contained'  color='primary'>
        <Link to='/bookParking' >BookParking</Link>
    
</Button  >
        <Button  variant='contained'  color='primary'>
        <Link to='/ViewAdminBooking' >ViewAdminBooking</Link>
    
</Button  >
        <Button  variant='contained'  color='primary'>
        <Link to='/feedbackAndReply' >FeedbackAndReply</Link>
    

</Button  >
        <Button  variant='contained'  color='primary'>
        <Link to='/viewParkingPlaces' >viewParkingPlaces</Link>
    
</Button  >
   
    

</Card>
</Card>
<Card className='card2'>
        <Route  path='/createparking' exact={true} component={CreateParkingArea} />
        <Route  path='/bookParking' component={BookParking} />
        <Route  path='/ViewAdminBooking'  component={ViewAdminBooking} />
        <Route  path='/feedbackAndReply'  component={FeedbackAndReply} />
        <Route  path='/viewParkingPlaces'  component={ViewParkingPlaces} />
</Card>

</Paper>
</Router>
    )
}

export default AdminRouting
