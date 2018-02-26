import React, {Component} from 'react';
import ForumDB from '../ForumDB/ForumDB';
import Text from '../containers/Text';

import * as firebase from "firebase";
import 'firebase/firestore'


var config = {
    apiKey: "AIzaSyA6ysQ2h32XTuUY2rtQpSF1nr76gGi4w08",
    authDomain: "forum-cc70a.firebaseapp.com",
    databaseURL: "https://forum-cc70a.firebaseio.com",
    projectId: "forum-cc70a",
    storageBucket: "forum-cc70a.appspot.com",
    messagingSenderId: "104261036509"
  };
firebase.initializeApp(config);




const Menubar = (props) => {
    return(
        <form className="menubar">
            <div>number</div>
            <div>user</div>
            <div>title</div>
            <div>date</div>
            <div>delete</div>
        </form>
    )
}

const Thread = (props) => {
    return(
        <div className="thread">
            <div>{props.thread.id}</div>
            <div>{props.thread.username}</div>
            <div>{props.thread.title}</div>
            <div>{props.thread.date}</div>
            <div>
                <button onClick={() => {
                    props.remove(props.thread.id)
                }}>delete</button>
            </div>
        </div>
        
    )
}

const AddNewThread = (props) => {
    
    let titleInput;
    let textInput;
    let nameInput;
    
    return(
        <form onSubmit={(event) => {
            props.handleSubmit(event,titleInput.value,textInput.value,nameInput.value)
            titleInput.value="";
            textInput.value="";
            nameInput.value="";
            }} className="addNewThread">
            <h1>Create New Thread</h1>
            
            <h3>Name</h3>
            <input ref={(tag) => {
                nameInput = tag;
            }} placeholder="add a name please" type='text'/>
            
            <h3>Title</h3>
            <input ref={(tag) => {
                titleInput = tag;
            }} placeholder="add a new title" type='text'/>
            
            <h3>Text</h3>
            <textarea ref={(tag) => {
                textInput = tag;
            }} placeholder="add a new text"/>
              
            <br />
            <button>submit</button>
    
        </form>
    )
}

const ShowText = (props) => {
    return(
        <div className="text">
            <div>{props.thread.text}</div>
        </div>
        
        )
}




class Forum extends Component {
    constructor(props){
        super(props)
        
        let today = new Date()
        
        this.state = {
            threads:[],
            add:false,
            visibleText:false,
            selectedDate:today
        }
        
        this.db = firebase.firestore();
        this.readDB()
        
        
        this.readDB=this.readDB.bind(this);
        this.deleteDB=this.deleteDB.bind(this);
        this.setAddFalse=this.setAddFalse.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    
    handleSubmit(event,title,text,name){
        event.preventDefault();
        this.addItem(title,text,name);
        this.setAddFalse()
    }
    
    deleteDB(id){
        this.db.collection("threads").doc(id).delete().then(() => {
            this.readDB();
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
    }
    readDB(){
        this.db.collection('threads').get()
            .then((snapshot) => {
                let threads = [];
                snapshot.forEach((doc) => {
                    let thread = doc.data()
                    thread.id = doc.id;
                    threads.push( thread );
                });
                //this.state.setState({threads:threads});
                this.setState({threads});
            })
            .catch((err) => {
                console.log('Error getting documents', err);
            });
        
    }
    
    addItem(title,text,name){
        if(title==="" || text==="" ||name==="") return;
        let dateObj=this.state.selectedDate
        this.db.collection('threads').add({
            title: title,
            text: text,
            username: name,
            date:(dateObj.getMonth()+1)+"/"+dateObj.getDate()+"/"+dateObj.getFullYear()
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        
        this.readDB()
        
        

            
    }
    
    setAddFalse(){
        this.setState({add:false});
    }
    

    render() {

        return(
            <div>
                <h1>Forums</h1>
                <Menubar key={0}/>
                {this.state.threads.map(t => <Thread key={t.id} thread={t} remove={this.deleteDB} />)}
            
                <button onClick={() => {
                    this.setState({add:true});
                    
                }}className="newWrite">글쓰기</button>
                
                {this.state.visibleText === true && this.state.threads.map(t => <ShowText key={t.id} thread={t}/>)}
                {this.state.add === true && <AddNewThread handleSubmit={this.handleSubmit}/> }
            </div>
            
            
            
            )
    }
}

export default Forum;