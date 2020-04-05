import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import renderHTML from 'react-render-html';


class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('boards');
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, totalfortune,monthfortune } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        totalfortune,
        monthfortune
      });
    });
    this.setState({
      boards
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOARD LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">Add Board</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  {/* <th>totalfortune</th> */}
                  {/* <th>monthfortune</th> */}
                  <th>DOCID</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                    {/* <td>{renderHTML(board.totalfortune)}</td> */}
                    {/* <td>{renderHTML(board.monthfortune)}</td> */}
                    <td>{board.key}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;