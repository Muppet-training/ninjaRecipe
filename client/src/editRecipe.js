import React, { Component } from "react";
import Styled from "styled-components";
import propTypes from "prop-types";

const FormWrapper = Styled.div`
  margin-left: 40px;
  margin-top: 40px;
`;

export default class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.handleEditSubmit = this.props.handleEditSubmit.bind(this);
    this.onEditChange = this.props.onEditChange.bind(this);
  }
  render() {
    var recipe = this.props.editRecipe;
    console.log("ER", recipe);
    if (Object.getOwnPropertyNames(recipe).length !== 0) {
      return (
        <FormWrapper>
          <hr />
          <p>Are you sure the {recipe.name} recipe?</p>
          <br />
          <br />
          <form onSubmit={this.handleEditSubmit}>
            <label>
              Recipe Name:{" "}
              <input
                type="text"
                name="name"
                placeholder="Recipe Name?"
                value={recipe.name}
                onChange={this.onEditChange}
              />
            </label>
            <br />
            <br />
            <br />
            <input type="submit" value="Confirm Edit" />
          </form>
        </FormWrapper>
      );
    }
    return <div />;
  }
}

EditRecipe.propTypes = {
  name: propTypes.string.isRequired
};
