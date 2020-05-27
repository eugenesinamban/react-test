import React from 'react';
import ReactDOM from 'react-dom';
import Screen from './Screen';
import Button from './Button';
import './style.css';

class Calculator extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      numbers : [],
      next : false,
      currentOperation : '',
      counter : 0
    };
  }

  handleClick(i) {
    let numbers = this.state.numbers.slice();
    const counter = this.state.counter;
    if (numbers[counter] === undefined) {

      // if no previous input is present, start input
      numbers[counter] = i;

    } else if (String(numbers[counter]).length === 8) {

      // if number is more than 10 places, stop input
      return;

    } else {
      
      numbers[counter] = parseInt(String(numbers[counter]) + i);

    }

    this.setState({
      numbers : numbers
    });
  }

  handleClickUtilities(i) {
    let numbers = this.state.numbers.slice();
    let counter = this.state.counter;
    // work on operations such as division : consider pemdas
    if (Object.values(this.utilities()).includes(i)) {
      switch(i) {
        case '+':
          this.setState({
            currentOperation : i
          });
          console.log(i);
          break;
        case '-':
          console.log(i);
          break;
        case 'X':
          console.log(i);
          break;
        case '/':
          console.log(i);
          break;
        case '=':
          console.log(i);
          break;
        case 'c':
          if (numbers.length !== 0) {
            numbers[counter] = 0;
            this.setState({
              numbers : numbers
            })
          }
          break;
        case 'ca':
          if (numbers.length !== 0) {
            numbers[counter] = 0;
            this.setState({
              numbers : numbers
            })
          }
          break;
        case 'delete':
          // if input is already present
          if (numbers.length !== 0) {

            // if there's only one digit
            if (String(numbers[counter]).length === 1) {
              console.log('one digit');
              numbers[counter] = 0;
              this.setState({
                numbers : numbers
              });
              break;
            }
            let strCopy = String(numbers[counter]);
            let strLength = strCopy.length;
            
            numbers[counter] = parseInt(strCopy.substring(0, strLength - 1));
            
            this.setState({
              numbers : numbers
            });
          }
          break;
        case '.':
          console.log(i);
          break;
        case '-/+':
          console.log(i);
          break;
      }
    }
  }

  utilities = () => {
    return {
      addition: "+",
      subtraction: "-",
      multiplication: "X",
      division: "/",
      equals: "=",
      clear: "c",
      clearAll: "ca",
      delete: 'delete',
      point: ".",
      negative: '-/+'
    };
  };

  renderButton(i) {
    // if i is an integer, return button with normal function
    if (Number.isInteger(i)) {
      return <Button 
        display={i}
        onClick={() => {this.handleClick(i)}}
      />
    } else { // if i is not an integer, return button with utilities function
      return <Button 
        display={i}
        onClick={() => {this.handleClickUtilities(i)}}
      />
    }
    
  }

  renderButtons(){
    return (
      <div>
        {this.renderButton(this.utilities().clear)}
        {this.renderButton(this.utilities().clearAll)}
        {this.renderButton(this.utilities().delete)}
        {this.renderButton(this.utilities().division)}
        {this.renderButton(7)}
        {this.renderButton(8)}
        {this.renderButton(9)}
        {this.renderButton(this.utilities().multiplication)}
        {this.renderButton(4)}
        {this.renderButton(5)}
        {this.renderButton(6)}
        {this.renderButton(this.utilities().subtraction)}
        {this.renderButton(1)}
        {this.renderButton(2)}
        {this.renderButton(3)}
        {this.renderButton(this.utilities().addition)}
        {this.renderButton(this.utilities().negative)}
        {this.renderButton(0)}
        {this.renderButton(this.utilities().point)}
        {this.renderButton(this.utilities().equals)}
      </div>
      );
  }
  
  renderScreen() {
    let onScreen;
    const counter = this.state.counter;

    if (undefined === this.state.numbers[counter]) {
      onScreen = 0;
    } else {
      onScreen = this.state.numbers[counter].toLocaleString();
    }
    return (
      <Screen 
        value={onScreen}
      />
    );
  }

  render() {
    return (
      <div className="calculator">
        {this.renderScreen()}
        <div className='buttons'>
          {this.renderButtons()}
        </div>
      </div>
      );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);