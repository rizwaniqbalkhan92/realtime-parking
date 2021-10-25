import React, { useEffect, useState } from 'react'
import { getDatabase, onValue,remove, ref, update, set } from 'firebase/database'
import './admin.css'
import { Card, Typography, Button, Modal, TextField } from '@mui/material'
import { ConstructionOutlined } from '@mui/icons-material'


const ViewParkingPlaces = () => {
    const [data2, setData] = useState([])
    const [open, setOpen] = useState({})
    const [updateLocation, setUpdateLocation] = useState('')
    const [updateSlots, setUpdateSlots] = useState(0)
    const [updateArea, setUpdateArea] = useState('')

    console.log(data2)
    useEffect(() => {

        const db = getDatabase();
        const dbRef = ref(db, 'admin/createParking/');

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


    const updateParking = (key) => {
        const db = getDatabase()
        // const key=push(child(ref(db),'admin')).key;
        set(ref(db, 'admin/' + key), {
            area: updateArea,
            location: updateLocation,
            slots: updateSlots
        }).then((success)=>{
            alert('successfully...updated')
        }).catch(err=>{
            alert('Error')
        })




    }
    const deleteParking = (key) => {
        alert(key)
        const db = getDatabase()
        // const key=push(child(ref(db),'admin')).key;
        remove(ref(db, 'admin/' + key)).then((success)=>{
            alert('successfully...delete')
        }).catch(err=>{
            alert('Error delkete')
        })


    }

    // const data=[
    //     {location:'saddar',area:'luckystar',slots:100},
    //     {location:'saddar',area:'regal',slots:70},
    //     {location:'saddar',area:'empress market',slots:50},
    //     {location:'gulshan',area:'Block-1',slots:40},
    //     {location:'gulshan',area:'block-2',slots:20},
    //     {location:'gulshan',area:'block-3',slots:200},
    //     {location:'gulistan-e-johar',area:'Block-5',slots:300},
    //     {location:'gulistan-e-johar',area:'Block-6',slots:150},
    //     {location:'gulistan-e-johar',area:'Block-4',slots:70},
    //     {location:'gulistan-e-johar',area:'Block-7',slots:30},
    // ]

    return (

        <div>
            {
                data2.map((value, ind) => (
                    <Card className='cardParkingPlace'>
                        <Typography>{value.data.location}</Typography>
                        <Typography>{value.data.area}</Typography>
                        <Typography>{value.data.slots}</Typography>
                        <Button variant='contained' color='primary' onClick={() => setOpen({ value: true, key: value.data.key })}>Update</Button>
                        <Button variant='contained' color='info' onClick={() => deleteParking(value.data.key)}>Delete</Button>
                    </Card>
                ))
            }
            <Modal open={open.value}   >

                <Card className='updateModal' >
                    <Button onClick={() => setOpen({ value: false, key: '' })} >X</Button>
                    <TextField placeholder='Location Name' fullWidth={true} onChange={e => setUpdateLocation(e.target.value)} />
                    <TextField placeholder='Area' fullWidth={true} onChange={e => setUpdateArea(e.target.value)} />
                    <TextField placeholder='Number Of Slots' fullWidth={true} onChange={e => setUpdateSlots(e.target.value)} />
                    <Button onClick={() => updateParking(open.key)}>Confirm</Button>
                </Card>
            </Modal>
        </div>
    )
}

export default ViewParkingPlaces
