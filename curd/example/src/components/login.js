import React , {useState} from "react";
// import Inputs from "./input";
import axios from "axios";


function Login(){



const [userDetails , setUserDetails] = useState({
  username : "",
  age : ""
})

      function InputChanged(event)
      {
        const {name,value} = event.target
           setUserDetails({
               ...userDetails,
               [name] : value
           })
      }

     async function AddMe(){
       await axios.post("http://localhost:4000/login",userDetails).then(Event.preventDefault());
      }

    return (
        <form method="post">
    <div className="row" style={{marginTop: "15%"}}>
        <div className="col-md-4"></div>
        <div className="col-md-4">
        <input type = "text" placeholder = "Enter Username" onChange={InputChanged} className="form-control" value = {userDetails.username} name="username" />
        <input type = "text" onChange={InputChanged} placeholder = "Enter Age" className="form-control" value = {userDetails.age} name="age"  />
        <input type="submit" onClick={AddMe} className="btn btn-primary" value="Add" />
            </div>
      </div>
      
      </form>
    );
}

export default Login;