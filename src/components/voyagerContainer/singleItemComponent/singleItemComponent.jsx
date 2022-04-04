import {useState} from 'react'
import './singleItemComponent.css'
import { Redirect } from "react-router-dom";

const SingleItemComponent = (props) => {
    // only when condition is true that it will pop up 
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    // set the validState as true and if its false, it will show an error 
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})
    // update 
    const [updateVoyager, setUpdateVoyager] = useState({
        // make sure this is refer to item array
        name: props.voyager.name, 
        city: props.voyager.city,
        state: props.voyager.state,
        address: props.voyager.state,
        category: props.voyager.state,
        img: props.voyager.img,
        description: props.voyager.description,
        link: props.voyager.link,
        // make sure that the item is assigned to a unique ID 
        _id: props.voyager._id
    })
    const handleInputChange = (e) => {
        // recall the function and set it 
        setUpdateVoyager({
            // use spread operator - to give all old properties 
            ...updateVoyager,
            // finds the name and sets to value
                // make sure to put in brackets - 
                // e.target.value - whatever is entered into the search input 
            [e.target.name]: e.target.value 
        })
    }
    // 1. create this function to update an item 
    // we set validsubmission to true 
    const submitUpdateVoyager = (e) => {
        // preventDefault - if this does not get handled then it should not be taken as it normally would be
       e.preventDefault();
       //from the parent updateItem - get the id and update the item 
       props.updateVoyager(props.voyager._id, updateVoyager)
       console.log("updatingItem!")
       return < Redirect to="/" />; 
   }
    return(
        <div className="single-item-component">
            {/* CARD ELEMENT */}
            <div class="cards">
                {/* IMAGE */}
                <div class="card">
                    <div class="img"><img className="image-voyager" src={props.voyager.img}></img></div>
                    <div class="card__body">
                    <div class="card__color-picker">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <h3 className="card-title">{props.voyager.name}</h3>
                <li className="card-jobtitle">{props.voyager.category}</li>
                {/* if has a city, print out, if not don't */}
                { props.voyager.city ? <p> {props.voyager.city}, {props.voyager.state}</p>: "___" } 
                <div class="card-content">
                    <div class="card-subtitle">ABOUT</div>
                    <p class="card-desc"> {props.voyager.description}</p>
                </div>
                      {/* UPDATE AND DELETE BUTTONS */}
            <div class="card-buttons">
            {/* ---------------- delete button ---------------- */}
                <button onClick={()=>{
                // finds the id of item
                props.deleteVoyager(props.voyager._id)
                }}>Delete</button>
            {/* ---------------- UPDATE --------------------- */} 
                {/* if its showing = true, then show this create new form, else show CREATE NEW ITEM button*/}
                {/* by default, showing will be false, unless button clicked, then it will show true!  */}
                <>
                {
                    showing 
                    ? 
                    <div id="new-item-form">
                    {/* this will make the showing set from true to false and close out the div */}
                    <button onClick={toggleShowing}>X</button>
                    {/* create the onSubmit form */}
                    <form onSubmit={submitUpdateVoyager}>
                    {/* if isValidState.valid is false - show an error  */}
                    { isValidState.valid ? null :<p className="form-error">{isValidState.message}</p> }
                    {/* onChange listens to whats in here based on function - put this on both*/}
                    {/* name needs to be same as model schema */}
                    {/* data binding - backend and front end sync */}
                    Name: <input onChange={handleInputChange} type="text" name="name" value={updateVoyager.name}/>
                    City: <input onChange={handleInputChange} type="text" name="city" value={updateVoyager.city}/>
                    State: <input  onChange={handleInputChange} type="text" name="state" value={updateVoyager.state}/>
                    Address: <input  onChange={handleInputChange} type="text" name="address" value={updateVoyager.address}/>
                    Category: <input onChange={handleInputChange} type="text" name="category" value={updateVoyager.category}/>
                    Description: <input  onChange={handleInputChange} type="text" name="description" value={updateVoyager.description}/>
                    Image Link: <input  onChange={handleInputChange} type="text" name="img" value={updateVoyager.img}/>
                    <br></br>
                    <button type="submit">Submit</button>
                    </form>
                    </div>
                    :
                    //* refer to toggleShowing function to set showing to TRUE to show new item form 
                    <button onClick={toggleShowing}> Edit Item</button>
                }
                </>
            </div>
            </div>
        </div>
        </div>
        </div>
    )
}

    export default SingleItemComponent