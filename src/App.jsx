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
import TeacherList from "./screen/teacher/TeacherList";
import AddTeacher from "./screen/teacher/AddTeacher";
import StudentList from "./screen/students/StudentList";
import CourseList from "./screen/course/CourseList";
import AddCourse from "./screen/course/AddCourse";
import AddBatch from "./screen/batches/AddBatch";
import BatchList from "./screen/batches/BatchList";
import EditBatch from "./screen/batches/EditBatch";
import BannerList from "./screen/banner/BannerList";

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
          <Route path="/teachers-list" element={<TeacherList />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/student-list" element={<StudentList />} />
          <Route path="/course-list" element={<CourseList />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/batches/add-batch" element={<AddBatch />} />
          <Route path="/batches/edit-batch" element={<EditBatch />} />
          <Route path="/batch-list" element={<BatchList />} />
          <Route path="/banner-list" element={<BannerList />} />

        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
