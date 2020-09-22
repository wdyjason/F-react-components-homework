import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
      inputVal: '',
    };
  }

  componentDidMount() {
    const messages = this.findAnwser('DEFAULT');

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  findAnwser = (val) => {
    const replyMessage = answersData.find((answer) => answer.tags.includes(val));
    return this.state.messages.concat(replyMessage);
  };

  setCustomerInput = (event) => {
    this.setState({
      inputVal: event.target.value,
    });
  };

  sendData = () => {
    const { inputVal } = this.state;
    const messages = this.state.messages.concat({
      text: inputVal,
      role: 'CUSTOMER',
    });

    setTimeout(() => {
      this.setState(
        {
          messages,
          inputVal: '',
        },
        this.showRely(inputVal, messages)
      );
    }, 500);
  };

  showRely = (question, originMessages) => {
    const replyMessage = answersData.find((answer) => answer.tags.includes(question));
    if (replyMessage !== undefined) {
      const messages = originMessages.concat(replyMessage);
      setTimeout(() => {
        this.setState({
          messages,
        });
      }, 1000);
    }
  };

  render() {
    const { shop, messages, inputVal } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput
          onTextChange={this.setCustomerInput}
          targetVal={inputVal}
          sendData={this.sendData}
        />
      </main>
    );
  }
}

export default Chat;
