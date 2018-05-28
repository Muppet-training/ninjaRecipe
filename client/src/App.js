import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleGetAllRecipes() {
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

  handleSubmit(e) {
    e.preventDefault();
    const recipeName = e.target.name.value;
    console.log(recipeName);
    return fetch("/api/recipes", {
      method: "post",
      body: JSON.stringify({
        name: recipeName
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(this.checkStatus)
      .then(() => console.log("updated!!!"))
      .then(this.handleGetAllRecipes());
  }

  checkStatus(response) {
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
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
