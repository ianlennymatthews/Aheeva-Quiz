import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from '../src/components/Quiz.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../dist/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <ToastContainer />
        <div id="quiz">
          <Quiz />
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
