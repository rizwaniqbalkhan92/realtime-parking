

import React,{useState,useEffect} from 'react';

import {TextField,Typography,Button,Card}  from '@mui/material'
import {getDatabase,ref,set,push,child,onValue}  from 'firebase/database'
import './admin.css'

const CreateParkingArea = () => {
    const [age, setAge] =useState('');
    const [location,setLocation]=useState('')
    const [area,setArea]=useState('')
    const [slots,setSlots]=useState(0)
    const [array,setArray]=useState([])
    const addVal=()=>{
        const db=getDatabase()
        const key=push(child(ref(db),'admin/createParking')).key;
set(ref(db,`admin/createParking/${key}`),{
    location,
    area,
    slots,
    key
})
      
        var data=[]
        // data.push(obj)
setArray(data)
    }

    console.log(array)
    const handleChange1 = (event) => {
      setLocation(event.target.value)
    //   setAge(event.target.value)
    };
    const handleChange2 = (event) => {
        setArea(event.target.value)
    //   setAge(event.target.value)
    };
  
    const handleChange3 = (event) => {
        setArea(event.target.value)
    //   setAge(event.target.value)
    };
  
    return (
        <div>
        <h1>Create Parking Area</h1>
        <Card className='inputs'>
<TextField  placeholder='Parking Locations' onChange={e=>setLocation(e.target.value)} /><br/>
<TextField  placeholder='Parking Area'  onChange={e=>setArea(e.target.value)}  /><br/>
<TextField  placeholder='Parking Slots'  type='number'    onChange={e=>setSlots(e.target.value)} /><br/>
<Button variant='contained' color='primary'  onClick={addVal} >Create Parking</Button>
</Card>



        </div>
    )
}

export default CreateParkingArea
