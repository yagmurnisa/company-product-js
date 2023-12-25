import axios from './axios';
import setAuthToken from './setAuthToken';

export const login = async (data) => {
  try {
    const res = await axios.post(`/user/login`, data);
    console.log(res.data);
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      return ("success");
    }
  } catch (err) {
    console.log(err.message);
    if(err.response?.status==400){
      return({error: err.response.data.msg});
    }
    return({error: "An error occured"});
  }
};

export const register = async (data) => {
    try {
      const res = await axios.post(`/user/register`, data);
      console.log(res.data);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setAuthToken(res.data.token);
        return ("success");
      }
      
    } catch (err) {
      console.log(err);
      if(err.response?.status==400){
        return({error: err.response.data.msg});
      }
      return({error: "An error occured"});
    }
};

export const getCompanies = async (data) => {
  try {
    const res = await axios.get(`/company`);
    return(res.data);
  } catch (err) {
    console.log(err);
    return({error:"An error occured"});
  }
};

export const getLastCompanies = async (data) => {
  try {
    const res = await axios.get(`/company/last`);
    return(res.data);
  } catch (err) {
    console.log(err);
    return({error:"An error occured"});
  }
};

export const addCompanyService = async (data) => {
  console.log(data);
  try {
    const res = await axios.post(`/company/add`, data);
    return(res.data);
  } catch (err) {
    console.log(err);
    if(err.response?.status==400){
      return({error: err.response.data.msg});
    }
    return({error: "An error occured"});
  }
};

export const deleteCompanyService = async (id) => {
  console.log(id);
  try {
    await axios.delete(`/company/${id}`);
    console.log("deleted");
    return id;
  }
  catch(err) {
    console.log(err.message);
    if(err.response?.status==400){
      return({error: err.response.data.msg});
    }
    return({error: "An error occured"});
  }
};

export const editCompanyService = async (data) => {
  const id= data._id;
  console.log(data);
  try {
    const res = await axios.post(`/company/edit/${id}`, data);
    return(res.data);
  }
  catch(err){
    console.log(err);
    if(err.response?.status==400){
      return({error: err.response.data.msg});
    }
    return({error: "An error occured"});
  }
};

export const getProducts = async (data) => {
  try {
    const res = await axios.get(`/product`);
    return(res.data);
  } catch (err) {
    return({error:"An error occured"});
   
  }
};

export const addProductService = async (data) => {
  console.log(data);
  try {
    const res = await axios.post(`/product/add`, data);
    return(res.data);
  } catch (err) {
    console.log(err.message);
    if(err.response?.status==400){
      return({error: err.response.data.msg});
    }
    return({error: "An error occured"});
  }
};

export const deleteProductService = async (id) => {
  console.log(id);
  try {
    const res = await axios.delete(`/product/${id}`);
    console.log("deleted");
    return id;
  }
  catch(err) {
    console.log(err.message);
    if(err.response?.status==400){
      return({error: err.response.data.msg});
    }
    return({error: "An error occured"});
  }
};

export const editProductService = async (data) => {
  const id= data._id;
  console.log(data);
  try {
    const res = await axios.post(`/product/edit/${id}`, data);
    return(res.data);
  }
  catch(err){
    console.log(err.message);
    if(err.response?.status==400){
      return({error: err.response.data.msg});
    }
    return({error: "An error occured"});
  }
};
