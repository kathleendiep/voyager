import { useState } from 'react'
import './newVoyagerComponent.css'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from  'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

const NewVoyagerComponent = (props) =>{
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
            return < Redirect to="/" />; 
        }
    }
    return(
        
        <>
        <Button variant="primary" onClick={handleShow} className="custom-btn">
            Create
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new Voyager!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
      {/* this will make the showing set from true to false and close out the div */}
                    {/* create the onSubmit form */}
                    <Form onSubmit={submitNewVoyager}>
                        {/* if isValidState.valid return null, else - show an error  */}
                        { isValidState.valid ? null :<p className="form-error">{isValidState.message}</p> }
                        {/* if there is a server error then show there is an error */}
                        { props.newItemServerError ? <p className="form-error">{props.newItemsServerError}</p> : null } 
                        {/* onChange listens to whats in here based on function - put this on both*/}
                        {/* name needs to be same as model schema */}
                        {/* data binding - backend and front end sync */}
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control onChange={handleInputChange} type="text" name="name" value={newVoyager.name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>City:</Form.Label>
                            <Form.Control onChange={handleInputChange} type="text" name="city" value={newVoyager.city} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>State:</Form.Label>
                            <Form.Control onChange={handleInputChange} type="text" name="state" value={newVoyager.state} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Address:</Form.Label>
                            <Form.Control onChange={handleInputChange} type="text" name="address" value={newVoyager.address}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label> Category:</Form.Label>
                            <Form.Control onChange={handleInputChange} type="text" name="category" value={newVoyager.category}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control  onChange={handleInputChange} type="text" name="description" value={newVoyager.description}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Image Link:</Form.Label>
                            <Form.Control onChange={handleInputChange} type="text" name="img" value={newVoyager.img}/>
                        </Form.Group>
                        <Button type="submit" onSubmit={submitNewVoyager}>
                            Submit New!
                        </Button>
                        </Form>
            </Modal.Body>  
        </Modal>
      </>
    )
}

export default NewVoyagerComponent 


