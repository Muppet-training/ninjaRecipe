import React, { Component } from "react";
import "./App.css";
import Styled from "styled-components";

const FormWrapper = Styled.div`
  margin-left: 40px;
  margin-top: 40px;
`;

const RecipeUl = Styled.ul`
  margin-top: 100px;
`;

const ListLi = Styled.li`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: [col] 200px [col] 100px [col] 100px [col] 100px ;
    grid-template-rows: [row] 40px ;
    list-style-type: none;
    text-align: left;
`;

const ListItem = Styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  list-style-type: none;
`;

const DeleteButton = Styled.button`
  background-color: red;
  color: #fff;
  border: none;
  outline: 0;
  cursor: pointer;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editRecipe: {},
      newRecipe: {
        internal: true,
        name: "",
        price: ""
      },
      recipes: []
    };

    // this.handleChange = this.handleChange;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  componentDidMount() {
    this.handleGetAllRecipes();
  }

  render() {
    var recipes = this.state.recipes;
    // console.log("Recipes", recipes);
    recipes = recipes.map((recipe, index) => {
      return (
        <ListLi key={index} onClick={this.handleEdit.bind(this, recipe._id)}>
          <ListItem>{recipe.name}</ListItem>
          <ListItem>{recipe.price}</ListItem>
          <ListItem>{recipe.internal ? "True" : "False"}</ListItem>
          <ListItem>
            <DeleteButton onClick={this.handleDelete.bind(this, recipe._id)}>
              x
            </DeleteButton>
          </ListItem>
        </ListLi>
      );
    });

    return (
      <div className="">
        <FormWrapper>
          <h2>Add Recipe</h2>
          <form id="search" onSubmit={this.handleSubmit}>
            <label>
              Enter Recipe:{" "}
              <input
                type="text"
                name="name"
                placeholder="Recipe Name?"
                value={this.state.newRecipe.name}
                onChange={this.onChange.bind(this)}
              />
            </label>
            <br />
            <br />
            <label>
              Enter Price:{" "}
              <input
                type="text"
                name="price"
                placeholder="Recipe Price?"
                value={this.state.newRecipe.price}
                onChange={this.onChange.bind(this)}
              />
            </label>
            <br />
            <br />
            <label>
              internal Recipe:{" "}
              <input
                type="checkbox"
                name="internal"
                // {this.state.newRecipe.internal == true ? "checked" : ""}
                defaultChecked={this.state.newRecipe.internal}
                // value={this.state.newRecipe.internal}
                onChange={this.onChange.bind(this)}
              />
            </label>
            <br />
            <br />
            <br />
            <input type="submit" value="Add Recipe" />
          </form>
        </FormWrapper>
        <RecipeUl>{recipes}</RecipeUl>
        {Object.getOwnPropertyNames(this.state.editRecipe).length !== 0 ? (
          <FormWrapper>
            <hr />
            <p>Are you sure the {this.state.editRecipe.name} recipe?</p>
            <br />
            <br />
            <form onSubmit={this.handleEditSubmit}>
              <label>
                Recipe Name:{" "}
                <input
                  type="text"
                  name="name"
                  placeholder="Recipe Name?"
                  value={this.state.editRecipe.name}
                  onChange={this.onEditChange.bind(this)}
                />
              </label>
              <br />
              <br />
              <br />
              <input type="submit" value="Confirm Edit" />
            </form>
          </FormWrapper>
        ) : (
          ""
        )}
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
        this.setState({
          recipes: json
        });
      });
  }

  onChange(e) {
    const inputName = e.target.name;
    var inputValue = e.target.value;
    const prevState = this.state;
    if (inputName == "internal") {
      var checked = false;
      prevState.newRecipe.internal === false ? (checked = true) : "";
      inputValue = checked;
    }
    this.setState(prevState => ({
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
    if (inputName == "internal") {
      var checked = false;
      prevState.newRecipe.internal === false ? (checked = true) : "";
      inputValue = checked;
    }
    this.setState(prevState => ({
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
      .then(this.handleGetAllRecipes());
  }

  handleEdit(recipeId) {
    const editRecipe = this.state.recipes.filter(
      recipe => recipe._id === recipeId
    );
    console.log("You Clicked", editRecipe[0]);

    this.setState({ editRecipe: editRecipe[0] });
  }
}

export default App;
