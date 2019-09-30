import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

function fetchTables(cb) {
  axios.get('http://localhost:3001/tables')
    .then(function ({ data }) {
      cb(data)
    })
}

class App extends Component {
  state = {
    tables: [],
  }

  componentDidMount() {
    fetchTables(tables => {
      this.setState({
        tables
      })
    })
  }

  renderTables() {
    const {
      tables,
    } = this.state

    console.log(tables)

    const renderRows = () => 
      tables.map(t => (
        <tr>
          <td>{t.name}</td>
          <td>{t.legs}</td>
          <td>{t.seats}</td>
          <td>{t.price}</td>
        </tr>
      ));
    const renderTable = () =>
      (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Legs</th>
              <th>Seats</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </table>
      )

    return renderTable()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
        <div>
          {this.renderTables()}
        </div>
      </div>
    );
  }
}

export default App;
