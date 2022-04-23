import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Header from "../Header/header"
import Categories from "../Categories/categories";
import Books from "../Books/BookList/books";
import LabService from "../../repository/labRepository";
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      categories: [],
        authors: [],
      selectedBook: {},
    }
  }

  render() {
    return (
        <Router>
          <Header/>
          <main>
            <div className="container">
                <Routes>
              <Route path={"/categories"}  element={
                  <Categories categories={this.state.categories}/>} exact/>
              <Route path={"/books/add"}  element={
                  <BookAdd categories={this.state.categories}
                           authors={this.state.authors}
                           onAddBook={this.addBook}/>} exact/>
              <Route path={"/books/edit/:id"}  element={
                  <BookEdit categories={this.state.categories}
                               authors={this.state.authors}
                               onEditBook={this.editBook}
                               book={this.state.selectedBook}/>} exact/>
              <Route path={"/books"}  element={
                  <Books books={this.state.books}
                            onDelete={this.deleteBook}
                            onEdit={this.getBook}
                            onMarkAsTaken={this.markAsTaken}/>} exact/>
                </Routes>

            </div>
          </main>
        </Router>
    );
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.loadBooks();
    this.loadCategories();
    this.loadAuthors();
  }

  loadBooks = () => {
    LabService.fetchBooks()
        .then((data) => {
          this.setState({
            books: data.data
          })
        })
  }
  loadAuthors = () => {
      LabService.fetchAuthors()
          .then((data) => {
              this.setState({
                  authors: data.data
              })
          })
    }

  loadCategories = () => {
    LabService.fetchCategories()
        .then((data) => {
          this.setState({
            categories: data.data
          })
        })
  }

  getBook = (id) => {
    LabService.getBook(id)
        .then((data) => {
          this.setState({
            selectedBook: data.data
          })
        })
  }

  deleteBook = (id) => {
    LabService.deleteBook(id)
        .then(() => {
          this.loadBooks();
        });
  }

  markAsTaken = (id) => {
      LabService.markBookAsTaken(id)
          .then(() => {
              this.loadBooks();
          });
  }

  addBook = (name, category, author, availableCopies) => {
    LabService.addBook(name, category, author, availableCopies)
        .then(() => {
          this.loadBooks();
        });
  }

  editBook = (id, name, category, author, availableCopies) => {
    LabService.editBook(id, name, category, author, availableCopies)
        .then(() => {
          this.loadBooks();
        });
  }
}

export default App;
