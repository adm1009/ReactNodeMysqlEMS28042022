import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Auth from "./Auth";
import "./Home.css";
import Axios from "axios";
import { GiBalloons } from "react-icons/gi";
import { BsEmojiFrownFill } from "react-icons/bs";
import { threadId } from "worker_threads";
type props = {
  username: any;
  password: string;
  usernameReg: any;
  devshow: boolean;
  aspshow: boolean;
  qashow: boolean;
  phpcoshow: boolean;
  phplashow: boolean;
  reactshow: boolean;
  passwordReg: string;
  show: boolean;
  showError: boolean;
  register: boolean;
  login: boolean;
  loginstatus: string;
  newpass: string;
  forgotshow: boolean;
  showforgetError: boolean;
  birthdayList: any;
  birthdayshow: boolean;
  count: number;
  question: string;
  answer: string;
  nobday: boolean
};

class Home extends React.Component<
  props,
  {
    username: any;
    usernameReg: any;
    passwordReg: string;
    password: string;
    show: boolean;
    showError: boolean;
    register: boolean;
    login: boolean;
    loginstatus: string;
    devshow: boolean;
    aspshow: boolean;
    qashow: boolean;
    phpcoshow: boolean;
    phplashow: boolean;
    reactshow: boolean;
    newpass: string;
    forgotshow: boolean;
    showforgetError: boolean;
    birthdayList: any;
    birthdayshow: boolean;
    count: number;
    question: string;
    answer: string;
    nobday: boolean
  }
