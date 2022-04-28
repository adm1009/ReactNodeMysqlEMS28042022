import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import Axios from "axios";
type props = {
  newpass: string;
  username: any;
  error:boolean;
  textshow:boolean;
};
class Pass extends React.Component<props, { newpass: string; username: any;textshow:boolean;error:boolean }> {
  constructor(props: props) {
    super(props);
    this.state = {
      newpass: "",
      textshow:false,
      error:false,
      username: this.props.username,
    };
  }
  newpasswordHandler = () =>{
      if(this.state.newpass.length >= 4){
    Axios.put("http://localhost:3001/newpass", {
        username: this.props.username,
        password: this.state.newpass,
      });
      this.setState({
        newpass: "",
        textshow:true
      });
    }
    else{
      this.setState({error:true})
    }
  }
  render() {
    return (
      <div>
        <Navbar
          personalData
          leaveData
          myaccount
          employeeData
          username={this.props.username}
        />
        <main>
         {!this.state.textshow && 
          <section style={{ marginLeft: "550px" }}>
            <h3 style={{ textDecoration: "underline", marginLeft: "50px" }}>
              Change Password
            </h3>
            <span>New Password:- </span>
            <input
              type="text"
              placeholder="Enter New Password"
              value={this.state.newpass}
              onChange={(e: any) => this.setState({ newpass: e.target.value })}
            />
            {this.state.error && <p style={{color:"red",fontSize:"13px",marginLeft:"110px"}}>MinLength 4 Required</p> } 
            <section style={{ marginLeft: "110px", marginTop: "10px" }}>
              <button
                style={{
                  backgroundColor: "cornflowerblue",
                  color: "white",
                  border: "none",
                }} onClick={this.newpasswordHandler}
              >
                Submit
              </button>
              {/* <button style={{
                  backgroundColor: "cornflowerblue",
                  color: "white",
                  border: "none",marginLeft:"30px"
                }} onClick={this.cancelHandler}>Cancel</button> */}
            </section>
          </section>}
          {this.state.textshow && <span style={{color:"red",marginLeft:"600px",fontSize:"18px"}}>Password changed !</span> }
        </main>
      </div>
    );
  }
}
export default Pass;
