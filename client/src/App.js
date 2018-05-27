import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // const recipeName = e.target.name.value;
    fetch("/api/recipes")
      .then(data => {
        console.log(data);
        return data.json();
      })
      .then(json => {
        this.setState({
          recipes: json
        });
      });
  }

  render() {
    var recipes = this.state.recipes;
    console.log(recipes);
    recipes = recipes.map((recipe, index) => {
      return <li key={index}>{recipe.name}</li>;
    });
    return (
      <div className="App">
        <form id="search" onSubmit={this.handleSubmit}>
          <label>
            Enter Recipe:{" "}
            <input
              type="text"
              name="name"
              placeholder="Recipe Name?"
              required
            />
          </label>
          <input type="submit" value="Find Recipe" />
        </form>
        <ul>{recipes}</ul>
      </div>
    );
  }
}

export default App;
