/* eslint-disable no-unused-vars */
import { Fragment, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./screen/auth/Login";
import DashboardContainer from "./screen/Home";
import CommonLayout from "./component/common/common-layout";
import Categories from "./screen/Categories";
import SubCategoryList from "./screen/SubCategoryList";
import BookList from "./screen/book/BookList";
import AddBook from "./screen/book/AddBook";
import EditBook from "./screen/book/EditBook";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/" element={<DashboardContainer />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/subcategory-List/:id" element={<SubCategoryList />} />
          <Route path="/book-list" element={<BookList />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book" element={<EditBook />} />

        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
