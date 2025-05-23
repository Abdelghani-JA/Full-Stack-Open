import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: {
      authorization: token
    }
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (updatedBlog, blogId) => {
  const config = {
    headers: {
      authorization: token
    }
  };
  const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog, config);
  return response.data;
};

const remove = async (blogId) => {
  const config = {
    headers: {
      authorization: token
    }
  };
  const response = await axios.delete(`${baseUrl}/${blogId}`, config);
  return response.data;
};

const createComment = async (newComment, blogId) => {
  const config = {
    headers: {
      authorization: token
    }
  };
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    newComment,
    config
  );
  return response.data;
};

export default { getAll, create, update, remove, setToken, createComment };
