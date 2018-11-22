import React, {Component} from 'react';
import * as API from '../api/API';
//import './homepage.css';
import Header from "./Header";
import Footer from "./Footer";
//import Modal from "react-modal";
import axios from 'axios';
import ReactTooltip from 'react-tooltip'
import Dropzone from 'react-dropzone'
import {FormGroup,InputGroup} from 'react-bootstrap';
//import ModalComponent from './ModalComponent';
import {Button,Panel,Modal} from 'react-bootstrap';
import '../App.css';
//import ModalComponent from "./ModalComponent";


class HomePage extends Component {

    constructor(props, context) {
        super(props, context);


        this.state = {
            text:'Enter the Text or Drop a File',
            question:'Enter the Question',
            answer:'',
            files:[],
            textArea: false,
            link:'Paste the Link here',
            show:false
        };
    }


    componentDidMount() {

    }


    handleSubmit = (text) => {
      // API.processText(text)
      //       .then((res)  => {
      //
      //     if (res.status == 200) {
      //         console.log('success')
      //     } else if (res.status == 401) {
      //         console.log('Error')
      //     }
      //   });
        
    }

    // handleFileRead = (e) => {
    //     var content = this.state.fileReader.result;
    //     console.log(content);
    //     // … do something with the 'content' …
    // };

    handleHide() {
        //this.state.show = false;
        console.log("inside handle hide")
        this.setState({ show: false });
    }

    newQuestion(){
        console.log("The state before updating" , this.state)
        this.setState({question:''})
    }

    handleLink(){
        console.log("Inside handle Link");
        this.setState({
            textArea:true,
            show:false
        })
        this.state.text = this.state.link;
    }

    onDrop(files){
        this.setState({
            files:files,
            textArea:true
        });
        this.state.text = "File Uploaded --> " + files[0].name
      }

    render() {
        return (
            <div>
                <br/>
                <Header/>
                <br/>
                <br/>
                <div className="row"> 
                  <br/>

                 <div className="col-md-2">
                 </div>
                
                  <div className=" col-md-8">
                      <Panel bsStyle="primary">
                          <Panel.Heading>
                              <Panel.Title componentClass="h3">Enter Text Here or Drop a File</Panel.Title>
                          </Panel.Heading>
                          <Panel.Body>
                      <FormGroup>
                          <InputGroup>
                              <Dropzone disableClick = {true} style = {{ padding: "0px 0px", minheight: "200px", border:"0px" }}
                                        onDrop={this.onDrop.bind(this)}>
                                <textarea className="form-control" rows="15" cols="75" autoFocus={true} disabled={this.state.textArea} placeholder={this.state.text}
                                    onChange={(event) => {
                                        this.setState({
                                        text: event.target.value
                                        });
                                }}/>
                          </Dropzone>
                          </InputGroup>
                      </FormGroup>
                          </Panel.Body>
                      </Panel>
                  </div>
                </div>
                  <br/>
                  <br/>
                  <br/>
                  
                <div className="row">
                  
                  <div className="col-md-2">
                   Question: 
                  </div>
                  <div className="col-md-8">
                   <input type="text" className="form-control" placeholder={this.state.question}
                       onChange={(event) => {
                           this.setState({
                               question:event.target.value
                           });
                       }}/>
                  </div>
                  
                </div>
                <br/>
                <div className="row">
                  <div className="col-md-2">
                     <label>Answer:</label>
                  </div>
                </div>
                
                <br/>
                <br/>

                <Button bsStyle="success" >Submit</Button>
                <div className="space"></div>
                <Button bsStyle="primary" onClick={()=>this.newQuestion()}>New Question</Button>
                <div className="space"></div>
                <Button bsStyle="info" onClick={()=>this.setState({show:true})}>Search Web</Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleHide}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title">
                            Enter the Link
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" className="form-control" placeholder={this.state.link}
                               onChange={(event) => {
                                   this.setState({
                                       link:event.target.value
                                   });
                               }}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle = "success" onClick={()=>{this.handleLink()}}> Search</Button>
                        <div className="space"></div>
                        <Button bsStyle="danger" onClick={()=>{this.handleHide()}}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Footer/>
            
            </div>
        );
    }
}

export default HomePage;