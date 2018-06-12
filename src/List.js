import React, {Component} from 'react';
import Shelf from './Shelf.js';
import {Link} from 'react-router-dom';

export default class List extends Component {
    render() {

        return (
            <div className="list-books">
                <div className="list-books-content">
                    <div>
                        <Shelf name='Currently Reading' List={this.props.curReading} changeState={this.props.changeState}/>
                        <Shelf name='Want to Read'  List={this.props.wntRead} changeState={this.props.changeState}/>
                        <Shelf name='Read'  List={this.props.read} changeState={this.props.changeState}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add book</Link>
                </div>
            </div>
        );
    }
}