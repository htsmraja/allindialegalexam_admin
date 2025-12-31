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
import ExamType from "./screen/mockTest/examType/ExamType";
import AddExamType from "./screen/mockTest/examType/AddExamType";
import EditExamType from "./screen/mockTest/examType/EditExamType";
import QuestionBanks from "./screen/mockTest/questionBanks/QuestionBanks";
import AddQuestionBank from "./screen/mockTest/questionBanks/AddQuestionBank";
import EditQuestionBank from "./screen/mockTest/questionBanks/EditQuestionBank";
import AddMultipleMCQ from "./screen/mockTest/questions/AddMultipleMCQ";
import ExamPage from "./screen/mockTest/test/ExamPage";
import AddMultipleQuestions from "./screen/mockTest/questions/AddMultipleQuestions";
import QuestionList from "./screen/mockTest/questions/QuestionList";
import QuestionPaperList from "./screen/questionPaper/QuestionPapers";
import AddQuestionPaper from "./screen/questionPaper/AddQuestionPaper";
import PaperQuestionList from "./screen/mockTest/questions/PaperQuestionList";
import AddQuestionsToPaper from "./screen/questionPaper/AddQuestionsToPaper";
import QuestionBankType from "./screen/questionBankType/QuestionBankType";
import AddQuestionBankType from "./screen/questionBankType/AddQuestionBankType";
import MockTestList from "./screen/mockTest/mocktest/MockTestList";
import AddMockTest from "./screen/mockTest/mocktest/AddMockTest";
import FaqList from "./screen/faq/FaqList";
import CmsList from "./screen/cms/CmsList";
import StoreSettings from "./screen/StoreSettings";
import AddLiveClass from "./screen/live-classes/AddLiveClass";

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
          <Route path="/exam-type" element={<ExamType />} />
          <Route path="/add-exam-type" element={<AddExamType />} />
          <Route path="/question-bank-type" element={<QuestionBankType />} />
          <Route path="/add-question-bank-type" element={<AddQuestionBankType />} />
          <Route path="/edit-exam-type/:id" element={<EditExamType />} />
          <Route path="/question_banks" element={<QuestionBanks />} />
          <Route path="/add-question_bank" element={<AddQuestionBank />} />
          <Route path="/edit-question_bank/:id" element={<EditQuestionBank />} />
          <Route path="/rajaram" element={<AddMultipleMCQ />} />
          <Route path="/examtype" element={<ExamPage />} />
          <Route path="/add-question/:id" element={<AddMultipleQuestions />} />
          <Route path="/question-list/:id" element={<QuestionList />} />
          <Route path="/question_paper" element={<QuestionPaperList />} />
          <Route path="/add-question-paper" element={<AddQuestionPaper />} />
          <Route path="/question-paper-list/:id/:exam_type_id" element={<PaperQuestionList />} />
          <Route path="/add-paper-question/:id/:exam_type_id" element={<AddQuestionsToPaper />} />
          <Route path="/mock-test" element={<MockTestList />} />
          <Route path="/add-mock-test" element={<AddMockTest />} />
          <Route path="/faqs" element={<FaqList />} />
          <Route path="/cms" element={<CmsList />} />
          <Route path="/store-settings" element={<StoreSettings />} />
          <Route path="/batches/add-live-class" element={<AddLiveClass />} />


        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
