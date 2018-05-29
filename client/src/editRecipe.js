import React, { Component } from "react";
import Styled from "styled-components";

const FormWrapper = Styled.div`
  margin-left: 40px;
  margin-top: 40px;
`;

class EditRecipe extends Component {
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
          <form onSubmit={this.props.handleEditSubmit.bind(this)}>
            <label>
              Recipe Name:{" "}
              <input
                type="text"
                name="name"
                placeholder="Recipe Name?"
                value={recipe.name}
                onChange={this.props.onEditChange.bind(this)}
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

export default EditRecipe;
