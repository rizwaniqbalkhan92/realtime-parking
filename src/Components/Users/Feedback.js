import React, { useEffect, useState } from 'react'
import { TextField, Card, Button, Typography } from '@mui/material'
import './user.css'
import { getDatabase, ref, set, push, onValue } from "firebase/database";


const Feedback = () => {

    const [message, setMessage] = useState('')
    const [dataFinal, setDataFinal] = useState([])
    const dataLocal = localStorage.getItem("userdata")
console.log(dataFinal)
    const uid = JSON.parse(dataLocal).uid
    const uemail = JSON.parse(dataLocal).uemail

    const MessageSend = () => {


        const db = getDatabase();
        //   const key=push(ref(uid)).key
        push(ref(db, `users/queries/${uid}`), {
            message,
            uemail,
            uid
        });




    }

    useEffect(() => {
        const db = getDatabase();
        const starCountRef = ref(db, `users/queries/${uid}`);
        onValue(starCountRef, (snapshot) => {
            let data = snapshot.val();
            let dataKey = Object.keys(data)
            console.log(dataKey)
            if (dataKey) {
                let array=[]
                for (let i = 0; i < dataKey.length; i++) {
                    const keys = dataKey[i]
                    const dataFormatetd = data[keys]
                    const object={
                        data:dataFormatetd,key:keys
                    }
                    array.push(object)
                }
                setDataFinal(array)
            }
            console.log(data)
            //   updateStarCount(postElement, data);
        });


    }, [])

    return (
        <div>
            <h1>Feedbacks</h1>
        
            <Card className='feedback' style={{height:800,overFlow:'scroll'}}>

                {
                    dataFinal !==null && dataFinal !==undefined  ? dataFinal.map((val) => (
                        <>
                        <Card className='messageSend'>
                            <Typography>{val.data.message}</Typography><br />
                        </Card>
                       
                        <Card className={val.data.reply ? 'reply' : 'noreply'}>
                            <Typography>{val.data.reply ? val.data.reply : ''}</Typography><br />
                        </Card>
                       
                       
                       </>
                    )) : <h1>Loading.......</h1>
                }

                <div className='message'>
                    <TextField fullWidth onChange={e => setMessage(e.target.value)} placeholder='Write Message............' />
                    <Button onClick={MessageSend} variant='contained' color='primary' >Send</Button>
                </div>

            </Card>
        </div>
    )
}

export default Feedback
