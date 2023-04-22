import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    const BarStyle = {
      width: "30%",
      background: "#F0F0F0",
      border: "none",
      padding: "0.5rem",
      marginTop: "2rem",
      borderRadius: "10px"
    };
    return (
      <input
        style={BarStyle}
        key="search-bar"
        placeholder={"search city"}
        onKeyDown={this.props.handleSearch}
      />
    );
  }
}

export default SearchBar;
