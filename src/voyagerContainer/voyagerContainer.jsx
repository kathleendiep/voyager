import {useEffect, useState} from 'react'
import './voyagerContainer.css'; 
import SingleItemComponent from './singleItemComponent/singleItemComponent';
import NewVoyagerComponent from './newVoyagerComponent/newVoyagerComponent';
// import any children 


// 0. make the function
const VoyagerContainer = () => {
    const [voyagers, setVoyagers] = useState([{'_id':'1','name': 'Farmhouse','location': 'San Francisco', 'category': 'food', 'img':'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/store/header/109873.jpg', 'description': 'Thai Food with colorful spreads!'}]);
     console.log(voyagers[0])
    const [newItemServerError, setNewItemsServerError] = useState("");
    const [requestError, setRequestError] = useState("")

    // INDEX: GET function to setVoyagers
    const getVoyagers = async () => {
        try{
            const voyagers = await fetch("http://localhost:3001/voyagers")
            const parsedVoyagers = await voyagers.json();
            setVoyagers(parsedVoyagers.data)
        }catch(err){
            console.log(err)
            //TODO 
        }
    }
    //  Create: POST
    // newVoyager = defined in the child
    // but this createNewVoyager needs to be defined in the PARENT STATE 
    // newVoyager it is set in the child 
    const createNewVoyager = async (newVoyager) =>{
        console.log("Let's create this!");
        console.log(newVoyager)

        // POST method 
        // make sure to put localhost:3001 - to the backend 
        const apiResponse = await fetch("http://localhost:3001/items",{
            method: "POST",
            // stringify the object newVoyager
            body: JSON.stringify(newVoyager),
            // Boilerplate: its coming from json
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json();
        // make sure it shows: {success:true,data: object}
        console.log(parsedResponse)
        // if it is successful, then add to items
        if(parsedResponse.success){
        // // If the response is success:
        //     // Add item to state! 
                // add the parsed response to setItems
            setVoyagers([parsedResponse.data, ...voyagers])
        }else{
            setNewItemsServerError(parsedResponse.data)
        // TO DO: Refactor state from newItemForm to here 
        }
    }
    // DELETE: delete
    // LIFTING STATE PATTERN
    // 1. Write function that changes state
    // 2. Give function to child 
    // 3. Child calls it 
    const deleteVoyager = async (idToDelete) => {
        // connect front end to the back end 
        try{const apiResponse = fetch(`http://localhost:3001/voyagers/${idToDelete}`,{
            method: "DELETE"
        })
        const parsedResponse = await apiResponse.json()
        // if parsedResponse.success = true 
        if(parsedResponse.success){
            console.log("deleting item ID")
            // .filter - execute everything in array if it passed test 
            // if returns false, then it does not put in array, the false one is the idToDelete
            const newVoyagers = voyagers.filter(voyager=> voyager._id !== idToDelete)
            // then set the newVoyger
            setVoyagers(newVoyagers)
        }else{
            // HANDLE AN UNSUCCESSFUL DELETE
        }
    }catch(err){
        console.log(err)
        setRequestError(err.message)
        // TODO: Handle front-end error 
    }
    }

    // UPDATE: put
    const updateVoyager = async (idToUpdate, voyagerToUpdate) => {
        const apiResponse = await fetch(`http://localhost:3001/voyagers/${idToUpdate}`,{
            method: "PUT",
            body: JSON.stringify(voyagerToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json();
        if (parsedResponse.success){
            const newVoyagers = voyagers.map(voyager=> voyager._id === idToUpdate ? voyagerToUpdate : voyager )
            setVoyagers(newVoyagers)
        }else{
            setRequestError(parsedResponse.data)
     }
    }
    return(
        <div className="voyager-container">
            <h2 className="title">VoyagerContainer</h2>
            <span className="new-voyager-component">
                <NewVoyagerComponent setNewItemsServerError={setNewItemsServerError} createNewVoyager={createNewVoyager}></NewVoyagerComponent>
            </span>
            <span>
              {voyagers.reverse().map((voyager)=>{
                    return <SingleItemComponent key={voyager._id} voyager={voyager} updateVoyager={updateVoyager} deleteVoyager={deleteVoyager}></SingleItemComponent>
                })}
            </span>
        </div>
    )
}

export default VoyagerContainer