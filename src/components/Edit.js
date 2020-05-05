import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      totalfortune: '',
      monthfortune:'',
      lang:''
    };
  }

  componentDidMount() {
    const firestore = firebase.firestore;
    const ref = firestore.collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          totalfortune: board.totalfortune,
          monthfortune:board.monthfortune,
          docid:board.docid,
          lang:board.lang
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }
  // quill side
  onBodyChange=(value) => {
    const state = this.state;
    this.setState({ totalfortune: value });
  }

  onMonthBodyChange=(value) => {
    const state = this.state;
    this.setState({ monthfortune: value });
  }
  onSubmit = (e) => {
    e.preventDefault();

    const { title, totalfortune, monthfortune,docid,lang } = this.state;
    const firestore = firebase.firestore;
    const updateRef = firestore.collection('boards').doc(this.state.key);
    updateRef.set({
      title,
      totalfortune,
      monthfortune,
      docid,
      lang
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        totalfortune: '',
        monthfortune: '',
        docid:'',
        lang:''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="totalfortune">totalfortune:</label>
                <ReactQuill
                  modules={Edit.modules}
                  formats={Edit.formats}
                  name="totalfortune"
                  value={this.state.totalfortune}
                  onChange={this.onBodyChange}
                  placeholder="Write something.."
               />
              </div>
              <div class="form-group">
                <label for="monthfortune">월수운:</label>
                <ReactQuill
                  modules={Edit.modules}
                  formats={Edit.formats}
                  name="monthfortune"
                  value={this.state.monthfortune}
                  onChange={this.onMonthBodyChange}
                  placeholder="월수운"
                />
                {/* <input type="text" class="form-control" name="totalfortune" value={this.state.totalfortune} onChange={this.onChange} placeholder="totalfortune" /> */}
              </div>
              <div class="form-group">
                <label for="docid">docid:</label>
                <input type="text" class="form-control" name="docid" value={this.state.docid} onChange={this.onChange} placeholder="docid" />
              </div>
              <div class="form-group">
                <label for="lang">Language:</label>
                <input type="text" class="form-control" name="lang" value={this.state.lang} onChange={this.onChange} placeholder="language" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Quill Config
Edit.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

Edit.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block'
];

export default Edit;