import React,{useState,useEffect} from 'react'
import {TextField,Card,Button, Typography,Modal}  from '@mui/material'
// import './admin.csss'
import {getDatabase,ref,onValue,set,push}  from 'firebase/database'




const FeedbackAndReply = () => {
const [message2,setMessage]=useState('')
const [finalData,setFinalData]=useState([])
const [open,setOpen]=useState({})

console.log(finalData)
useEffect(()=>{
    const db = getDatabase();
    const starCountRef = ref(db, `users/queries/` );
    onValue(starCountRef, (snapshot) => {
      let data = snapshot.val();
        if(data){
            let keyss=Object.keys(data)
            let array=[]
            for(let j=0; j<keyss.length; j++){
                
                let keyss2=keyss[j]
                let dataFinalFor=data[keyss2]
                let dataDone=Object.values(dataFinalFor)
                // console.log(dataDone)
                array=[...array,...dataDone]
                // array.push(dataFinalFor)
                // let keyss3=Object.values(dataFinalFor)
                // for(let j=0; j<keyss3)
                // console.log(keyss3)
                
                // if(keyss3){
                //     let array=[]
                //     for(let k=0; k<keyss3.length; k++){
                    //         const keyFinal=keyss3[k]
                    //         const dataFinalAgain=dataFinalFor[keyFinal]
                //         const object={data:dataFinalAgain,key:keyFinal}
                //         // console.log(object)
                //         array.push(object)
                //     }
                //     setDataFinalFeedBack(array)
                // }
                
            }
        setFinalData(array)

        }
   


    });




},[])


const MessageSend=(uid,uemail,message)=>{
    console.log(uid,uemail,message)
    const db = getDatabase()
    // const key=push(child(ref(db),'admin')).key;
    push(ref(db, `users/queries/${uid}`), {
       
        reply:message2
    }).then((success)=>{
        alert('successfully...updated')
    }).catch(err=>{
        alert('Error')
    })




}



    return (
        <div>
            <h1>Feedbacks and reply</h1>
            <Card>

            
            
            <div className='message1'>
            {
                finalData ? finalData.map((value)=>(
                    <Card className='meesage2'>
                        <Typography>{value.uemail}</Typography>
                        <Typography>
                        {value.message} 
                            
                        </Typography><br/>
                        <Button onClick={()=>setOpen({value:true,uid:value.uid,uemail:value.uemail,message:value.message})}>Reply</Button>
                    </Card>
                ))  :''
            }
            </div>
            </Card>

<Modal open={open.value}>
<Card className='modalForReply'>
    <Button  onClick={()=>setOpen({value:false,uid:''})} >X</Button>
            <Typography>{open.uemail}</Typography>
            <Typography>{open.message}</Typography>
            <TextField onChange={e=>setMessage(e.target.value)} style={{marginBottom:10}} placeholder='Write Message............' />
           
            <Button variant='contained' color='info' onClick={()=>MessageSend(open.uid,open.uemail,open.message)} >Send</Button>

      </Card>      

</Modal>


        </div>
    )
}

export default FeedbackAndReply