> {
  constructor(props: props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      usernameReg: "",
      passwordReg: "",
      show: false,
      showError: false,
      register: false,
      login: true,
      loginstatus: "",
      devshow: false,
      aspshow: false,
      qashow: false,
      phpcoshow: false,
      phplashow: false,
      reactshow: false,
      newpass: "",
      forgotshow: false,
      showforgetError: false,
      birthdayList: [],
      birthdayshow: false,
      count: 0,
      question: "What is your Town name?",
      answer: "",
      nobday: false
    };
  }
  count = 0;
  birthdayShowHandler = (e: any) => {
    e.preventDefault();
    this.setState({ birthdayshow: true });
    Axios.get("http://localhost:3001/birthdays").then((response: any) => {
      const birthdayList = response.data;
      this.setState({ birthdayList });
    });
  };
  // countadder=()=>{
  //   this.setState({count:this.state.count+1})
  // }
  submitForm = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: this.state.username,
      password: this.state.password,
    }).then((response) => {
      if (response.data.message) {
        this.setState({
          showError: true,
          username: "",
          password: "",
          loginstatus: response.data.message,
        });
      } else {
        Auth.authenticate();
        this.setState({ show: true });
        this.props.username(this.state.username);
      }
    });
  };
  registerHandler = () => {
    this.setState({ register: true, login: false, birthdayshow: true });
  };
  loginHandler = () => {
    this.setState({ register: false, login: true, birthdayshow: true });
  };
  registerDataHandler = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      username: this.state.usernameReg,
      password: this.state.passwordReg,
      question: this.state.question,
      answer: this.state.answer,
    }).then((response) => {
      console.log(response);
    });
    this.setState({
      register: false,
      birthdayshow: true,
      login: true,
      usernameReg: "",
      passwordReg: "",
      question: "",
      answer: "",
    });
  };
  forgotHandler = () => {
    this.setState({
      forgotshow: true,
      login: false,
      birthdayshow: false,
      loginstatus: "",
    });
  };
  newPasswordHandler = (e: any) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/newpasslogin", {
      username: this.state.username,
      question: this.state.question,
      answer: this.state.answer,
    }).then((response) => {
      if (response.data.message) {
        this.setState({
          showforgetError: true,
          username: "",
          password: "",
          // question:"",
          answer: "",
          loginstatus: response.data.message,
        });
      } else {
        Axios.put("http://localhost:3001/newpassword", {
          username: this.state.username,
          password: this.state.newpass,
        });
        this.setState({
          login: true,
          forgotshow: false,
          username: "",
          newpass: "",
          password: "",
          birthdayshow: true,
        });
      }
    });
  };
  render() {
    return (
      <>
        {!this.state.show && (
          <h3
            style={{
              backgroundColor: "cornflowerblue",
              color: "white",
              textAlign: "center",
            }}
          >
            Welcome to Infogen Labs Pvt.Ltd
          </h3>
        )}

        {this.state.show && (
          <Navbar
            personalData
            leaveData
            myaccount
            employeeData
            username={this.state.username}
          />
        )}

        {!this.state.register && !this.state.show && !this.state.forgotshow && (
          <h4 className="reg" onClick={this.registerHandler}>
            Register
          </h4>
        )}
        {this.state.register && !this.state.show && !this.state.forgotshow && (
          <h4 className="reg" onClick={this.loginHandler}>
            Back to Signin
          </h4>
        )}
        <section
          style={{
            display: "inline-block",
            position: "absolute",
            marginLeft: "15px",
          }}
        >
          {!this.state.show && !this.state.forgotshow && (
            <h4 onClick={this.birthdayShowHandler} style={{ fontSize: "15px" }}>
              Birthdays
            </h4>
          )}
          {this.state.birthdayshow && !this.state.show && (
            <h3 style={{ color: "brown", textAlign: "center" }}>
              Today's Birthdays
            </h3>
          )}
          {this.state.birthdayshow && !this.state.show && (
            <div style={{ textAlign: "center" }}>
              <section>
                <table>
                  <tbody>
                    {this.state.birthdayList.map((value: any) => {
                      if (
                        value.month === new Date().getMonth() + 1 &&
                        value.date == new Date().getDate()
                      )
                        return (
                          <>
                            <tr key={value.name}>
                              <td>
                                <GiBalloons style={{ color: "red" }} />
                              </td>
                              <td style={{ color: "orange" }}>
                                {value.date + "/" + value.month}
                              </td>
                              <td style={{ color: "purple" }}>{value.name}</td>
                            </tr>
                          </>
                        );
                    })}
                  </tbody>
                </table>
              </section>
            </div>
          )}
          {/* {this.state.birthdayshow &&
            !this.state.show &&
            this.state.nobday && (
              <div>
                <section>
                  <table>
                    <tbody>
                      <div style={{ textAlign: "center" }}>
                        <h4>
                          <BsEmojiFrownFill
                            style={{
                              color: "yellowgreen",
                              marginRight: "10px",
                            }}
                          />
                          No Birthdays Today
                        </h4>
                      </div>
                    </tbody>
                  </table>
                </section>
              </div>
            )} */}
          {this.state.birthdayshow && !this.state.show && (
            <div style={{ textAlign: "center" }}>
              <section>
                <h3 style={{ color: "brown" }}>Upcoming Birthdays</h3>
                <table>
                  <tbody>
                    {this.state.birthdayList.map((value: any) => {
                      if (
                        value.month === new Date().getMonth() + 1 &&
                        value.date > new Date().getDate()
                      )
                        return (
                          <tr key={value.id}>
                            <td>
                              <GiBalloons style={{ color: "red" }} />
                            </td>
                            <td style={{ color: "orange" }}>
                              {value.date + "/" + value.month}
                            </td>
                            <td style={{ color: "purple" }}>{value.name}</td>
                          </tr>
                        );
                    })}
                  </tbody>
                </table>
              </section>
            </div>
          )}
        </section>
        <section style={{ display: "inline-block" }}>
          {this.state.register && !this.state.login && (
            <div>
              <h3 style={{ marginLeft: "470px", textDecoration: "underline" }}>
                Enter Details
              </h3>
              <section>
                <form onSubmit={this.registerDataHandler}>
                  <section>
                    <label style={{ marginLeft: "400px" }}>Username:-</label>
                    <input
                      type="text"
                      placeholder="Enter username"
                      name="usernameReg"
                      style={{ marginLeft: "18px", marginTop: "10px" }}
                      value={this.state.usernameReg}
                      onChange={(e) =>
                        this.setState({ usernameReg: e.target.value })
                      }
                      required
                    />
                  </section>
                  <section style={{ marginTop: "5px" }}>
                    <label style={{ marginLeft: "400px" }}>Question:-</label>
                    <select
                      style={{ marginLeft: "25px" }}
                      onChange={(e: any) =>
                        this.setState({ question: e.target.value })
                      }
                      value={this.state.question}
                    >
                      <option value="What is your Town name?">
                        What is your Town name?
                      </option>
                      <option value="What is your Nick name?">
                        What is your Nick name?
                      </option>
                      <option value="What is your School name?">
                        What is your School name?
                      </option>
                      <option value="What is your Pet name?">
                        What is your Pet name?
                      </option>
                    </select>
                    <section>
                      <label style={{ marginLeft: "400px" }}>Answer:-</label>
                      <input
                        type="text"
                        placeholder="Enter Answer"
                        name="answer"
                        style={{ marginLeft: "32px", marginTop: "5px" }}
                        value={this.state.answer}
                        onChange={(e) =>
                          this.setState({ answer: e.target.value })
                        }
                        required
                      />
                    </section>
                  </section>
                  <section style={{ marginTop: "5px" }}>
                    <label style={{ marginLeft: "400px" }}>Password:-</label>
                    <input
                      type="text"
                      placeholder="Enter password"
                      name="passwordReg"
                      style={{ marginLeft: "20px" }}
                      value={this.state.passwordReg}
                      onChange={(e) =>
                        this.setState({ passwordReg: e.target.value })
                      }
                      required
                    />
                  </section>
                  <input
                    type="submit"
                    value="Register"
                    className="loginbutton"
                    style={{ marginLeft: "490px" }}
                  />
                </form>
              </section>
            </div>
          )}
          {!this.state.show && this.state.login && (
            <div>
              <h4
                style={{
                  fontFamily: "sans-serif",
                  marginLeft: "470px",
                }}
              >
                Sign in
              </h4>
              <form
                onSubmit={this.submitForm}
                className={this.state.showError ? "cardError" : "card"}
              >
                <section style={{ marginTop: "10px" }}>
                  <span style={{ marginLeft: "30px" }}>User Name:- </span>
                  <input
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    style={{ marginLeft: "10px" }}
                    value={this.state.username}
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                    required
                  />
                  <br />
                </section>
                <section style={{ marginTop: "5px" }}>
                  <span style={{ marginLeft: "30px" }}>Password:- </span>
                  <input
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    style={{ marginLeft: "20px" }}
                    value={this.state.password}
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                    required
                  />
                </section>
                <input type="submit" value="Sign in" className="loginbutton" />
                {this.state.showError && (
                  <h4
                    style={{
                      color: "red",
                      marginTop: "-1px",
                      marginLeft: "125px",
                    }}
                  >
                    {this.state.loginstatus}
                  </h4>
                )}
                {
                  <p
                    className={
                      this.state.showError
                        ? "forgotpasswordError"
                        : "forgotpassword"
                    }
                    onClick={this.forgotHandler}
                  >
                    Forgot Password?
                  </p>
                }
              </form>
            </div>
          )}
          <section
            className={
              !this.state.register
                ? "topaccordianlogin"
                : "topaccordianregister"
            }
          >
            {this.state.forgotshow && (
              <div style={{ marginLeft: "480px", marginTop: "-100px" }}>
                <h3 style={{ marginLeft: "70px", textDecoration: "underline" }}>
                  Forgot Password
                </h3>
                <label className="newpassword">Username:- </label>
                <input
                  type="text"
                  style={{ marginLeft: "55px" }}
                  placeholder="Enter username"
                  onChange={(e: any) =>
                    this.setState({ username: e.target.value })
                  }
                />
                <br />
                <section style={{ marginTop: "5px" }}>
                  <label className="newpassword">Question:-</label>
                  <select
                    style={{ marginLeft: "68px" }}
                    onChange={(e: any) =>
                      this.setState({ question: e.target.value })
                    }
                    value={this.state.question}
                  >
                    <option value="What is your Town name?">
                      What is your Town name?
                    </option>
                    <option value="What is your Nick name?">
                      What is your Nick name?
                    </option>
                    <option value="What is your School name?">
                      What is your School name?
                    </option>
                    <option value="What is your Pet name?">
                      What is your Pet name?
                    </option>
                  </select>
                </section>
                <div style={{ marginTop: "5px" }}>
                  <label className="newpassword">Answer:- </label>
                  <input
                    type="text"
                    placeholder="Enter Answer"
                    style={{ marginLeft: "73px" }}
                    onChange={(e: any) =>
                      this.setState({ answer: e.target.value })
                    }
                  />
                </div>
                {/* <div style={{ marginTop: "5px" }}>
                  <label className="newpassword">Current Password:- </label>
                  <input
                    type="password"
                    placeholder="Enter current Password"
                    onChange={(e: any) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </div> */}
                <div style={{ marginTop: "5px" }}>
                  <label className="newpassword">New Password:- </label>
                  <input
                    type="text"
                    style={{ marginLeft: "25px" }}
                    placeholder="Enter New Password"
                    onChange={(e: any) =>
                      this.setState({ newpass: e.target.value })
                    }
                  />
                </div>
                {this.state.showforgetError && (
                  <h4
                    style={{
                      color: "red",
                      marginTop: "-1px",
                      marginLeft: "140px",
                      width: "150px",
                    }}
                  >
                    {this.state.loginstatus}
                  </h4>
                )}
                <div style={{ marginLeft: "140px" }}>
                  <button
                    className={
                      !this.state.showforgetError
                        ? "submitCancelButton"
                        : "submitCancelErrorButton"
                    }
                    onClick={this.newPasswordHandler}
                  >
                    Submit
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className={
                      !this.state.showforgetError
                        ? "submitCancelButton"
                        : "submitCancelErrorButton"
                    }
                    onClick={() =>
                      this.setState({
                        forgotshow: false,
                        login: true,
                        birthdayshow: true,
                      })
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </section>
        </section>
        <section
          style={{
            display: "inline-block",
            marginLeft: "610px",
            marginTop: "-150px",
          }}
        >
          {!this.state.show && !this.state.forgotshow && (
            <>
              <section
                style={{
                  fontSize: "25px",
                  marginBottom: "25px",
                  marginLeft: "135px",
                }}
              >
                Job Openings in ASIPL:Jobs@infogen-labs.com
              </section>
              <div
                className={
                  (this.state.devshow && "devaccordian") ||
                  (this.state.aspshow && "aspaccordian") ||
                  (this.state.qashow && "qaaccordian") ||
                  (this.state.phpcoshow && "phpcoaccordian") ||
                  (this.state.phplashow && "phplaaccordian") ||
                  (this.state.reactshow && "reactaccordian") ||
                  "cardaccordian"
                }
              >
                <section
                  style={{ fontSize: "16px" }}
                  onClick={() =>
                    this.setState({
                      devshow: true,
                      aspshow: false,
                      qashow: false,
                      phpcoshow: false,
                      phplashow: false,
                      reactshow: false,
                    })
                  }
                  onDoubleClick={() => this.setState({ devshow: false })}
                >
                  Position :DevOpsEngineer
                </section>
                {this.state.devshow && (
                  <div style={{ backgroundColor: "white" }}>
                    <section>-Experience: min 3-5 yrs </section>
                    <section>
                      -Experience in microsoft IIS and SQl server, aws, and very
                      strong w/ linux
                    </section>
                    <section>-Good communication(written and verbal)</section>
                    <section>
                      -Client interaction - Team dynamics, Team Player
                    </section>
                    <section>
                      -Team Management, leadership qualities, mentoring
                    </section>
                  </div>
                )}

                <hr className="hrtag" />
                <section
                  style={{ fontSize: "16px" }}
                  onClick={() =>
                    this.setState({
                      devshow: false,
                      aspshow: true,
                      qashow: false,
                      phpcoshow: false,
                      phplashow: false,
                      reactshow: false,
                    })
                  }
                  onDoubleClick={() => this.setState({ aspshow: false })}
                >
                  Position :Sr.Software Developer (Asp.net, C#, MVC (Razor)
                  skills)
                </section>
                {this.state.aspshow && (
                  <div style={{ backgroundColor: "white" }}>
                    <section>
                      We are hiring for "Sr. Software Developer" (Asp.net, C#,
                      MVC (Razor) skills).
                    </section>
                    <section>-Experience required : 3 to 5 years </section>
                    <section>-Note:</section>
                    <section>
                      1) Candidate MUST have working knowledge of Asp.net MVC :
                      At least 1 to 4 projects executed successfully in MVC.
                    </section>
                    <section>
                      2) Candidate having working knowledge in Ecommerce Domain
                      will be preferred.
                    </section>
                    <section>
                      -Work Location : Kothrud, Pune, Maharashtra.
                    </section>
                    <section>-Skills : </section>
                    <section>
                      -ASP.NET with MVC (2.0, 3.0, and 4.0) pattern, MVC Pattern
                      (Razor Engine),Programing language: C#Database: SQL Server
                      (2000, 2005, or 2008 2012) Net Frameworks (2.0, 3.5, and
                      4.0), LINQ, and ADO.Net Entity FrameworkClient side
                      scripting: JavaScript, JQuery, and AJAX, HTML, XML
                    </section>
                    <section>
                      -Job Description and Responsibilities: - Understand
                      functional design and technical design and develop as per
                      document. Ensure that there are complete unit tests for
                      every component or task. Recognize opportunities to turn
                      customizations into generalized enhancements, reuse Code.
                      Implementation across multiple customers. Develop required
                      functionality and feature by coding on .Net platform &
                      Internal Framework. Ensure that code is testable and is
                      tested and follow best practices while coding. Ensure that
                      code is scalable for high performance scenarios. Execute
                      unit testing for the new functionality developed. Ensure
                      project is complete according to written specifications.
                      Prepare Functional Specifications Should work independent
                      in the team
                    </section>
                    <section>-Desired Candidate Profile:</section>
                    <section>
                      -Strong and proved C# programming. Object oriented
                      Programming concepts Hands on experience in analyzing the
                      business logic and converting to class designs. Candidate
                      should have working knowledge of JQuery. Should have
                      worked in an n-tier environment. Strong knowledge of web
                      based Technologies. Candidate MUST have working knowledge
                      of Dot Net MVC. Having knowledge of reporting tool like
                      JIRA or third party s/w is added advantage. Should have
                      Good Problem solving and Analytical Skills. Should be
                      sharp and Patience in understanding the problems and
                      issues. Candidate should have Excellent English
                      communication skills both oral and written. Candidate
                      should have Good knowledge of Business Intelligence
                      concepts. Candidate should comfortably manage and
                      prioritize multiple projects in a fast-paced, service
                      oriented environment. Involvement in Publish and
                      deployment cycle against production environment. Hand-On
                      Experience in MVC, C#, Entity Framework, LINQ knowledge in
                      WEB API.
                    </section>
                  </div>
                )}
                <hr className="hrtag" />
                <section
                  style={{ fontSize: "16px" }}
                  onClick={() =>
                    this.setState({
                      devshow: false,
                      aspshow: false,
                      qashow: true,
                      phpcoshow: false,
                      phplashow: false,
                      reactshow: false,
                    })
                  }
                  onDoubleClick={() => this.setState({ qashow: false })}
                >
                  Position :QA Engineer
                </section>
                {this.state.qashow && (
                  <div style={{ backgroundColor: "white" }}>
                    <section>
                      -2-5 years experience in manual and automation Testing of
                      Web, windows and mobile application.
                    </section>
                    <section>
                      -Regression and smoke testing using selenium
                    </section>
                    <section>- Preparation of test cases.</section>
                    <section>
                      - Strong analytical skills for effective problem finding
                    </section>
                    <section>
                      - Development of selenium script as per test cases and
                      setup automation environment
                    </section>
                    <section>
                      - Knowledge of CI Tools like Jenkins and Hudson
                    </section>
                    <section>
                      - Good communication (written and verbal), Client
                      interaction
                    </section>
                    <section>
                      - Team dynamics, Team Player, Team Management, leadership
                      qualities, mentoring
                    </section>
                    <section>
                      - Have experience on selenium wedriver,SoapUI, jmeter
                    </section>
                  </div>
                )}
                <hr className="hrtag" />
                <section
                  style={{ fontSize: "16px" }}
                  onClick={() =>
                    this.setState({
                      devshow: false,
                      aspshow: false,
                      qashow: false,
                      phpcoshow: true,
                      phplashow: false,
                      reactshow: false,
                    })
                  }
                  onDoubleClick={() => this.setState({ phpcoshow: false })}
                >
                  Position :PHP CodeIgnitor Developer
                </section>
                {this.state.phpcoshow && (
                  <div style={{ backgroundColor: "white" }}>
                    <section>
                      - 4-5 years experience in core PHP and CodeIgnitor.
                    </section>
                    <section>
                      - Good communication (written and verbal), Client
                      interaction
                    </section>
                    <section>
                      - Team dynamics, Team Player, Team Management, leadership
                      qualities, mentoring
                    </section>
                  </div>
                )}
                <hr className="hrtag" />
                <section
                  style={{ fontSize: "16px" }}
                  onClick={() =>
                    this.setState({
                      devshow: false,
                      aspshow: false,
                      qashow: false,
                      phpcoshow: false,
                      phplashow: true,
                      reactshow: false,
                    })
                  }
                  onDoubleClick={() => this.setState({ phplashow: false })}
                >
                  Position :PHP Laravel Developer
                </section>
                {this.state.phplashow && (
                  <div style={{ backgroundColor: "white" }}>
                    <section>
                      - 4-5 years experience in core PHP and Laravel.
                    </section>
                    <section>
                      - Good communication (written and verbal), Client
                      interaction
                    </section>
                    <section>
                      - Team dynamics, Team Player, Team Management, leadership
                      qualities, mentoring
                    </section>
                  </div>
                )}
                <hr className="hrtag" />
                <section
                  style={{ fontSize: "16px" }}
                  onClick={() =>
                    this.setState({
                      devshow: false,
                      aspshow: false,
                      qashow: false,
                      phpcoshow: false,
                      phplashow: false,
                      reactshow: true,
                    })
                  }
                  onDoubleClick={() => this.setState({ reactshow: false })}
                >
                  Position :ReactJS and Node JS Developer
                </section>
                {this.state.reactshow && (
                  <div style={{ backgroundColor: "white" }}>
                    <section>- 2+ years experience in ReactJS.</section>
                    <section>- 2+ years experience in NodeJS.</section>
                    <section>
                      - Good communication (written and verbal), Client
                      interaction
                    </section>
                    <section>
                      - Team dynamics, Team Player, Team Management, leadership
                      qualities, mentoring
                    </section>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </>
    );
  }
}

export default Home;
