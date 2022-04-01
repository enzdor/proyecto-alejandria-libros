import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './Pages/Home';
import Books from './Pages/Books';
import Profile from './Pages/Profile';
import AddBook from './Pages/AddBook';
import BookDetail from './Pages/BookDetail';
import BookBuy from './Pages/BookBuy';
import EditBook from './Pages/EditBook';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/buy/:id" element={<BookBuy />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addbook" element={<AddBook />} />
      </Routes>
    </Router>
  );
}

export default App;