import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class Create extends Component {

  constructor() {
    super();
    const firestore = firebase.firestore;
    this.ref = firestore.collection('boards');
    this.state = {
      title: '',
      totalfortune: '',
      monthfortune:'',
      docid: '',
      lang:''
    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
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

    const { title, totalfortune,monthfortune, docid,lang } = this.state;

    this.ref.doc(docid).set({
      title,
      totalfortune,
      monthfortune,
      docid,
      lang
    }).then((docRef) => {
      this.setState({
        title: '',
        totalfortune: '',
        monthfortune,
        docid,
        lang
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, totalfortune,monthfortune, docid,lang } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="totalfortune">총운:</label>
                <ReactQuill
                  modules={Create.modules}
                  formats={Create.formats}
                  name="totalfortune"
                  value={this.state.totalfortune}
                  onChange={this.onBodyChange}
                  placeholder="총운"
                />
                {/* <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea> */}
              </div>
              <div class="form-group">
                <label for="monthfortune">월수운:</label>
                <ReactQuill
                  modules={Create.modules}
                  formats={Create.formats}
                  name="monthfortune"
                  value={this.state.monthfortune}
                  onChange={this.onMonthBodyChange}
                  placeholder="월수운"
                />
                {/* <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea> */}
              </div>
              <div class="form-group">
                <label for="docid">DOC ID:</label>
                <input type="text" class="form-control" name="docid" value={docid} onChange={this.onChange} placeholder="docid" />
              </div>
              <div class="form-group">
                <label for="lang">Language:</label>
                <input type="text" class="form-control" name="lang" value={lang} onChange={this.onChange} placeholder="language" />
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
Create.modules = {
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

Create.formats = [
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
export default Create;