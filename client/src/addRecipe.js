import React, { Component } from 'react';
import Styled from 'styled-components';

const FormWrapper = Styled.div`
  margin-left: 40px;
  margin-top: 40px;
`;

export default class AddRecipe extends Component {
  render() {
    return (
      <FormWrapper>
        <h2>Add Recipe</h2>
        <form id="search" onSubmit={this.props.handleSubmit}> 
          <label>
            Enter Recipe:{' '}
            <input
              type="text"
              name="name"
              placeholder="Recipe Name?"
              value={this.props.newRecipe.name}
              onChange={this.props.onChange.bind(this)}
            />
          </label>
          <br />
          <br />
          <label>
            Enter Price:{' '}
            <input
              type="text"
              name="price"
              placeholder="Recipe Price?"
              value={this.props.newRecipe.price}
              onChange={this.props.onChange.bind(this)}
            />
          </label>
          <br />
          <br />
          <label>
            internal Recipe:{' '}
            <input
              type="checkbox"
              name="internal"
              // {this.state.newRecipe.internal == true ? "checked" : ""}
              defaultChecked={this.props.newRecipe.internal}
              // value={this.state.newRecipe.internal}
              onChange={this.props.onChange.bind(this)}
            />
          </label>
          <br />
          <br />
          <br />
          <input type="submit" value="Add Recipe" />
        </form>
      </FormWrapper>
    );
  }
}
