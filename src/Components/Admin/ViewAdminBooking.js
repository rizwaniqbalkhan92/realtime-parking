import React,{useState,useEffect} from 'react'
import {Paper,Card,Button,Typography}  from '@mui/material'
import { getDatabase, onValue,remove, ref, update, set } from 'firebase/database'
import './admin.css'

const ViewAdminBooking = () => {

    const [data2, setData] = useState([])

    console.log(data2)
    useEffect(() => {

        const db = getDatabase();
        const dbRef = ref(db, 'admin/booking/');

        onValue(dbRef, (snapshot) => {
            var array = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                console.log(childData)
                const obj = { data: childData, key: childKey }
                array.push(obj)

                // ...
            });
            setData(array)
        }, {
            onlyOnce: true
        });
    }, [])

    return (
        <div className='adminBooking0'>
      {
          data2 ? data2.map((val)=>(
              <Card className='viewBooking'>
                  <Typography className='textAdminBook'>Location: {val.data.location}</Typography>
                  <Typography className='textAdminBook'>Area: {val.data.area}</Typography>
                  <Typography className='textAdminBook'>Date: {val.data.date}</Typography>
     
                  <Typography className='textAdminBook'>No. Of Slots: {val.data.slots}</Typography>
                  <Typography className='textAdminBook'>Time: {val.data.time}</Typography>
                  <Typography className='textAdminBook'>Status: {val.data.status}</Typography>
                  
                  <Button variant='outlined' color='info'>Cancel Booking</Button>
                  <Button  variant='outlined' color='success'>Done</Button>
              </Card>
          )):''
      }
            
        </div>
    )
}

export default ViewAdminBooking
