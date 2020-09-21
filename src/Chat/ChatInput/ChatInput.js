import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  render() {
    const { onTextChange, targetVal, sendData } = this.props;
    return (
      <footer className="ChatInput">
        <input type="text" value={targetVal} onChange={onTextChange} />
        <button type="button" onClick={sendData}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
