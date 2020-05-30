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
      operations : [],
      counter : 0,
      equals : false
    };
  }

  handleClick(i) {
    let numbers = this.state.numbers.slice();
    const counter = this.state.counter;
    let equals = this.state.equals;

    if (equals) {

      numbers[counter] = i;
      this.setState({
        equals : false
      })

    } else if (numbers[counter] === undefined) {

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
    let operations = this.state.operations.slice();
    switch(i) {
      case '+':
        this.basicUtilities(i, operations, counter);
        break;

      case '-':

        this.basicUtilities(i, operations, counter);
        break;

      case 'X':

        this.basicUtilities(i, operations, counter);
        break;

      case '/':

        this.basicUtilities(i, operations, counter);
        break;

      case '=':
        
        this.compute(numbers, operations, counter);
        break;

      case 'c':

        //clear function
        if (numbers.length !== 0) {
          numbers[counter] = 0;
          this.setState({
            numbers : numbers
          })
        }

        break;

      case 'ca':

      //clear all function
        this.setState({
          numbers : [],
          counter : 0
        })
        numbers = [];
        break;

      case 'delete':

        // if input is already present
        if (numbers.length !== 0) {

          // if there's only one digit
          if (String(numbers[counter]).length === 1) {
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
        console.log(numbers[counter])
        numbers[counter] *= -1;
        this.setState({
          numbers: numbers
        })
        break;
      default:
        break;
    }
  }

  basicUtilities(i, operations, counter) {
    if (operations[operations.length - 1] === i) {
      return;
    }
    operations = operations.concat(i)
    this.setState({
      operations : operations,
      counter : counter + 1
    });
  }

  compute(numbers, operations, counter) {

    if (numbers.length <= counter) {
      return;
    }

    let current = numbers[0];
    for (let x = 0; x < counter; x++) {
      switch(operations[x]) {
        case '+':

          current += numbers[x + 1];
          break;

        case '-':

          current -= numbers[x + 1];
          break;

        case 'X':

          current *= numbers[x + 1];
          break;

        case '/':

          // divide by zero exception
          if (numbers[x + 1] === 0) {
            this.setState({
              numbers : ["Error!"],
              counter : 0,
              equals : true,
              operations : []
            });

            return;

          }

          current /= numbers[x + 1];
          break;

        default:
          this.setState({
            numbers : ["Err!"],
            counter : 0,
            equals : true,
            operations : []
          });
          return;
      }

      this.setState({
        numbers : [current],
        counter : 0,
        operations : [],
        equals : true
      });
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