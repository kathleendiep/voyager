import {useState} from 'react'
import './singleItemComponent.css'

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
        location: props.voyager.location,
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
   }


    return(
         <div className="single-item-component">
             <h3>items go here</h3>
             <h4>{props.voyager.name}</h4>
             <p><img className="image-voyager" src={props.voyager.img}></img></p>
             <h4>{props.voyager.location}</h4>
             <h4>{props.voyager.category}</h4>
             <h4>description: {props.voyager.description}</h4>
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
                        Location: <input  onChange={handleInputChange} type="text" name="location" value={updateVoyager.location}/>
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
    )
}

export default SingleItemComponent