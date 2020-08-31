import React, { Component } from 'react';

class SearchBarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',      
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val,
    });
  }

  render() {
    return (
      <div className="search-bar">
      <form className="search-bar" >
        <input type="text" name="description" placeholder="Search" />        
        <input type="submit" />
      </form>
      </div>
    );
  }
}

export default SearchBarForm;