const {buildDB} = require('./db/populateDataBase')
const {Cheese} = require('./models/Cheese')

const express = require('express')
const path = require('path')
const port = 5000

const app = express()


//Using an anonymous async function so that it waits for content to be loaded before execution
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
        await console.log(payload)
        await res.send(payload)
    //No query means no payload, which means, no cheese.
    }else{
        await console.log(payload)
        await res.send("No cheese named '"+req.params.cheeseChoice+"'")
    }
    
    
})



buildDB()

app.listen(port, ()=> {console.log('hosted @port '+port)})

