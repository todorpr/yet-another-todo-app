var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://shining-inferno-4954.firebaseio.com/'; //https://blistering-torch-4253.firebaseio.com/';

var App = React.createClass({
    mixins: [ReactFire], // copy methods from the mixin to our code
    // rendered once only
    componentWillMount: function(){
        // react fire function
        this.fb = new Firebase(rootUrl + 'items/');
        this.bindAsObject(this.fb, 'items');
        this.fb.on('value', this.handleDataLoaded)
    },
    getInitialState: function(){
        return {
            items: {}
        }
    },
    render: function(){
        return (
            <div className="row panel panel-default">
                <div className="col-md-8 col-md-offset-2">
                    <h2 className="text-center">
                        Yet Another To-Do List
                    </h2>                     
                    <Header itemsStore={this.firebaseRefs.items} />
                    <hr />
                    <div className={"content " + this.state.loaded ? "loaded" : ""}>
                        <List items={this.state.items} />
                        {this.deleteButton()}
                    </div>
                </div>    
            </div>
        )
    },
    deleteButton: function(){
        if(!this.state.loaded){
            return;
        } else {
            return (
                <div className="text-center clear-complete">
                    <hr />
                    <button 
                        type="button"
                        onClick={this.onDeleteDoneClick}
                        className="btn btn-default">
                        Clear Completed
                    </button>
                </div>
            )
        }
    },
    onDeleteDoneClick: function(){
        for(var key in this.state.items){
            if(this.state.items[key].done === true){
                this.fb.child(key).remove();
            }
        }
    },
    handleDataLoaded: function(){
        this.setState({
            loaded: true
        })
    }
});

var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));
