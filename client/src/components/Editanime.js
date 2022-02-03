import React, { Fragment, useState } from "react";


//we want to send in a prop
const Editanime = ({anime}) => {
    const [description,setdescription] = useState(anime.description)
    console.log(anime);

    //now we are going to create an edit function that will send the data to the backend
    const updateAnime = async (e) =>{
        e.preventDefault();

        try {
            const body = { description};
            const responce = await fetch(`http://localhost:5000/anime/${anime.anime_id}`,{
            method:"PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(body)
        })
        window.location = "/"
        } catch (err) {
            console.error(err.message)
        }
    }

	return (
		<Fragment>
			<button
				type="button"
				class="btn btn-warning"
				data-toggle="modal"
				data-target={`#id${anime.anime_id}`}
			>
				Edit
			</button>

			<div class="modal" id={`id${anime.anime_id}`}>
				<div class="modal-dialog">
					<div class="modal-content">
						
						<div class="modal-header">
							<h4 class="modal-title">Edit Anime</h4>
							<button type="button" class="close" data-dismiss="modal" onClick={()=>setdescription(anime.description)}>
								&times;
							</button>
						</div>
						<div class="modal-body">
							<input type="text" className="form-control" value={description} onChange={e => setdescription(e.target.value)}/>
							<div class="modal-footer">
                            <button
									type="button"
									class="btn btn-warning"
									data-dismiss="modal"
                                    onClick={e => updateAnime(e)}
								>
									Edit
								</button>

								<button
									type="button"
									class="btn btn-danger"
									data-dismiss="modal"
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Editanime;
