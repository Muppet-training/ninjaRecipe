import React, { Component } from "react";
import Styled from "styled-components";

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

export default class ListRecipes extends Component {
  render() {
    console.log(this.props);
    const recipes = this.props.recipes.map((recipe, index) => {
      return (
        <ListLi key={index}>
          <ListItem onClick={this.props.handleEdit.bind(this, recipe._id)}>
            {recipe.name}
          </ListItem>
          <ListItem onClick={this.props.handleEdit.bind(this, recipe._id)}>
            {recipe.price}
          </ListItem>
          <ListItem onClick={this.props.handleEdit.bind(this, recipe._id)}>
            {recipe.internal ? "True" : "False"}
          </ListItem>
          <ListItem>
            <DeleteButton
              onClick={this.props.handleDelete.bind(this, recipe._id)}
            >
              x
            </DeleteButton>
          </ListItem>
        </ListLi>
      );
    });
    return recipes;
  }
}
