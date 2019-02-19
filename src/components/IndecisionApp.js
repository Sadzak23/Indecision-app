import React from 'react';
import AddOption from './AddOption.js';
import Options from './Options.js';
import Action from './Action.js';
import Header from './Header.js';
import OptionModal from './OptionModal.js';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

handleModalClose = () => {
  this.setState(() => ({ selectedOption: undefined }))
};
  
handleDeleteOptions = () => {
  this.setState(() => ({ options: [] }));
};

handleDeleteOption = (optionToRemove) => {
  this.setState((prevState) => ({
    options: prevState.options.filter((option) => optionToRemove !== option)
  }));
};

handlePick = () => {
  const randomNum = Math.floor(Math.random() * this.state.options.length);
  const option = this.state.options[randomNum];
  this.setState(() => ({ selectedOption: option }));
};

handleAddOption = (option) => {
  if (!option) {
    return 'Enter valid value to add item';
  } else if (this.state.options.indexOf(option) > -1) {
    return 'This option already exists';
  }
  this.setState((prevState) => ({
    options: prevState.options.concat(option)
  }));
};


componentDidMount() {
  const options = JSON.parse(localStorage.getItem('options'));

  if (options) {
    this.setState(() => ({ options })); // ({ options: options })
  };
}
componentDidUpdate(prevProps, prevState) {
  if (prevState.options.length !== this.state.options.length) {
    const json = JSON.stringify(this.state.options);
    localStorage.setItem('options', json);
  }
};
componentWillUnmount() {
  console.log('componentWillUnmount');
};
  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
        <div className="widget">
          <Options
            options={this.state.options}
            handleDeleteOptions={this.handleDeleteOptions}
            handleDeleteOption={this.handleDeleteOption}
          />
          <AddOption
            handleAddOption={this.handleAddOption}
          />
        </div>
        </div>
        <OptionModal
          handleModalClose={this.handleModalClose}
          selectedOption={this.state.selectedOption}
        />
      </div>
    );
  }
};