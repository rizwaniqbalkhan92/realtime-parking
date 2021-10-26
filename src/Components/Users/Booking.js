import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { getDatabase, ref, onValue, set, push, child } from 'firebase/database'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Card, Modal, Button, Paper } from '@mui/material'
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
    const [dateM, setDateM] = useState(0)
    const [boxes, setBoxes] = useState([])
    const [open, setOpen] = useState({ value: false, id: 0 })


    console.log(dataCheck)
    console.log(filtereArea)
    // console.log(filtered)
    useEffect(() => {

        if (data2) {
            let value = data2.filter(val => val.data.location.toLowerCase() == location.toLowerCase())
            setFilterValue(value)
        }

    }, [data2, location, slots])
    // var finalSlotsCheck = status.slots - slots
    // console.log(status.slots - slots)
    // console.log(data2)
    // useEffect(() => {

    //     if (data2) {
    //         let value2 = data2.filter(val => val.data.area.toLowerCase() == location.toLowerCase())
    //         setFilterArea(value2)


    //     }
    //     let arr=[]
    //     for(let i=0; i<20; i++){
    // arr.push(i)


    //      }
    // setBoxes(arr)

    // }, [data2, area])


    // console.log(filtereArea)
    // console.log(location)
    // console.log(filtered)


    const handleClose = () => {
        setOpen({ value: false, id: 0 })
    }

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
    console.log(dataCheck)
    console.log(dateM)
    const submitData = (key) => {
 


        // let date = new Date(dataCheck).getDate()
        // let dateN=new Date(dateM).getDate()

        
        if (!dataCheck || dataCheck.date !== dateM   ) {
          
            alert('Your Answer has beeen Submitted--!')
            let areaLoc = JSON.parse(area).area
            console.log(areaLoc)
            const db = getDatabase()
            const key2 = push(child(ref(db), 'admin/booking')).key;
            set(ref(db, `users/booking/${location}/${areaLoc}/${key}`), {
                location,
                area: JSON.parse(area).area,
                // timeFrom,
                // timeFromInMilli:new Date(timeFrom).getTime(),
                // timeTo,
                date: dateM,
                // timeToInMilli:new Date(timeTo).getTime(),
                slots,
               
                key,
   
                status: 'booked',
            
            })

        
            }
        
        else {
             
            alert('No Data.. is Available')
            
        }
    
    
        // if (dataCheck) {
        //     let tdfrom=new Date(dataCheck.timeFrom).getTime()
        //     console.log(tdfrom)
        //     let tdTo=new Date(timeTo).getTime()
        //     console.log(tdTo)
        //     if((tf1 >= tdfrom ) && (tt1 >= tdTo) ){
        //         alert('No Space')
        //     }
        //     else if((tf1 > tdfrom ) && (tt1 < tdTo) ){
        //         alert('No Space')
        //     }
        //     else if((tf1 > tdfrom ) && (tt1 < tdTo) ){
        //         alert('No Space')
        //     }

        //     else{
        //         alert('Your Answer has beeen Submitted--!')
        //         let areaLoc = JSON.parse(area).area
        //         console.log(areaLoc)
        //         const db = getDatabase()
        //         const key2 = push(child(ref(db), 'admin/booking')).key;
        //         set(ref(db, `users/booking/${location}/${areaLoc}/${key}`), {
        //             location,
        //             area: JSON.parse(area).area,
        //             timeFrom,
        //             // timeFromInMilli:new Date(timeFrom).getTime(),
        //             timeTo,
        //             // timeToInMilli:new Date(timeTo).getTime(),
        //             slots,
        //             date,
        //             key,
        //             key2,
        //             status: 'booked',
        //             // totalSlots: status.slots,
        //             // remainingSlots: status.slots - slots
        //         })
        //         // set(ref(db, `admin/createParking/${key}`), {

        //         //     area: JSON.parse(area).area,

        //         //     key,
        //         //     location,

        //         //     slots: status.slots - slots

        //         // })
        //     }

        // }


    }

    // const object={
    //     location,
    //     timeFrom,
    //     timeTo,
    //     slots,
    //     date,
    //     key,

    // }


    // console.log(object)













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
        // console.log(JSON.parse(e.target.value))
        setKey(JSON.parse(e.target.value).key)
        let arr = []
        let slots = JSON.parse(e.target.value).slots
        for (let i = 1; i <= slots; i++) {
            arr.push(i)


        }
        setBoxes(arr)
    }


    // const checkd = () => {
    //     dataCheck ? dataCheck.map(val => {

    //         if (val) {
    //             // let tt2=(val.data.timeTo).getTime()
    //             let tt2 = new Date(val.data.timeTo).getTime()
    //             let tf2 = new Date(val.data.timeFrom).getTime()
    //             console.log("timeTo database", tt2)
    //             console.log("timeFrom databse", tf2)
    //             // let difft = tt2 - tt1
    //             // let difff = tf2 - tf1
    //                 console.log("tt1",tt1)
    //                 console.log("tf1",tf1)


    //             // if (difff > difft) {

    //             //     alert('booked')

    //             // }
    //             // else if (difff < difft) {

    //             //     alert('Space')

    //             // }
    //             // else if (tf1 == null && tt1 == null) {

    //             //     alert('Space')
    //             // }

    //             // else if ((tf2 !== null && tt2 !== null) && (tf1 == null && tf2 == null)) {
    //             //     alert('space hai abhi...')
    //             // }


    //             // if(tf1+tf1 > tf2+tt2){
    //             //     alert('Not Space')
    //             // }
    //             // else if((tf1+tf2 == '' || tf1+tf2 == null) )
    //             // {
    //             //     alert('Space is Available')
    //             // }
    //             // else if((tt1+tt2 !== '' || tt1+tf2 !==null) && (tt1+tt2 == '' || tt1+tt2 == null) )
    //             // {
    //             //     alert('Space is availabe')
    //             // }


    //             // if (tf1 > tf2 && tt1 > tt2) {
    //             //     alert('No space')
    //             // }
    //             // else if (tf1 > tf2 && tt1 < tt2) {
    //             //     alert('No space')

    //             // }
    //             // else if (tf1 < tf2 && tt1 > tt2) {
    //             //     alert('No space')

    //             // }
    //             // else if (tf1 < tf2 && tt1 < tt2) {
    //             //     alert('SPace hai abh')
    //             // }
    //             // else if (tf1 < tf2 && tt1 > tt2) {
    //             //     alert('No Space')
    //             // }
    //             // else if(tf1 =='' && tt1==''){
    //             //     alert('Space ha abhi')
    //             // }
    //             // else if((tf1 =='' && tt1=='') && (tf2 ==='' && tt2==='')){
    //             //     alert('Please Choose Time')
    //             // }
    //             // else if((tf1 !='' && tf2 == '') && ( tt1 !='' && tt2 =='' )){
    //             //     alert('Space Hai abhi...!')
    //             // }


    //         }
    //         // alert('Please... Choose The Location and Area , then Time')

    //     }) : console.log('')
    // }

    useEffect(() => {
        let areaLoc2 = area ? JSON.parse(area).area : ''
        let tf = new Date(timeFrom).getTime()
        settime1(tf)
        let tt = new Date(timeTo).getTime()
        settimet2(tt)
        const db = getDatabase();
        const dbRef = ref(db, `users/booking/${location}/${areaLoc2}/${open.id}`);

        onValue(dbRef, (snapshot) => {
            var array = []
            const data = snapshot.val()

            // snapshot.forEach((childSnapshot) => {
            //     const childKey = childSnapshot.key;
            //     const childData = childSnapshot.val();
            //     console.log(childData)
            //     const obj = { data: childData, key: childKey }
            //     array.push(obj)

            //     // ...
            // });
            setCheckData(data)
        }

        );



    }, [timeFrom, timeTo, location, area, open])







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

                    <div style={{ display: 'flex', marginTop: 60, height: 200, justifyContent: 'space-around' }}>
                        <div className='slots'>
                            {

                                boxes.map((val, i) => (
                                    <Button variant='outlined' color='success' onClick={() => setOpen({ value: true, value2: false, id: val })} key={i}>{val}</Button>

                                ))

                            }
                            <Modal open={open.value} aria-labelledby="modal-modal-title"
                                onClose={handleClose}
                                aria-describedby="modal-modal-description">
                                <Card className='cardBook' >

                                    <Typography className='modaltext'>Date</Typography>
                                    <TextField className='modalInp' placeholder='Time(From) ' type='datetime-local' onChange={e => setDateM(e.target.value)} /><br />
                                    {/* <TextField className='modalInp' placeholder='Time(From) ' type='datetime-local' onChange={e => setTimeFrom(e.target.value)} /><br />
                                    <Typography className='modaltext'>To</Typography>
                                    <TextField className='modalInp' placeholder='Time (To)' type='datetime-local' onChange={e => setTimeTo(e.target.value)} /><br /> */}
                                    <Button variant='contained' className='modalbtn' color='primary' onClick={() => submitData(open.id)} >Submit</Button>
                                </Card>

                            </Modal>
                        </div>
                        {/* <Boxes value={status ? status.slots : 0 } /> */}
                        {/* <h1>{finalSlotsCheck ? finalSlotsCheck : 'Loading..'}</h1> */}

                    </div>
                    {/* <Button onClick={checkd}>Check</Button> */}
                    {/* <TextField placeholder='Parking Slots' type='number' onChange={e => setSlots(e.target.value)} /><br /> */}
                    {/* <Typography>From</Typography>
                    <TextField placeholder='Time(From) ' type='datetime-local' onChange={e => setTimeFrom(e.target.value)} /><br />
                    <Typography>To</Typography>
                    <TextField placeholder='Time (To)' type='datetime-local' onChange={e => setTimeTo(e.target.value)} /><br /> */}

                    {/* <Button variant='contained' color='primary' onClick={BookingNow} >Book Now</Button> */}
                </Card>
            </div>

        </Paper>
    )
}

export default Booking



// const Boxes = (props) => {
//     const [boxes,setBoxes]=useState([])

// let arr=[]
//     for(let i=0; i<20; i++){
// arr.push(i)


//      }
// setBoxes(arr)

//  return (
// <>
// {
//     boxes ? boxes.map((val)=>(
//         <h6>{val}</h6>
//     )):''
// }

// </>


//     )
// }