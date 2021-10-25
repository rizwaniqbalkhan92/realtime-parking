import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { getDatabase, ref, onValue, set, push, child } from 'firebase/database'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Card,Button } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {TextField}  from '@mui/material'
import { jsonEval } from '@firebase/util';


const BookParking = () => {
    const [data2, setData] = useState([])
    const [location, setLocation] = useState('')
    const [area, setArea] = useState('')
    const [filtered, setFilterValue] = useState([])
    const [slots, setSlots] = useState(0)
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [key, setKey] = useState('')
    const [status, setStatus] = useState('')
    useEffect(()=>{
        if(data2){
            let value=data2.filter(val=>val.data.location==location) 
            setFilterValue(value)
            console.log(value)
        }

    },[data2,location,slots])

    console.log(data2)

    const BookingNow=()=>{
        const db=getDatabase()
        const key2=push(child(ref(db),'admin/booking')).key;
set(ref(db,`admin/booking/${key2}`),{
    location,
    area:JSON.parse(area).area,
    time,
    slots,
    date,
    key,
    status:'booked',
    totalSlots:status.slots
})
    
        

    }

    useEffect(() => {

        const db = getDatabase();
        const dbRef = ref(db, 'admin/');

        onValue(dbRef, (snapshot) => {
            var array = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                const obj = { data: childData, key: childKey }
                array.push(obj)

                // ...
            });
            setData(array)
        }, {
            onlyOnce: true
        });
    }, [])
    const handleChange1 = (e) => {
        setLocation(e.target.value)
    }
    const handleChange2 = (e) => {
        setArea(e.target.value)
      setStatus(JSON.parse(e.target.value))
      setKey(JSON.parse(e.target.value).key)
        
    }
    useEffect(()=>{
      
console.log( filtered)




    },[filtered])
    return (
        <div>
            <Card className='createparking'>
                <Box sx={{ maxWidth: 230, height: 90, marginTop: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">City Location</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={location}
                            label="Location"
                            onChange={handleChange1}
                            fullWidth
                        >
                            {/* <MenuItem value='saddar' >Saddar</MenuItem>
          <MenuItem value='gulistan-e-johar' >Gulistan-e-Johar</MenuItem>
          <MenuItem value='nazimabad' >Nazimabad</MenuItem>
          <MenuItem value='malir' >Malir</MenuItem>
          <MenuItem value='korangi' >Korangi</MenuItem>
          <MenuItem value='landhi' >Landhi</MenuItem>
        <MenuItem value='lyari' >Lyari</MenuItem> */}
                            {
                                data2 ? data2.map((val)=>(
                                    <MenuItem value={val.data.location}  >{val.data.location}</MenuItem>

                                )):''
          }
                        </Select>
                    </FormControl>

                </Box>
            
              <Box sx={{ maxWidth: 230,height:90 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Areas</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={area}
          label="Area"
          onChange={handleChange2}
          fullWidth
        >
            
{/* {
    data2
     ? data2.filter(val=>val.data2.location==location):''
} */}
            {
             filtered ? filtered.map((val,i)=>{
                // setStatus(val.data.area)

                console.log(val.data.area,i)
                     return(
                         <MenuItem value={JSON.stringify(val.data)}>{val.data.area}</MenuItem>

                     )
                 }
                // return(
                // )
            ):''
            }
       {/* {
           location=='saddar' ? <>
           <MenuItem value="Lucky star">Lucky star</MenuItem>
           <MenuItem value="KMC Parking Plaza">KMC Parking Plaza</MenuItem>
           <MenuItem value="Regal">Regal</MenuItem>
       </>:''
       } */}
        </Select>
      </FormControl>

</Box>
{/* <Box sx={{ maxWidth: 230 ,height:90}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location}
          label="Age"
          onChange={handleChange3}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

</Box>  */}

{/* {
    filtered ? filtered.map((val)=>(

    
    
       

            
            <div style={{display:'flex',justifyContent:'space-around'}}>
        <h1>  {val.data.area}</h1>
        <h1>  {val.data.slots}</h1>
        </div>
                )
    
    
            
            ):''
}
{
    status ? <h1>{status}</h1>: ''
} */}
        <div style={{display:'flex',justifyContent:'space-around'}}>
        <h1>  {status ? status.area : ''}</h1>
        <h1>  { status ? status.slots:''}</h1>
        </div>
<TextField  placeholder='Parking Slots'  type='number'    onChange={e=>setSlots(e.target.value)} /><br/>
<TextField  placeholder='Time'  type='time'    onChange={e=>setTime(e.target.value)} /><br/>
<TextField  placeholder='date'  type='date'    onChange={e=>setDate(e.target.value)} /><br/>
<Button variant='contained' color='primary' onClick={BookingNow} >Book Now</Button>
            </Card>
        </div>
    )
}



export default BookParking
