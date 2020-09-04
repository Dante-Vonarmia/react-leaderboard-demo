import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
       player: "",
       score: "",
       table: []
    }
  }
  
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      table: [
        ...this.state.table,
        {
          player: this.state.player,
          score : +this.state.score
        }
      ],
      player: "",
      score: ""
    });
  }
  
  handleData = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  componentDidMount() {
    setTimeout(() => {
      fetch("https://e8bb8dbe-d43c-4aa0-b519-e3248b724d43.mock.pstmn.io/leaderboard")
        .then(res => res.json())
        .then(data => {
          this.setState({
            table: data.table
          })
        })
    }, 2000);
  }
  
  render() {
    return !this.state.table.length ? (
        <div>Loading...</div>
      ) : (
      <div>
        <h1>Leaderboard</h1>
        <form onSubmit={this.handleSubmit}>
          <label>player</label>
          <input 
            type="text"
            name="player"
            placeholder="player"
            value={this.state.player}
            onChange={this.handleData}
          />
          <label>score</label>
          <input 
            type="number"
            name="score"
            placeholder="score"
            value={this.state.score}
            onChange={this.handleData}
          />
          <input type="submit" />
        </form>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.state.table.sort((a, b) => b.score - a.score).map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.player}</td>
                  <td>{item.score}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    )
  }
}