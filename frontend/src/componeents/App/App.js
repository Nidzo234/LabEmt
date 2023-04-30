import logo from '../../logo.svg';
import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "../Header/header";
import Categories from "../Category/category";
import BookService from "../../repository/eShopRepository";
import BookList from "../Books/books";
import BookAdd from "../Books/Add/bookAdd";
import BookEdit from "../Books/Edit/bookEdit";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }
    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className={"container"}>
                        <Routes>
                            <Route path={"/"} exact
                                   element={<BookList books={this.state.books} onEdit={this.getBook} onDelete={this.deleteBook}
                                                      onMarkAsTaken={this.markAsTaken}/>}/>
                            <Route path={"/books"} exact
                                   element={<BookList books={this.state.books} onEdit={this.getBook} onDelete={this.deleteBook}
                                                      onMarkAsTaken={this.markAsTaken}/>}/>
                            <Route path={"/categories"} exact
                                   element={<Categories categories={this.state.categories}/>}/>
                            <Route path={"/books/add"} exact
                                   element={<BookAdd categories={this.state.categories} authors={this.state.authors}
                                                     onAddBook={this.addBook}
                                   />}/>
                            <Route path={"/books/edit/:id"} exact
                                   element={<BookEdit categories={this.state.categories} authors={this.state.authors}
                                                      onEditBook={this.editBook} book={this.state.selectedBook}
                                   />}/>
                        </Routes>
                        {/*<Redirect to={"/products"}/>*/}
                    </div>
                </main>
            </Router>
        );
    }


    loadCategories = () => {
        BookService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }

    loadBooks = () => {
        BookService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
                // console.log(data.data)
            });
    }

    loadAuthors = () => {
        BookService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    addBook = (name, category, authorId, availableCopies) => {
        BookService.addBook(name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    editBook = (id, name, category, authorId, availableCopies) => {
        BookService.editBook(id, name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    deleteBook= (id) => {
        BookService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    markAsTaken = (id) => {
        BookService.markAsTaken(id)
            .then(()=>{
                this.loadBooks();
            })
    }

    getBook = (id) => {
        BookService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    componentDidMount() {
        this.loadCategories();
        this.loadBooks()
        this.loadAuthors()
    }
}

export default App;