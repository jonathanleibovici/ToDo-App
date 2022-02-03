const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); // now we can wright quries
const e = require("express");

//middleware
app.use(cors());
app.use(express.json()); //gives us accsess to the req.body

//routes

//create a animelist
app.post("/anime", async (req, res) => {
	try {
		const { description } = req.body; //this is coming from the client side
		const newAnimeList = await pool.query(
			"INSERT INTO anime (description) VALUES($1) RETURNING *",
			[description]
		); //the [description would be the value of the $1]

		res.json(newAnimeList.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
}); //why post bc we are going to add data

//get all animelist
app.get("/anime", async (req, res) => {
	try {
		const allanime = await pool.query("SELECT * FROM anime");

		res.json(allanime.rows);
	} catch (error) {
       console.error(err.message);
    }
});

//get a anime
//now we want to get 1 anime
app.get("/anime/:id",async(req,res)=>{//this will allow are url to be dynamic 
    try {
        const {id} = req.params // this is to get the params id 
        const ananime = await pool.query("SELECT * FROM anime WHERE anime_id = $1",[id])

        res.json(ananime.rows[0])
    } catch (error) {
        console.error(err.message);
    }
    
})

//update a anime
app.put("/anime/:id",async (req,res)=>{
	try {
		const {id} = req.params // we want to update the id so grab the id again
		const {description} = req.body // we also want to grab the description so we can update the info
		const updateAnime = await pool.query("UPDATE anime SET description = $1 WHERE anime_id = $2",[description, id]);
		res.json("it was updated");
	} catch (error) {
		console.error(err.message)
	}

})

//delete a anime
app.delete("/anime/:id", async(req,res)=>{
	try {
		const { id } = req.params; //we want to specify what we want to delete 
		const deleteAnime = await pool.query("DELETE FROM anime WHERE anime_id = $1",[id])
		res.json("anime was deleted")
	} catch (error) {
		console.error(err.message)
	}
})

//server to start listens on port5k
app.listen(5000, () => {
	console.log("working on port 5k");
});
///this is completed a restful api with postgres 