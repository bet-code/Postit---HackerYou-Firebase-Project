import React from 'react';
import ReactDOM from 'react-dom';

import PostNote from './components/PostNote';
import SignIn from './components/SignIn'

var config = {
  apiKey: "AIzaSyA-mQWtxaqnMI3G3TN-l-jhefZJe7I1H44",
  authDomain: "project5-424ae.firebaseapp.com",
  databaseURL: "https://project5-424ae.firebaseio.com",
  projectId: "project5-424ae",
  storageBucket: "",
  messagingSenderId: "487864608818"
};
firebase.initializeApp(config);

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        postIts: [],
        title: '',
        comment: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.postNote = this.postNote.bind(this);
    }
    
    componentDidMount() {
      const dbNotes = firebase.database().ref();
      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          
          dbNotes.on('value', (firebaseNotes) => {
            const notesArr = [];
            const notesInFirebase = firebaseNotes.val();
    
            for(let noteKey in notesInFirebase) {
              notesInFirebase[noteKey].key = noteKey;
              notesArr.push(notesInFirebase[noteKey]);
            }
            this.setState({
              postIts: notesArr
            });
          })
        }
      }) //closing onAuthStateChanged

    }
    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    postNote(e) {
      e.preventDefault();
      const postItNote = {
        title: this.state.title,
        comment: this.state.comment
      }
      this.setState({
        title: '',
        comment: ''
      })
      const dbNotes = firebase.database().ref()
      dbNotes.push(postItNote)
    }

    deleteNote(noteItem) {
      console.log('clicked')
      const dbNotes = firebase.database().ref(noteItem);
      dbNotes.remove();
    }
    render() {
      return (
        <div>
          <header>
            <SignIn />
          </header>
          <main>
            <section className="inputNotes">
              <form onSubmit={this.postNote}>
                <input type="text" required name='title' autoComplete="off" placeholder="Enter Title" value={this.state.title} onChange={this.handleChange}/>
                <textarea name="comment" autoComplete="off" placeholder="Enter comments..." cols="30" rows="10" value={this.state.comment} onChange={this.handleChange}></textarea>
                <button>POST IT</button>
              </form>
            </section>
            <section className="postIts">
              <ul className="noteList">
                {this.state.postIts.map((postItem) => {
                  return (
                    <PostNote note={postItem} key={postItem.key} delete={this.deleteNote}/>
                  )
                })}
              </ul>              
            </section>
          </main>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
