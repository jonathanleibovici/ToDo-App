import React, { Fragment, useEffect, useState } from "react";
import Editanime from "./Editanime";

//useEffect is going to do make a fetch request to a=our restful api everytime this compont is rendered

const Listanime = () => {
	// now that we get back are data in json format we want to create a state
	const [anime, setAnime] = useState([]);
	// the delete function
    // we want to pass an agrument bc we want to get the id 
	const deleteAnime = async (id) => {
		try {
            // here we want to make a delete fetch request
            const deleteAnime = await fetch(`http://localhost:5000/anime/${id}`,{
                method:"DELETE"
            });
            // console.log(deleteAnime);
            //instead of having to keep refseshing we want to add a filter so we will do this
            //here we are going to have a condition and it if it fits it will only return those
            //so we are saying anime the anime_id if it does not match return those ids that dont match 
            setAnime(anime.filter(anime=>anime.anime_id!== id))
		} catch (err) {
            console.error(err.message)
        }
	};

	const getAnime = async () => {
		try {
			const responce = await fetch("http://localhost:5000/anime"); // by deafult fetch makes a get request
			const jsonData = await responce.json(); // we are going to get back data so we need to parse it

			// console.log(jsonData) now instead of this we are going to set the state
			setAnime(jsonData);
		} catch (err) {
			console.error(err.message);
		}
	};
	//this will keep rendering the page to get the lateset data
	useEffect(() => {
		getAnime();
	}, []); // this [] is to make sure we get one request

	return (
		<Fragment>
			<table class="table mt-5 text-center">
				<thead>
					<tr>
						<th>description</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{/* 	<tr>
						<td>John</td>
						<td>Doe</td>
						<td>john@example.com</td>
					</tr>*/}
					{anime.map((anime) => (
						<tr key={anime.anime_id}>
							<td>{anime.description}</td>
							<td><Editanime anime ={anime} /></td>
							<td>
								<button
									className="btn btn-danger"
									onClick={() => deleteAnime(anime.anime_id)}
								>
									delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	);
};

export default Listanime;
