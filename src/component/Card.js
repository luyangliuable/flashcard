import React from 'react';

import { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showfront: true,
    };
  }

  flip() {
    this.state.showfront = this.setState({showfront: !this.state.showfront});
  }

  render() {
    return (
      <>
        <div style={style} onClick={() => this.flip()}>
          {this.state.showfront ? this.props.back : this.props.front}
        </div>
      </>
    );
  }

}

const style = {
  background: "#1e90ff",
  padding: "10px",
  width: "750px",
  height: "350px",
  borderRadius: 4,
  color: "#FFF",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}
