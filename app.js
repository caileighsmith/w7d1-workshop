const {buildDB} = require('./db/populateDataBase')
const {Cheese} = require('./models/Cheese')

const express = require('express')
const path = require('path')
const port = 5000

const app = express()


app.get('/cheese/:cheeseChoice', async(req,res)=>{
    //Querying to see if cheeseChoice (param var) is in the DB
    let findingCheese = await Cheese.findOne({
        where:{
            title: req.params.cheeseChoice
        }
    })
    //If the query came back, then we create a payload and send it back to user.
    if (findingCheese){
        let payload = {
            title: findingCheese.title,
            description: findingCheese.description
        }
        await res.send(payload)
    //No query means no payload, which means, no cheese.
    }else{
        await res.send('no cheese named '+req.params.cheeseChoice)
    }
    
    
})



buildDB()

app.listen(port, ()=> {console.log('hosted @port '+port)})

