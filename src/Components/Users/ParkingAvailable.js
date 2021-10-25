import React, { useEffect ,useState} from 'react'
import './user.css'
import {Card,Typography,Button, TextField}  from '@mui/material'
import {getDatabase,onValue,ref}  from 'firebase/database'


const ParkingAvailable = () => {

const data=[1,2,3,4,5,6]
const [data2,setData2]=useState([])
const [search,setSearch]=useState('')

useEffect(()=>{

    const db = getDatabase();
    const starCountRef = ref(db, 'admin/createParking/' );
    let array=[]
    onValue(starCountRef, (snapshot) => {
        let data = snapshot.val();
        let key=Object.keys(data)
     if(key){
        for(let i=0; i<key.length; i++){
            const keys=key[i]
            const dataFinal=data[keys]
            const obj={data:dataFinal,key:keys}
            array.push(obj)
            setData2(array)
            
        }
        }
    //   updateStarCount(postElement, data);
});



},[])

    return (
        <>
            <h1>Parking Available</h1>
            {/* <TextField type='search' placeholder='search location' onChange={e=>setSearch(e.target.value)} /> */}
        <div className='parking'>
   
        
{
    data2 ? data2.map((val)=>(
                    <Card  className={val.data.slots == 0 ?  'avaailableParkingRed' : 'avaailableParkingYellow' }  >
                      <Typography className='availText'>Location: {val.data.location}</Typography>
                      <Typography className='availText'>Area: {val.data.area}</Typography>
                      <Typography className='availText'>No. Of Slots: {val.data.slots}</Typography>
            </Card>

    )):''
}
             
            

        </div>
        </>
    )
}

export default ParkingAvailable
