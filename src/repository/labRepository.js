import axios from '../custom-axios/axios';

const LabService = {
    fetchCategories: () => {
        return axios.get("/categories");
    },
    fetchBooks: () => {
        return axios.get("/books");
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    addBook: (name, category, author, availableCopies) => {
      return axios.post("/books/add",{
          "name": name,
          "category": category,
          "author": author,
          "availableCopies": availableCopies
      })
    },
    editBook: (id, name, category, author, availableCopies) => {
        return axios.put(`/books/edit/${id}`,{
            "name": name,
            "category": category,
            "author": author,
            "availableCopies": availableCopies
        })
    },
    markBookAsTaken: (id) => {
        return axios.put(`/books/mark-taken/${id}`);
    }
}

export default LabService;