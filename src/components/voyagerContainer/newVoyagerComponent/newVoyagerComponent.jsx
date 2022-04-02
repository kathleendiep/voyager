import { useState } from 'react'
import './newVoyagerComponent.css'

const NewVoyagerComponent = (props) =>{
    // set as false, so it won't show as form 
    const [showing, setShowing] = useState(false)
    // 1. function that setShowing function as TRUE! = !true when clicked on 
    const toggleShowing = () => {
    // 2. set variable to the opposite
        setShowing(!showing)
    }
    // 3. keep track and build object as user updates form 
    // 0. set the keys to the object keys: name, city
    const [newVoyager, setNewVoyager] = useState({
        name: "",
        city: "",
        state: "",
        address: "",
        category: "", 
        description: "",
        link: "",
        img: ""
    })
    // 4. see if input is valid 
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})
    // ------------- FUNCTIONS ---------------
    const handleInputChange = (e) => {
        // recall function
        setNewVoyager({
            // list out all the old objects
            ...newVoyager,
            // finds the value and sets it 
            [e.target.name]: e.target.value
        })
    }
    // 5. Create function to submit an item 
    const submitNewVoyager = (e) => {
        e.preventDefault()
        let validSubmission = true;
        // front end validation 
        if(newVoyager.name.length < 2){
            setIsValidState({
                valid: false, 
                message: "Name needs to be longer"
             })
            validSubmission = false;
        }
        // if it is a validsubmission we can create and set new item 
        if(validSubmission){
            // from parent function
            props.createNewVoyager(newVoyager)
            // 1. set the voyager
            setNewVoyager({
                name: "",
                city:  "",
                state:  "",
                address:  "",
                category: "",
                img: "",
                link:  "",
                description:  ""
            })
            // set the valid state to true to show message
            setIsValidState({
                valid: true,
                message: ""
            })
            // set showing to false to end it 
            setShowing(false)
        }
    }
    return(

        <>
            {/* Create a Tenary - only show when needed - if showing = true, then it will show form */}
            {
                showing
                ?
                <div id="new-item-form">
                    {/* this will make the showing set from true to false and close out the div */}
                    <button onClick={toggleShowing}>X</button>
                    {/* create the onSubmit form */}
                    <form onSubmit={submitNewVoyager}>
                        {/* if isValidState.valid return null, else - show an error  */}
                        { isValidState.valid ? null :<p className="form-error">{isValidState.message}</p> }
                        {/* if there is a server error then show there is an error */}
                        { props.newItemServerError ? <p className="form-error">{props.newItemsServerError}</p> : null } 
                        {/* onChange listens to whats in here based on function - put this on both*/}
                        {/* name needs to be same as model schema */}
                        {/* data binding - backend and front end sync */}
                        Name: <input onChange={handleInputChange} type="text" name="name" value={newVoyager.name}/>
                        City: <input  onChange={handleInputChange} type="text" name="city" value={newVoyager.city}/>
                        State: <input  onChange={handleInputChange} type="text" name="state" value={newVoyager.state}/>
                        Address: <input  onChange={handleInputChange} type="text" name="address" value={newVoyager.address}/>
                        Category: <input onChange={handleInputChange} type="text" name="category" value={newVoyager.category}/>
                        Description: <input  onChange={handleInputChange} type="text" name="description" value={newVoyager.description}/>
                        Image Link: <input  onChange={handleInputChange} type="text" name="img" value={newVoyager.img}/>
                        <br></br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                :
                //* refer to toggleShowing function to set showing to TRUE to show new item form 
                <button onClick={toggleShowing} className="button">Let's add one!</button>
            }
        </>
    )
}

export default NewVoyagerComponent 