import React, { Fragment,useState } from "react";

const Inputanime = () => {
    const [description,setdescription] = useState("")//returns a value and updates it 
           //this is are state and setdes is a way to set the state and usestate is default value
    const onSubmitform = async(e) =>{
        e.preventDefault()
        try {
            const body = { description};
            const response = await fetch("http://localhost:5000/anime",{
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(body)
        });
        window.location = "/" // so now that the responce has been sent it is going to referesh 
        } catch (err) {
            console.error(err.message)
        }
    }

	return (
		<Fragment>
			<h1 className="text-center mt-5">Input anime</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitform}>
                <input type="text" className="form-control" value={description} onChange={e => setdescription(e.target.value)}/>
                <button className="btn btn-success">Add</button>
            </form>
		</Fragment>
	);
};

export default Inputanime;
