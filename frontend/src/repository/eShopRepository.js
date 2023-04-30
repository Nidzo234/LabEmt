import axios from "../custom-axios/axios";


const BookService = {

    fetchCategories: () => {
        return axios.get("/books/categories");
    },
    fetchBooks: () => {
        return axios.get("/books");
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    addBook: (name, category, authorId, availableCopies) => {
        return axios.post("/books/add",{
            "name" : name,
            "category" : category,
            "author" : authorId,
            "availableCopies" : availableCopies,
        })
    },
    editBook: (id,name, category, authorId, availableCopies) => {

        return axios.put(`/books/edit/${id}`, {
            "name": name,
            "category": category,
            "author": authorId,
            "availableCopies": availableCopies
        });

    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`)
    },
    markAsTaken: (id) => {
        return axios.get(`/books/markBook/${id}`)
    }

}

export default BookService;