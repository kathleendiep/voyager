import { useEffect, useState}  from 'react'
// import any children 
import SingleItemComponent from './singleItemComponent/singleItemComponent';
import NewVoyagerComponent from './newVoyagerComponent/newVoyagerComponent';
import SearchBar from '../searchBar/searchBar';
import { Redirect } from "react-router-dom";
import './voyagerContainer.css'

// 0. make the function
const VoyagerContainer = (props) => {
    // {"name": "Farmhouse","location": "San Francisco", "category": "food", 'img':'https://img.cdn4dd.com/cdn-cgi/image/fit=cover,width=600,height=400,format=auto,quality=50/https://doordash-static.s3.amazonaws.com/media/store/header/109873.jpg', 'description': 'Thai Food with colorful spreads!'}
    const [voyagers, setVoyagers] = useState([]);
    //  console.log(voyagers[0])
    const [newItemServerError, setNewItemsServerError] = useState("");
    const [requestError, setRequestError] = useState("")
    //  Create: POST
    // newVoyager = defined in the child
    // but this createNewVoyager needs to be defined in the PARENT STATE 
    // newVoyager it is set in the child 


    const createNewVoyager = async (newVoyager) =>{
        console.log("Let's create this!");
        console.log(newVoyager)
        // POST method 
        // make sure to put localhost:3001 - to the backend 
        // const apiResponse = await fetch("http://localhost:3001/voyagers/",{
           const apiResponse = await fetch("https://voyager-back-end.herokuapp.com/voyagers/",{
            method: "POST",
            mode: 'cors',
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
        try{const apiResponse = fetch(`https://voyager-back-end.herokuapp.com/voyagers/${idToDelete}`,{
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
            return < Redirect to="/" />; 
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
        const apiResponse = await fetch(`https://voyager-back-end.herokuapp.com/voyagers/${idToUpdate}`,{
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
    // INDEX: GET function to setVoyagers
    const getVoyagers = async () => {
        try{
            // make sure to add this  https://voyager-back-end.herokuapp.com/voyagers
            const voyagers = await fetch("https://voyager-back-end.herokuapp.com/voyagers/")
            const parsedVoyagers = await voyagers.json();
            setVoyagers(parsedVoyagers.data)
        }catch(err){
            console.log(err)
        }
    }
    // use this because uncaught typeerror 
    useEffect(() => {
        getVoyagers();
      });
    //   useEffect(getVoyagers, [])
    return(
        <div className="voyager-container">

            <SearchBar voyagers={voyagers}></SearchBar>
            <h2 className="title">Add a Voyager</h2>
            <span className="new-voyager-component">
                <NewVoyagerComponent setNewItemsServerError={setNewItemsServerError} createNewVoyager={createNewVoyager}></NewVoyagerComponent>
            </span>
            <h2 className="title">Check out some adventures!</h2>
           
            <h3>Honolulu, Hawaii</h3>
            <span className="voyager-single-component">
                {voyagers.map((voyager)=> {
                    // if it starts with searchInput 
                    if(voyager.city.toLowerCase() === "honolulu") {
                        return <SingleItemComponent key={voyager._id} voyager={voyager} updateVoyager={updateVoyager} deleteVoyager={deleteVoyager}></SingleItemComponent>
                    }
                })}
            </span> 
            <h3>San Francisco</h3> 
            <span className="voyager-single-component">
                {voyagers.map((voyager)=> {
                    // if it starts with searchInput 
                    if(voyager.city.toLowerCase() === "san francisco") {
                        return <SingleItemComponent key={voyager._id} voyager={voyager} updateVoyager={updateVoyager} deleteVoyager={deleteVoyager}></SingleItemComponent>
                    }
                })}
            </span> 

        </div>
    )
}

export default VoyagerContainer