import React, { Component } from "react";
import "./App.css";
import Styled from "styled-components";
import EditRecipe from "./editRecipe";
import AddRecipe from "./addRecipe";
import ListRecipes from "./listRecipes";

const FormWrapper = Styled.div`
  margin-left: 40px;
  margin-top: 40px;
`;

const RecipeUl = Styled.ul`
  margin-top: 100px;
`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editRecipe: {},
      newRecipe: {
        internal: false,
        name: "",
        price: ""
      },
      recipes: []
    };

    // this.handleChange = this.handleChange;
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  componentDidMount() {
    this.handleGetAllRecipes();
  }

  render() {
    var recipes = this.state.recipes;
    // console.log("Recipes", recipes);

    return (
      <div className="">
        <AddRecipe
          newRecipe={this.state.newRecipe}
          handleSubmit={this.handleSubmit.bind(this)}
          onChange={this.onChange.bind(this)}
        />
        <RecipeUl>
          <ListRecipes
            recipes={this.state.recipes}
            handleEdit={this.handleEdit.bind(this)}
            handleDelete={this.handleDelete.bind(this)}
          />
        </RecipeUl>
        <EditRecipe
          editRecipe={this.state.editRecipe}
          handleEditSubmit={this.handleEditSubmit.bind(this)}
          onEditChange={this.onEditChange.bind(this)}
        />
      </div>
    );
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

  handleGetAllRecipes() {
    fetch("/api/recipes")
      .then(data => {
        console.log(data);
        return data.json();
      })
      .then(json => {
        // this.setState({
        //   recipes: json
        // });
        this.setState((prevState, props) => ({
          ...prevState.recipes,
          recipes: json
        }));
      });
  }

  onChange(e) {
    const inputName = e.target.name;
    var inputValue = e.target.value;
    const prevState = this.state;
    if (inputName === "internal") {
      var checked = false;
      prevState.newRecipe.internal === false ? (checked = true) : "";
      inputValue = checked;
    }
    this.setState((prevState, props) => ({
      newRecipe: {
        ...prevState.newRecipe,
        [inputName]: inputValue
      }
    }));
  }

  onEditChange(e) {
    const inputName = e.target.name;
    var inputValue = e.target.value;
    const prevState = this.state;
    if (inputName === "internal") {
      var checked = false;
      prevState.newRecipe.internal === false ? (checked = true) : "";
      inputValue = checked;
    }
    this.setState((prevState, props) => ({
      editRecipe: {
        ...prevState.editRecipe,
        [inputName]: inputValue
      }
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const newRecipe = this.state.newRecipe;
    console.log("newRecipe", newRecipe);
    return fetch("/api/recipes", {
      method: "post",
      body: JSON.stringify(newRecipe),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(this.checkStatus)
      .then(() => console.log("updated!!!"))
      .then(this.handleGetAllRecipes());
  }

  handleEditSubmit(e) {
    e.preventDefault();
    console.log("editRecipe", this.state);
    const editRecipe = this.state.editRecipe;
    console.log("editRecipe", editRecipe);
    return fetch("/api/recipes/" + editRecipe._id, {
      method: "put",
      body: JSON.stringify(editRecipe),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(this.checkStatus)
      .then(() => console.log("updated!!!"))
      .then(this.setState({ editRecipe: {} }))
      .then(this.handleGetAllRecipes());
  }

  handleDelete(id) {
    console.log("You Clicked", id);
    fetch("/api/recipes/" + id, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      // .then(this.checkStatus)
      .then(() => console.log("updated!!!"))
      .then(this.handleCheckEditDeleteId(id))
      .then(this.handleGetAllRecipes());
  }

  handleEdit(recipeId) {
    console.log("state", this.state);
    const editRecipe = this.state.recipes.filter(
      recipe => recipe._id === recipeId
    );
    console.log("You Clicked", editRecipe[0]);

    this.setState({ editRecipe: editRecipe[0] });
  }

  handleCheckEditDeleteId(recipeId) {
    if (recipeId === this.state.editRecipe._id) {
      this.setState((prevState, props) => ({
        ...prevState.editRecipe,
        editRecipe: {}
      }));
    }
  }
}
