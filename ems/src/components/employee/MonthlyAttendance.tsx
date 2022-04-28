// import React from 'react';

// import { Calendar } from 'react-big-calendar';

// import moment from 'moment';

// class Calendar extends React.Component {

//    render() {

//        return (

//            <Calendar

//                startAccessor="start"

//                endAccessor="end"

//            />

//        )

//    }
// }
// export default Calendar;
// import React, { Component } from "react";
// import Calendar from "react-calendar";
// import Navbar from "../Navbar";
// import { Navigate} from "react-router-dom";
// import "../Home.css";
// type props = {
//   date:any
//   username:any
// }

// class MonthlyAttendance extends React.Component<props,props> {
//   constructor(props: props) {
//     super(props);
//     this.state = {
//       date: new Date(),
//       username:this.props.username
//     };
//   }

//   onChange = (date: any) => this.setState({ date });

//   render() {

//     return (
//       <>
//         <Navbar personalData leaveData employeeData myaccount username={this.props.username}/>
//         <div style={{textAlign:"center"}}>
//         <span style={{ textDecoration: "underline" }}>Monthly Attendance</span>
//         <hr />
//         <Calendar onChange={this.onChange} value={this.state.date} />
//       </div>
//       </>
//     );
//   }
// }
// export default MonthlyAttendance;
// import React from 'react';
// import Navbar from '../Navbar';
// class MonthlyAttendance extends React.Component<any,any> {
//   render(){
//   return (<>
//     <Navbar  personalData
//     leaveData
//     myaccount
//     employeeData
//     username={this.props.username}/>
//     <div style={{textAlign:"center"}}>MonthlyAttendance</div>
//     <hr />
//     </>
//   )
// }
// }
// export default MonthlyAttendance;
// import React from 'react';
// import Navbar from '../Navbar';
// const MonthlyAttendance = () => {
//   return (<>
//     <Navbar  personalData
//     leaveData
//     myaccount
//     employeeData
//     username={this.props.username}/>
//     <div style={{textAlign:"center"}}>MonthlyAttendance</div>
//     <hr />
//     </>
//   )
// }

// export default MonthlyAttendance

import { render } from "@testing-library/react";
import React, { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import ReactDOM from "react-dom";
import Navbar from "../Navbar";
import Axios from "axios";
// import "./styles.css";

class MonthlyAttendance extends React.Component<any, any> {
  // Array to store month string values
  constructor(props: any) {
    super(props);
    this.state = {
      selectedDate: "",
      calendarText: "",
      username: this.props.username,
      intime: "-",
      outtime: "-",
      hours: "-",
      status: "-",
      attendancelist: [],
    };
  }
  allMonthValues = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  handleDateChange = (value: any) => {
    Axios.get("http://localhost:3001/employeedetailsgetdailyattendance").then(
      (response) => {
        const attendancelist = response.data;
        this.setState({ attendancelist });
      }
    );
    this.setState({ selectedDate: value });
    this.setState({ calendarText: value });
  };
  render() {
    return (
      <div className="app">
        <Navbar
          personalData
          leaveData
          myaccount
          employeeData
          username={this.props.username}
        />
        {this.state.attendancelist.map((item: any) => {
          if (this.state.calendarText === item.date)
            return (
              <>
                <h5 className="calander-details">{this.state.intime}</h5>
                <h5 className="calander-details">{this.state.outtime}</h5>
                <h5 className="calander-details">{this.state.hours}</h5>
                <h5 className="calander-details">{this.state.status}</h5>
              </>
            );
        })}
        <Calendar
          onClickMonth={(value:any,event:any)=>alert(`month:${value}`)}
          value={this.state.selectedDate}
        />
      </div>
    );
  }
}
export default MonthlyAttendance;
