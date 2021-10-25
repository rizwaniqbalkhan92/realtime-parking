import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { getDatabase, ref, onValue, set, push, child } from 'firebase/database'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Card, Button, Paper } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, Typography } from '@mui/material'
import './user.css'


const Booking = () => {

    const [data2, setData] = useState([])
    const [dataCheck, setCheckData] = useState([])
    const [location, setLocation] = useState('')
    const [area, setArea] = useState('')
    const [filtereArea, setFilterArea] = useState([])
    const [filtered, setFilterValue] = useState([])
    const [slots, setSlots] = useState(0)
    const [timeFrom, setTimeFrom] = useState('')
    const [timeTo, setTimeTo] = useState('')
    const [date, setDate] = useState('')
    const [dateUse, setDataUse] = useState('')
    const [key, setKey] = useState('')
    const [status, setStatus] = useState('')
    const [tf1, settime1] = useState(0)
    const [tt1, settimet2] = useState(0)


    console.log(dataCheck)

    useEffect(() => {

        if (data2) {
            let value = data2.filter(val => val.data.location.toLowerCase() == location.toLowerCase())
            setFilterValue(value)
        }

    }, [data2, location, slots])
    var finalSlotsCheck = status.slots - slots
    console.log(status.slots - slots)
    console.log(data2)
    // useEffect(() => {

    //     if (data2) {
    //         let value2 = data2.filter(val => val.data.area.toLowerCase() == location.toLowerCase())
    //         setFilterArea(value2)
    //     }

    // }, [data2, area])


    console.log(filtereArea)
    console.log(location)
    console.log(filtered)




    useEffect(() => {
        const db = getDatabase();
        const dbRef = ref(db, `users/booking/${location}/${area}`);

        onValue(dbRef, (snapshot) => {
            var array = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                const obj = { data: childData, key: childKey }
                array.push(obj)

                // ...
            });
            setDataUse(array)
        }
            // , {
            //     onlyOnce: true
            // }
        );
    }, [location, area])

    console.log(dateUse)
    // function checkFunc() {

    //     console.log(JSON.parse(area).slots)
    //     if (JSON.parse(area).slots !== 0) {
    //         alert('Space is avaialabe')
    //     }
    //     else {
    //         alert('full area')
    //     }
    // }

    const BookingNow = () => {


        // const object={
        //     location,
        //     timeFrom,
        //     timeTo,
        //     slots,
        //     date,
        //     key,

        // }


        // console.log(object)
        let areaLoc = JSON.parse(area).area
        console.log(areaLoc)
        const db = getDatabase()
        const key2 = push(child(ref(db), 'admin/booking')).key;
        set(ref(db, `users/booking/${location}/${areaLoc}/${key2}`), {
            location,
            area: JSON.parse(area).area,
            timeFrom,
            // timeFromInMilli:new Date(timeFrom).getTime(),
            timeTo,
            // timeToInMilli:new Date(timeTo).getTime(),
            slots,
            date,
            key,
            status: 'booked',
            totalSlots: status.slots,
            remainingSlots: status.slots - slots
        })
        set(ref(db, `admin/createParking/${key}`), {

            area: JSON.parse(area).area,

            key,
            location,

            slots: status.slots - slots

        })






    }





    useEffect(() => {

        const db = getDatabase();
        const dbRef = ref(db, 'admin/createParking');

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
        }
            // , {
            //     onlyOnce: true
            // }
        );
    }, [])
    const handleChange1 = (e) => {
        setLocation(e.target.value)
    }
    const handleChange2 = (e) => {
        setArea(e.target.value)
        setStatus(JSON.parse(e.target.value))
        setKey(JSON.parse(e.target.value).key)

    }
    console.log(status.slots)
    // useEffect(() => {



    //     const db = getDatabase();
    //     const dbRef = ref(db,`admin/booking`);

    //     onValue(dbRef, (snapshot) => {
    //         var array = []
    //         snapshot.forEach((childSnapshot) => {
    //             const childKey = childSnapshot.key;
    //             const childData = childSnapshot.val();
    //             const obj = { data: childData, key: childKey }
    //             array.push(obj)

    //             // ...
    //         });
    //         setCheckData(array)
    //     }
    //         // , {
    //         //     onlyOnce: true
    //         // }
    //     );



    // }, [])

    const checkd = () => {
        dataCheck ? dataCheck.map(val => {

            if (val) {
                // let tt2=(val.data.timeTo).getTime()
                let tt2 = new Date(val.data.timeTo).getTime()
                let tf2 = new Date(val.data.timeFrom).getTime()
                console.log("timeTo database",tt2)
                console.log("timeFrom databse",tf2)
                console.log("timeTo",tt1)
                console.log("timeFrom",tf1)
              

              let difft=tt2-tt1
              let difff=tf2-tf1
                if (difff > difft) {
                    
                    alert('booked')
                    
                }
                alert('Space')

            }

        }) : console.log('')
    }
    useEffect(() => {
        let areaLoc2 = area ? JSON.parse(area).area : ''
        let tf = new Date(timeFrom).getTime()
        settime1(tf)
        let tt = new Date(timeTo).getTime()
        settimet2(tt)
        const db = getDatabase();
        const dbRef = ref(db, `users/booking/${location}/${areaLoc2}/`);

        onValue(dbRef, (snapshot) => {
            var array = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                const obj = { data: childData, key: childKey }
                array.push(obj)

                // ...
            });
            setCheckData(array)
        }

        );



    }, [timeFrom, timeTo, location, area])







    return (
        <Paper>
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
                                {
                                    data2 ? data2.map((val) => (
                                        <MenuItem value={val.data.location}  >{val.data.location}</MenuItem>

                                    )) : ''
                                }
                            </Select>
                        </FormControl>

                    </Box>

                    <Box sx={{ maxWidth: 230, height: 0 }}>
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

                                {
                                    filtered ? filtered.map((val, i) => {
                                        // setStatus(val.data.area)

                                        console.log(val.data.area, i)
                                        return (
                                            <MenuItem value={JSON.stringify(val.data)}>{val.data.area}</MenuItem>

                                        )
                                    }
                                        // return(
                                        // )
                                    ) : ''
                                }

                            </Select>
                        </FormControl>

                    </Box>


                    {/* <h1>  {status ? status.area : ''}</h1>
                        <h1>  {status ? status.slots : ''}</h1> */}

                    <div style={{ display: 'flex',marginTop:60, height: 200, justifyContent: 'space-around' }}>

                        {/* <Boxes value={status ? status.slots : 0 } /> */}
                        <h1>{finalSlotsCheck ? finalSlotsCheck :'Loading..' }</h1>

                    </div>
                    <Button onClick={checkd}>Check</Button>
                    <TextField placeholder='Parking Slots' type='number' onChange={e => setSlots(e.target.value)} /><br />
                    <Typography>From</Typography>
                    <TextField placeholder='Time(From) ' type='datetime-local' onChange={e => setTimeFrom(e.target.value)} /><br />
                    <Typography>To</Typography>
                    <TextField placeholder='Time (To)' type='datetime-local' onChange={e => setTimeTo(e.target.value)} /><br />

                    <Button variant='contained' color='primary' onClick={BookingNow} >Book Now</Button>
                </Card>
            </div>
        </Paper>
    )
}

export default Booking



// const Boxes = (props) => {
//     const [state, setState] = useState([])
//     for (const i = 0; i < props.value; i++) {

//         var array = []
//         array.push(i)
//         setState(array)
//         console.log(array)
//     }
//     const array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
//     return (
//         array2.map((val) => (
//             <div style={{ width: 50, height: 50, display: 'flex', justifyContent: "space-between", marginLeft: 10, flexWrap: 'wrap', backgroundColor: 'red' }}>{val}</div>
//         ))


//     )
// }