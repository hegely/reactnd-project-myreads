import React, {Component} from 'react';

export default class Book extends Component {

    render() {
        const {book} = this.props;
        const {imageLinks} = this.props.book;
        let image = imageLinks ? imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';
        image = image.replace("http://", "https://");
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: 'url('+image+')' }}/>
                    <div className="book-shelf-changer">
                        <select onChange={(e) =>this.props.changeState(this.props.book,e.target.value)} defaultValue={book.shelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{Array.isArray(book.authors) ? book.authors.join(', '): ''}</div>
            </div>);
    }
}
