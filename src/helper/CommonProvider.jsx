/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const CommonProvider = ({ children }) => {
  const navigate = useNavigate()
  const { Authtoken } = useAuthContext()
  const base_url = import.meta.env.VITE_API_URL

  const [menuList, setMenuList] = useState({ loading: false, data: [] })
  const getMenuList = async () => {
    try {
      const response = await axios.get(`${base_url}/menu/list`, { headers: { 'Authorization': Authtoken } });
      if (response.status === 200) {
        setMenuList({ data: response?.data?.data || [], loading: false })
      } else {
        toast.error(response?.data?.message)
        setMenuList({ ...menuList, loading: false })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Server error');
      setMenuList({ ...menuList, loading: false })
    }
  }
  const [category, setCategory] = useState([{ loading: false, data: [] }])

  const getCategoryList = async (filter = {}) => {
    try {
      setCategory({ ...category, loading: true });
      const response = await axios.post(
        `${base_url}/category/details`, filter,
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setCategory({ data: response?.data?.data || [], loading: false });
      } else {
        setCategory({ ...category, loading: false });
        toast.error('Failed to fetch category list');
      }
    } catch (error) {
      console.error('Error category List:', error);
      // toast.error('An error occurred while fetching the Category');
    }
  }

  const addCategory = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/category/add`,
        formDataToSend,  // Pass FormData directly without spreading
        {
          headers: {
            Authorization: Authtoken,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status) {
        toast.success('Category added successfully');
        getCategoryList();
      } else {
        toast.error("Failed to add Category");
      }
    } catch (error) {
      console.log(error, "error")
      console.error("Error adding Category:", error.response.data.message);
      toast.error(error.response.data.message || "An error occurred while adding the Category");
    }
  };

  const editCategory = async (id, payload) => {
    try {
      const { status } = await axios.post(`${base_url}/category/update/${id}`, payload, {
        headers: { Authorization: Authtoken },
      });
      status === 200 && (toast.success('Category updated successfully'), getCategoryList())
    } catch {
      toast.error("Something went wrong");
    }
  };
  const categoryDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/category/delete/${id}`,
        { headers: { Authorization: Authtoken } }
      );

      if (response.data?.status) {
        toast.success(response.data.message || 'Category deleted successfully');
        getCategoryList();
      } else {
        toast.error(response.data?.message || 'Failed to delete category');
      }

    } catch (error) {
      console.error('Error deleting category:', error);

      // Show backend message if available
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while deleting the category');
      }
    }
  };

  const toggleCategoryStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(`${base_url}/category/toggle/${id}`, {
        is_active: newStatus,
      });

      if (response.data.status) {
        toast.success(response.data.message || "Category status updated");
        return response.data;
      } else {
        toast.error(response.data.message || "Failed to update category status");
        return null;
      }
    } catch (error) {
      console.error("Error toggling category status:", error);
      toast.error("An error occurred while updating the status");
      return null;
    }
  };
  const [subcategory, setSubCategory] = useState([{ loading: false, data: [] }])

  const getSubCategoryList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/sub-category/Details`, { parentId: data },
        { headers: { Authorization: Authtoken } }
      );
      // const data = response.data;
      if (response.status === 200) {
        setSubCategory({ data: response?.data?.data || [], loading: false });
      } else {
        setSubCategory({ ...subcategory, loading: false });

        toast.error('Failed to fetch subcategory list');
      }
    } catch (error) {
      console.error('Error subcategory List:', error);
      // toast.error('An error occurred while fetching the Category');
    }
  }

  const addsubCategory = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/category/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 201 && response.data.status) {
        toast.success('SubCategory added successfully');
      } else {
        toast.error("Failed to add SubCategory");
      }
    } catch (error) {
      console.error("Error adding SubCategory:", error);
      toast.error("An error occurred while adding the SubCategory");
    }
  };
  const [bookList, setBookList] = useState({
    data: [],
    pagination: {},
    loading: false
  });

  const getBookList = async (formDataToSend) => {
    try {
      setBookList(prev => ({ ...prev, loading: true }));

      const response = await axios.post(
        `${base_url}/admin/book/list`,
        formDataToSend,   // { page, limit, search, approval_status }
        {
          headers: {
            Authorization: Authtoken,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.data.status) {
        setBookList({
          data: response.data.data.list,
          pagination: response.data.data.pagination,
          loading: false
        });
      } else {
        setBookList(prev => ({ ...prev, loading: false }));
        console.error("API Error:", response.data.message);
      }
    } catch (error) {
      setBookList(prev => ({ ...prev, loading: false }));
      console.error("Request Failed:", error);
    }
  };

  const addBook = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/book/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message)
        navigate("/book-list");

      }
    } catch (error) {
      console.log(error)
    }
  }
  const [teacherList, setTeacherList] = useState({
    data: [],
    pagination: {},
    loading: false
  })
  const getTeacherList = async (formDataToSend) => {
    try {
      setTeacherList(prev => ({ ...prev, loading: true }));

      const response = await axios.post(
        `${base_url}/admin/teacher/list`,
        formDataToSend,   // { page, limit, search, approval_status }
        {
          headers: {
            Authorization: Authtoken,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 200 && response.data.success) {
        setTeacherList({
          data: response.data.data,
          pagination: response.data.pagination,
          loading: false
        });
      } else {
        setTeacherList(prev => ({ ...prev, loading: false }));
        console.error("API Error:", response.data.message);
      }
    } catch (error) {
      setTeacherList(prev => ({ ...prev, loading: false }));
      console.error("Request Failed:", error);
    }
  }
  const addTeacher = async (data) => {
    try {
      const response = await axios.post(`${base_url}/teacher/signup`, data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.status === 200 && response.data?.success) {
        getTeacherList({ page: 1, limit: 10 });
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");

    }
  }

  const approveTeacher = async (id) => {
    try {
      const response = await axios.put(`${base_url}/admin/teacher/approve/${id}`, {}, { headers: { Authorization: Authtoken } });
      console.log(response)
      if (response.data?.success) {
        toast.success(response.data.message || "Teacher approved successfully");
        // getTeacherList();
      } else {
        toast.error(response.data?.message || "Failed to approve teacher");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const rejectTeacher = async (id) => {
    try {
      const response = await axios.put(`${base_url}/admin/teacher/reject/${id}`, {}, { headers: { Authorization: Authtoken } });
      console.log(response)

      if (response.data?.success) {
        toast.success(response.data.message || "Teacher Rejected successfully");
        // getTeacherList();
      } else {
        toast.error(response.data?.message || "Failed to reject teacher");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [allTeacher, setAllTeacher] = useState({
    data: [],
    loading: false
  })
  const getAllTeacher = async () => {
    try {
      setAllTeacher(prev => ({ ...prev, loading: true }));

      const response = await axios.get(
        `${base_url}/admin/all-teacher/list`,
        {
          headers: {
            Authorization: Authtoken,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.status === 200 && response.data.success) {
        setAllTeacher({
          data: response.data.teachers,
          loading: false
        });
      } else {
        setAllTeacher(prev => ({ ...prev, loading: false }));
        console.error("API Error:", response.data.message);
      }
    } catch (error) {
      setAllTeacher(prev => ({ ...prev, loading: false }));
      console.error("Request Failed:", error);
    }
  }
  const [courseList, setCourseList] = useState({
    data: [],
    pagination: {},
    loading: false
  });

  const getCourseList = async (formDataToSend) => {
    try {
      setCourseList(prev => ({ ...prev, loading: true }));

      const response = await axios.post(
        `${base_url}/admin/courses/list`,
        formDataToSend, // { page, limit, search, approval_status }
        {
          headers: {
            Authorization: Authtoken,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.status) {
        setCourseList({
          data: response.data.data || [],
          pagination: response.data.pagination || {},
          loading: false
        });
      } else {
        console.error("API Error:", response.data.message);
        setCourseList(prev => ({ ...prev, loading: false }));
      }

    } catch (err) {
      console.error("Request failed:", err);
      setCourseList(prev => ({ ...prev, loading: false }));
    }
  };

  const addCourse = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/create-courses`,
        data,
        {
          headers: {
            Authorization: Authtoken,
            "Content-Type": "multipart/form-data" // for thumbnail + video
          }
        }
      );

      return response.data;

    } catch (err) {
      console.error("Add course error:", err);
      return { status: false, message: err.message };
    }
  };
  const [batchList, setBatchList] = useState({
    data: [],
    pagination: {},
    loading: false
  });
  const getBatchList = async (filters, courseId) => {
    setBatchList(prev => ({ ...prev, loading: true }));

    try {
      const response = await axios.post(
        `${base_url}/admin/courses/list-batches/${courseId}`,
        filters, // body = { page, limit, search, status }
        {
          headers: {
            Authorization: Authtoken,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        setBatchList({
          data: response.data.data,
          pagination: response.data.pagination,
          loading: false
        });
      } else {
        setBatchList(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.log(error);
      setBatchList(prev => ({ ...prev, loading: false }));
    }
  };

  const addBatch = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/courses/create-batch`,
        data,
        {
          headers: {
            Authorization: Authtoken,
            "Content-Type": "application/json"
          }
        }
      );
      // console.log(response.data, "response.data")
      if (response.data.success) {
        navigate('/batch-list', { state: { courseId: response.data.course_id } })
        toast.success(response.data.message || "Batch created successfully");
      } else {
        toast.error(response.data.message || "Failed to create batch");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const assignTeacherToBatch = async (course_id, course_batches_id, teacher_id) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/batch/assign-teacher`,
        { course_id, course_batches_id, teacher_id },
        {
          headers: {
            Authorization: Authtoken,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.data.success) {
        getBatchList({ page: 1, limit: 10 }, course_id)
        toast.success(response.data.message || "Teacher assigned successfully");
      } else {
        toast.error(response.data.message || "Failed to assign teacher");
      }
    } catch (error) {
      console.log(error)
    }
  };
  const [BannerList, setBannerList] = useState({ loading: false, data: [], total: '' })

  const getBannerList = async (dataToSend) => {
    try {
      setBannerList({ data: [], total: '', loading: true });
      const response = await axios.post(
        `${base_url}/admin/banner/list`,
        { ...dataToSend },
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setBannerList({ data: response?.data?.data || [], total: response.data.total, loading: false });
      } else {
        setBannerList({ data: [], total: '', loading: false });
        toast.error("Failed to fetch product list");
      }
    } catch (error) {
      setBannerList({ data: [], total: '', loading: false });
    }
  };

  const addBanner = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/banner/add`,
        formDataToSend,  // Pass FormData directly without spreading
        {
          headers: {
            Authorization: Authtoken,
          }
        }
      );
      if (response.status === 200) {
        toast.success('Banner added successfully');
        getBannerList();  // Refresh the banner list after success
      } else {
        toast.error("Failed to add banner");
      }
    } catch (error) {
      console.error("Error adding banner:", error);
      if (error.response) {
        // Server responded but with an error code (4xx / 5xx)
        toast.error(
          error.response.data?.message ||
          `Server Error: ${error.response.statusText}`
        );
      } else if (error.request) {
        // Request made but no response received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something else went wrong (client-side)
        toast.error("Unexpected error occurred. Please try again later.");
      }
    }
  };

  const editBranner = async (id, formData) => {
    try {
      const response = await axios.post(
        `${base_url}/banner/update/${id}`,
        formData,
        {
          headers: {
            Authorization: Authtoken,
            "Content-Type": "multipart/form-data", // Set this for FormData
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success('Branner updated successfully');
        getBannerList();  // Refresh the brand list after success
      } else {
        toast.error('Failed to update the Branner');
      }
    } catch (error) {
      console.error('Error updating Branner:', error);
      toast.error('An error occurred while updating the Branner');
    }
  };

  const switchBranner = async (id, newStatus) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/banner/status/update/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: Authtoken,
            'Content-Type': 'application/json'
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success('status updated successfully');
        getBannerList();  // Refresh the brand list after success
      } else {
        toast.error('Failed to update the status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('An error occurred while updating the status');
    }
  };


  const bannerDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/banner/delete/${id}`,
        { headers: { Authorization: Authtoken } }
      );

      if (response.status === 200) {
        toast.success('Banner deleted successfully');
        getBannerList();
      } else {
        toast.error('Failed to delete Banner');
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('An error occurred while deleting the Banner');
    }
  }
  const [dashboardCount, setDashboardCount] = useState({ loading: true, data: [] })

  const getDashboardCount = async () => { }

  const [examTypeList, setExamTypeList] = useState({
    data: [],
    loading: false
  });

  const getExamTypeList = async () => {
    try {
      setExamTypeList(prev => ({ ...prev, loading: true }));
      const response = await axios.post(
        `${base_url}/admin/exam-type/list`,
        {}, // POST body (empty)
        {
          headers: {
            Authorization: Authtoken,
          }
        }
      );
      setExamTypeList({
        data: response.data.data || [],
        loading: false
      });
    } catch (error) {
      console.error("Error fetching Exam Types:", error);
      toast.error(
        error.response?.data?.message ||
        `Server Error: ${error.response?.statusText}`
      );
      setExamTypeList(prev => ({ ...prev, loading: false }));
    }
  };


  const addExamType = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/exam-type/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
          }
        }
      );
      if (response.status === 200 && response.data.success) {
        toast(response.data.message)
        getExamTypeList();
        navigate("/exam-type")
      }
    } catch (error) {
      console.error("Error adding Exam:", error);
      if (error.response) {
        // Server responded but with an error code (4xx / 5xx)
        toast.error(
          error.response.data?.message ||
          `Server Error: ${error.response.statusText}`
        );
      } else if (error.request) {
        // Request made but no response received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something else went wrong (client-side)
        toast.error("Unexpected error occurred. Please try again later.");
      }
    }
  }


  const [questionBankTypeList, setQuestionBankTypeList] = useState({
    data: [],
    loading: false
  });

  const getquestionBankTypeList = async () => {
    try {
      setQuestionBankTypeList(prev => ({ ...prev, loading: true }));
      const response = await axios.post(
        `${base_url}/admin/question-bank-type/list`,
        {}, // POST body (empty)
        {
          headers: {
            Authorization: Authtoken,
          }
        }
      );
      setQuestionBankTypeList({
        data: response.data.data || [],
        loading: false
      });
    } catch (error) {
      console.error("Error fetching Exam Types:", error);
      toast.error(
        error.response?.data?.message ||
        `Server Error: ${error.response?.statusText}`
      );
      setQuestionBankTypeList(prev => ({ ...prev, loading: false }));
    }
  };


  const addquestionBankTypeList = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/question-bank-type/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
          }
        }
      );
      if (response.status === 200 && response.data.success) {
        toast(response.data.message)
        getquestionBankTypeList();
        navigate("/question-bank-type")
      }
    } catch (error) {
      console.error("Error adding Exam:", error);
      if (error.response) {
        // Server responded but with an error code (4xx / 5xx)
        toast.error(
          error.response.data?.message ||
          `Server Error: ${error.response.statusText}`
        );
      } else if (error.request) {
        // Request made but no response received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something else went wrong (client-side)
        toast.error("Unexpected error occurred. Please try again later.");
      }
    }
  }


  const [questionBankList, setQuestionBankList] = useState({
    data: [],
    loading: false
  });
  const getQuestionBanks = async () => {
    try {
      setQuestionBankList(prev => ({ ...prev, loading: true }));
      const response = await axios.post(
        `${base_url}/admin/question-bank/list`,
        {}, // POST body (empty)
        {
          headers: {
            Authorization: Authtoken,
          }
        }
      );
      setQuestionBankList({
        data: response.data.data || [],
        loading: false
      });
    } catch (error) {
      console.error("Error fetching Exam Types:", error);
      toast.error(
        error.response?.data?.message ||
        `Server Error: ${error.response?.statusText}`
      );
      setQuestionBankList(prev => ({ ...prev, loading: false }));
    }
  }

  const addQuestionBank = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/question-bank/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
          }
        }
      );
      if (response.status === 200 && response.data.status) {
        toast(response.data.message)
        getQuestionBanks();
        navigate("/question_banks")
      }
    } catch (error) {
      console.error("Error adding Exam:", error);
      if (error.response) {
        // Server responded but with an error code (4xx / 5xx)
        toast.error(
          error.response.data?.message ||
          `Server Error: ${error.response.statusText}`
        );
      } else if (error.request) {
        // Request made but no response received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something else went wrong (client-side)
        toast.error("Unexpected error occurred. Please try again later.");
      }
    }
  }

  const [questions, setQuestions] = useState({
    data: [],
    loading: false
  });
  const getQuestionsByBank = async (bank_id) => {
    setQuestions((prev) => ({ ...prev, loading: true }));

    try {
      const response = await axios.post(
        `${base_url}/admin/multipule-question/list`,
        { bank_id },
        {
          headers: {
            Authorization: Authtoken,
          }
        }
      );
      //  console.log(response)
      const data = response.data.data || [];

      setQuestions({
        data,
        loading: false,
      });
    } catch (error) {
      console.log("Error loading questions:", error);
      setQuestions({
        data: [],
        loading: false,
      });
    }
  };


  const addMultipuleQuestion = async (bank_id, questionsData) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/multipule-question/add`,
        {
          bank_id,
          questions: questionsData
        },
        {
          headers: {
            Authorization: Authtoken,
          }
        }
      );
      console.log(response.data)
      if (response.data.status) {
        await getQuestionsByBank(bank_id);
        navigate(`/question-list/${bank_id}`)
      }

    } catch (error) {
      console.log("Error adding multiple questions:", error);
      throw error;
    }
  };


  const [questionPaperList, setQuestionPaperList] = useState({
    data: [],
    loading: false
  });
  const getQuestionPaperList = async (filters) => {
    setQuestionPaperList(prev => ({ ...prev, loading: true }));

    try {
      const response = await axios.post(
        `${base_url}/admin/question-paper/list`,
        filters,
        {
          headers: {
            Authorization: Authtoken
          }
        }
      );
      if (response.data.success) {
        setQuestionPaperList({
          data: response.data.data,
          loading: false
        });
      } else {
        setQuestionPaperList(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.log(error);
      setQuestionPaperList(prev => ({ ...prev, loading: false }));
    }
  }


  const [questionList, setQuestionList] = useState({
    data: [],
    loading: false,
    page: 1,
    limit: 20,
    total: 0,
    total_pages: 0
  });

  const getQuestionsByExamType = async (filter) => {
    setQuestionList((prev) => ({ ...prev, loading: true }));

    try {
      const response = await axios.post(
        `${base_url}/admin/multipule-question-by-exam-type/list`,
        filter,
        {
          headers: {
            Authorization: Authtoken,
          },
        }
      );

      const res = response?.data;
      // console.log(response?.data)
      setQuestionList({
        data: res?.data || [],
        loading: false,
        page: res?.page || 1,
        limit: res?.limit || 20,
        total: res?.total || 0,
        total_pages: res?.total_pages || 0,
      });

    } catch (error) {
      console.log("Error loading questions:", error);

      setQuestionList({
        data: [],
        loading: false,
        page: 1,
        limit: 20,
        total: 0,
        total_pages: 0,
      });
    }
  };


  const addQuestionPaper = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/question-paper/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
          }
        }
      );
      console.log(response, "response")
      if (response.status === 200 && response.data.status) {
        toast(response.data.message)
        getQuestionPaperList();
        navigate("/question_paper")
      }
    } catch (error) {
      console.error("Error adding Exam:", error);
      if (error.response) {
        // Server responded but with an error code (4xx / 5xx)
        toast.error(
          error.response.data?.message ||
          `Server Error: ${error.response.statusText}`
        );
      } else if (error.request) {
        // Request made but no response received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something else went wrong (client-side)
        toast.error("Unexpected error occurred. Please try again later.");
      }
    }
  }
  const [paperQuestionList, setPaperQuestionList] = useState({
    data: {
      paper: null,
      questions: []
    },
    loading: false
  });

  const getPaperQuestions = async (question_paper_id) => {
    setPaperQuestionList(prev => ({ ...prev, loading: true }));

    try {
      const response = await axios.post(
        `${base_url}/admin/question-to-paper/list`,
        { question_paper_id },   // FIXED
        {
          headers: {
            Authorization: Authtoken,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(response.data)
      if (response.data.success) {
        setPaperQuestionList({
          data: {
            paper: response.data.paper,
            questions: response.data.questions
          },
          loading: false
        });
      } else {
        setPaperQuestionList(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.log(error);
      setPaperQuestionList(prev => ({ ...prev, loading: false }));
    }
  };

  const addQuestionsToPaper = async (data, id, exam_type_id) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/question-to-paper/add`,
        data,
        {
          headers: { Authorization: Authtoken }
        }
      );
      if (response.status === 200 && response.data.status) {
        navigate(`/question-paper-list/${id}/${exam_type_id}`);

      }
      console.log(response);

    } catch (error) {
      console.log("Error adding multiple questions:", error);
      throw error;
    }
  };
  const [mockTestList, setMockTestList] = useState({
    data: [], loading: false
  })
  const getMockTestList = async () => {
    setMockTestList(prev => ({ ...prev, loading: true }));

    try {
      const response = await axios.post(
        `${base_url}/admin/mock-test/list`,
        {},
        {
          headers: { Authorization: Authtoken }
        }
      );
      console.log(response)
      if (response.status === 200 && response.data.status) {
        setMockTestList({
          data: response.data.data,
          loading: false
        });
      } else {
        setMockTestList(prev => ({ ...prev, loading: false }));
      }
    } catch (error) {
      console.log(error);
      setMockTestList(prev => ({ ...prev, loading: false }));
    }
  }

  const addMockTest = async (payload) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/mock-test/add`,
        payload,
        {
          headers: { Authorization: Authtoken }
        }
      );
      if (response.status === 200 && response.data.status) {
        navigate('/mock-test')
        toast(response.data.message)
      }


    } catch (error) {
      console.log("Error adding mock test:", error);
      throw error;
    }
  }

  const [FaqList, setFaqList] = useState({ loading: false, data: [] })

  const getFaqList = async () => {
    try {
      setFaqList({ data: [], loading: true });
      const response = await axios.post(
        `${base_url}/faq/list`,
        {},
        { headers: { Authorization: Authtoken } }
      );
      if (response.status === 200) {
        setFaqList({ data: response?.data?.data || [], loading: false });
      } else {
        setFaqList({ ...FaqList, loading: false });
        toast.error("Failed to fetch varity list");
      }
    } catch (error) {
      setFaqList({ ...FaqList, loading: false });
      toast.error(error.response?.data?.message || 'Server error');
    }
  };

  const addFaq = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/faq/add`,
        formDataToSend,
        {
          headers: {
            Authorization: Authtoken,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        toast.success('FAQ added successfully');
        getFaqList();
      } else {
        toast.error("Failed to add FAQ ");
      }
    } catch (error) {
      console.error("Error adding FAQ:", error);

      if (error.response) {
        toast.error(
          error.response.data?.message ||
          `Server Error: ${error.response.statusText}`
        );
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An error occurred while adding the FAQ ");
      }
    }
  };

  const deleteFaq = async (id) => {
    try {
      const { status } = await axios.delete(`${base_url}/faq/delete/${id}`, {
        headers: { Authorization: Authtoken },
      });
      status === 200 && (toast.success('FAQ deleted successfully'), getFaqList())
    } catch {
      toast.error("Something went wrong");
    }
  };

  const editFaq = async (id, payload) => {
    try {
      const { status } = await axios.put(`${base_url}/faq/update/${id}`, payload, {
        headers: { Authorization: Authtoken },
      });
      status === 200 && (toast.success('FAQ updated successfully'), getFaqList())
    } catch {
      toast.error("Something went wrong");
    }
  };
  const [cmsList, setCmsList] = useState({ loading: true, data: [] })

  const getCmsList = async (data) => {
    try {
      const response = await axios.post(
        `${base_url}/cms/list`,
        {},
        { headers: { 'Authorization': Authtoken } }
      );
      const data = response.data;
      // console.log(response.data)
      if (response.status === 200) {
        setCmsList({ data: response?.data?.data || [], loading: false });
      } else {
        setCmsList({ ...cmsList, loading: false });
        toast.error("Failed to fetch Bag Type list");
      }
    } catch (error) {
      setCmsList({ ...cmsList, loading: false });
      toast.error(error.response?.data?.message || 'Server error');
    }
  };



  const addCms = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/cms/add`,
        formDataToSend,  // Pass FormData directly without spreading
        {
          headers: {
            Authorization: Authtoken,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        toast.success('CMS added successfully');
        getCmsList();  // Refresh the banner list after success
      } else {
        toast.error("Failed to add CMS ");
      }
    } catch (error) {
      console.error("Error adding CMS:", error);
      if (error.response) {
        toast.error(
          error.response.data?.message ||
          `Server Error: ${error.response.statusText}`
        );
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An error occurred while adding the CMS ");
      }
    }
  };



  const deleteCms = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/cms/delete/${id}`,
        {
          headers: {
            Authorization: Authtoken
          }
        }
      );
      if (response.status === 200) {
        toast.success('CMS deleted successfully');
        getCmsList();  // Refresh the banner list after success
      } else {
        toast.error("Failed to delete CMS ");
      }
    } catch (error) {
      console.error("Error deleting CMS:", error);
      toast.error("An error occurred while deleting the CMS ");
    }
  };

  const editcms = async (id, formData) => {
    try {
      const response = await axios.post(
        `${base_url}/cms/update/${id}`,
        formData,
        {
          headers: {
            Authorization: Authtoken,
            'Content-Type': 'application/json'
          },
        }
      );
      const data = response.data;
      if (response.status === 200) {
        toast.success('CMS updated successfully');
        getCmsList();  // Refresh the brand list after success
      } else {
        toast.error('Failed to update the CMS');
      }
    } catch (error) {
      console.error('Error updating CMS:', error);
      toast.error('An error occurred while updating the CMS');
    }
  };
  const [storeSetting, setStoreSetting] = useState({ loading: false, data: {} })

  const getSettingDetails = async (body) => {
    try {
      setStoreSetting({ ...storeSetting, loading: true })
      const { data } = await axios.get(`${base_url}/admin/store/setting/details`,
        { headers: { 'Authorization': Authtoken } })
      if (data.success) {
        setStoreSetting({ loading: false, data: data.data })
      } else {
        setStoreSetting({ ...storeSetting, loading: false })
        console.error(data.message)
      }
    } catch (error) {
      setStoreSetting({ ...storeSetting, loading: false })
    }
  }


  const edit_store_setting = async (body) => {
    try {
      const { data } = await axios.post(`${base_url}/store/setting/update`, body,
        { headers: { 'Authorization': Authtoken } });
      return data
    } catch (error) {
      return error?.response?.data || null
    }
  }
  const addLiveClass = async (formDataToSend) => {
    try {
      const response = await axios.post(
        `${base_url}/admin/live-classes/add`,
        formDataToSend,
        {
          headers: { Authorization: Authtoken }
        }
      );
      if (response.status === 200 && response.data.success) {
        navigate('/batch-list', { state: { courseId: formDataToSend.courseId } })
        toast(response.data.message)
      }


    } catch (error) {
      console.log("Error adding mock test:", error);
      toast.error(error.response?.data?.message || "An error occurred while adding the live class");
      throw error;
    }
  }
  const values = {
    getMenuList, menuList,
    category, getCategoryList, addCategory, editCategory, categoryDelete, toggleCategoryStatus,
    getSubCategoryList, addsubCategory, subcategory,
    addBook, bookList, getBookList,
    teacherList, getTeacherList, addTeacher, approveTeacher, rejectTeacher, getAllTeacher, allTeacher,
    addCourse, getCourseList, courseList,
    addBatch, getBatchList, batchList, assignTeacherToBatch,
    getBannerList, BannerList, addBanner, editBranner, switchBranner, bannerDelete,
    getDashboardCount, dashboardCount,
    examTypeList, getExamTypeList, addExamType,
    questionBankTypeList, getquestionBankTypeList, addquestionBankTypeList,
    questionBankList, getQuestionBanks, addQuestionBank,
    getQuestionsByBank, questions, addMultipuleQuestion, getQuestionsByExamType, questionList,
    getQuestionPaperList, questionPaperList, addQuestionPaper,
    getPaperQuestions, paperQuestionList, addQuestionsToPaper,
    mockTestList, getMockTestList, addMockTest,
    getFaqList, FaqList, addFaq, deleteFaq, editFaq,
    getCmsList, cmsList, addCms, deleteCms, editcms,
    getSettingDetails, storeSetting, edit_store_setting,
    addLiveClass

  }
  return (
    <AppContext.Provider value={values} >
      {children}
    </AppContext.Provider>
  );
};

export const useCommonContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('error');
  }
  return context
};