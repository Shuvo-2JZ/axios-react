import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import data from "../src/data/data.json";

import axios from "axios";

export default class App extends Component {
  state = {
    persons: []
  };

  constructor() {
    super();

    console.log(this.state.persons);
  }

  // Axios parses the JSON for you.
  // You can access this JSON on the data field of the response object

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/todos/`).then((res) => {
      // if we follow the naming convention
      const response = res.data; // getting the data as json and passing in setState
      const persons = [...response, ...data];
      this.setState({ persons });

      // if we do not follow the naming convention
      // const persons = res.data;
      // const merged = [...persons, ...data];
      // this.setState({persons : merged})

      // this is for merging
      //this.setState({ persons: [...this.state.persons, persons] });

      //console.log(this.state.persons);
    });
  }

  render() {
    const rows = this.state.persons.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.userId}</td>
          <td>{row.id}</td>
          <td>{row.title}</td>
          <td>{row.completed.toString()}</td>
        </tr>
      );
    });

    return (
      <div className="container d-flex justify-content-center">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Person ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}
