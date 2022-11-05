const express = require("express");
const { json } = require("express");
//const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const {v4: uuid} = require("uuid");

const app = express();

app.use(json());

app.use("/", routes);

const port = process.env.PORT || 3000;

//flight list
let flightList = [
  
];
//Rest api

//targeting all flights
app.route("/flights")
//creating a new flight
.post(async (req,res) => {
 
  try{
    //create a new flight schedule
    const {title, time, price, date} = await req.body;
    const flight = {
      id : uuid(),
      title,
      time,
      price,
      date
    }
    
    //save flight
    flightList.push(flight);
    //send back a response 
    return res.status(200).json({
      message: "new flight scheduled",
      flightList
    });
  } catch(err){
    res.status(500).json({message :err});
    res.status(404).json({message :err});
  }
})
//Fetching flights
.get((req,res) => {
  //fetch flights
  //send response
  try{
    // const flights = models;
    return res.status(200).json({flightList});
  } catch(err){
    res.status(500).json({message :err});
    res.status(404).json({message :err});
  }
});

//targeting specific flights
app.route("/flights/:id")
//fetch single flight
.get( async (req,res)=>{
  try{
  let query = await req.params.id;
  let foundFlight = await flightList.find(flight => {
    return String(flight.id) === query;
  });

  return res.status(200).json({fight : foundFlight});
  } catch(err){
    res.status(500).json({message :err});
    res.status(404).json({message :err});
  }
})
//update or edit a flight
.patch(async(req,res) => {
  try{
  let index = req.params.id;
  let changes = req.body;
  let objIndex = flightList.findIndex((obj => obj.id == index));
  flightList[objIndex] = changes;
  return res.status(200).json({flightList});
  } catch(err){
    res.status(500).json({message :err});
    res.status(404).json({message :err})
  }
})
//delete
.delete((req, res)=>{
  try{
  const query = req.params.id;
  const deleteFlight = flightList.indexOf(query);

  flightList.splice(deleteFlight, 1);
  return res.status(200).json({flightList});
  } catch(err){
    res.status(500).json({message :err});
    res.status(404).json({message :err})
  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
