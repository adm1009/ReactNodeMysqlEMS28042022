import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./employee.css";
import "../Home.css";
import Axios from "axios";
import { exit } from "process";
type props = {
  entry: boolean;
  exit: boolean;
  msg: boolean;
  indate: number;
  inmonth: number;
  inyear: number;
  inhour: number;
  inmin: number;
  insec: number;
  outdate: number;
  outmonth: number;
  outyear: number;
  outhour: number;
  outmin: number;
  outsec: number;
  workinghours: number;
  datesData: string;
  indatesdata: string;
  outDatesData: string;
  status: string;
  username: any;
  attendancelist: any;
};
class DailyAttendance extends React.Component<
  props,
  {
    entry: boolean;
    exit: boolean;
    msg: boolean;
    indate: number;
    inmonth: number;
    inyear: number;
    inhour: number;
    inmin: number;
    insec: number;
    outdate: number;
    outmonth: number;
    outyear: number;
    outhour: number;
    outmin: number;
    outsec: number;
    workinghours: number;
    datesData: string;
    indatesdata: string | null;
    outDatesData: string;
    status: string;
    username: any;
    attendancelist: any;
  }
> {
  constructor(props: props) {
    super(props);
    let date = new Date();
    this.state = {
      entry: false,
      exit: false,
      msg: false,
      indate: 0,
      inmonth: 0,
      inyear: 0,
      inhour: 0,
      inmin: 0,
      insec: 0,
      outdate: 0,
      outmonth: 0,
      outyear: 0,
      outhour: 0,
      outmin: 0,
      outsec: 0,
      workinghours: 0,
      datesData: "",
      status: "",
      indatesdata: "",
      outDatesData: "",
      username: this.props.username,
      attendancelist: [],
    };
  }
  entryHandler = () => {
    this.setState({
      entry: true,
      indate: new Date().getDate(),
      inmonth: new Date().getMonth() + 1,
      inyear: new Date().getFullYear(),
      inhour: new Date().getHours(),
      inmin: new Date().getMinutes(),
      insec: new Date().getSeconds(),
    });
  };
  componentDidUpdate() {
    Axios.get("http://localhost:3001/employeedetailsgetdailyattendance").then(
      (response) => {
        const attendancelist = response.data;
        this.setState({ attendancelist });
      }
    );
  }
  exitHandler = (e: any) => {
    e.preventDefault();
    this.setState({
      outdate: new Date().getDate(),
      outmonth: new Date().getMonth() + 1,
      outyear: new Date().getFullYear(),
      outhour: new Date().getHours(),
      outmin: new Date().getMinutes(),
      outsec: new Date().getSeconds(),
      exit: true,
    });
    
    if (this.state.outdate) {
      e.preventDefault();
      this.setState({ exit: true });
      this.setState({ msg: true });
      Axios.post("http://localhost:3001/employeedetailsdailyattendance", {
        username: this.props.username,
        indate: this.state.indate,
        inmonth: this.state.inmonth,
        inyear: this.state.inyear,
        inhour: this.state.inhour,
        inmin: this.state.inmin,
        insec: this.state.insec,
        outdate: this.state.outdate,
        outmonth: this.state.outmonth,
        outyear: this.state.outyear,
        outhour: this.state.outhour,
        outmin: this.state.outmin,
        outsec: this.state.outsec,
      }).then((response) => {
        console.log(response);
      });
    }
  };
  render() {
    return (
      <>
        <Navbar
          personalData
          leaveData
          employeeData
          myaccount
          username={this.props.username}
        />
        <div style={{ textAlign: "center" }}>
          <span style={{ textDecoration: "underline" }}>Daily Attendance</span>
          <hr />
          <h3 style={{ color: "green" }}>
            {this.state.entry && !this.state.msg && "Successfully Checked in"}
          </h3>
          <h3 style={{ color: "red" }}>
            {this.state.exit && this.state.msg && "Successfully Checked out"}
          </h3>
          <button onClick={this.entryHandler} className="anybutton">
            CheckIn
          </button>
          <button onClick={this.exitHandler} className="anybutton">
            CheckOut
          </button>
          <table id="data" style={{ marginLeft: "450px" }}>
            <thead>
              <tr>
                <td>
                  <h3>CheckinTime </h3>
                </td>
                <td>
                  <h3>CheckOutTime </h3>
                </td>
                <td>
                  <h3>WorkingHours </h3>
                </td>
                <td>
                  <h3>Status</h3>
                </td>
              </tr>
            </thead>
            <tbody>
              {this.state.attendancelist.map((value: any) => {
                if (this.state.username === value.username)
                  return (
                    <tr key={value.id}>
                      {
                        <td>
                          {value.indate +
                            "/" +
                            value.inmonth +
                            "/" +
                            value.inyear +
                            "-" +
                            value.inhour +
                            ":" +
                            value.inmin +
                            ":" +
                            value.insec}
                        </td>
                      }
                      {
                        <td>
                          {value.outdate +
                            "/" +
                            value.outmonth +
                            "/" +
                            value.outyear +
                            "-" +
                            value.outhour +
                            ":" +
                            value.outmin +
                            ":" +
                            value.outsec}
                        </td>
                      }
                      {<td>{value.outhour - value.inhour}</td>}
                      {
                        <td>
                          {(value.outhour - value.inhour >= 9 && "present") ||
                            (value.outhour - value.inhour > 5 && "halfday") ||
                            "absent"}
                        </td>
                      }
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
export default DailyAttendance;
