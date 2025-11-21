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
      console.log(response, "resu")
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
      console.log(response)
      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const values = {
    getMenuList, menuList,
    category, getCategoryList, addCategory, editCategory, categoryDelete, toggleCategoryStatus,
    getSubCategoryList, addsubCategory, subcategory,
    addBook, bookList, getBookList

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