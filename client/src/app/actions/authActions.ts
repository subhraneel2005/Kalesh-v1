"use server"

import { CHECK_CERDENTIALS_URL, FORGET_PASSWORD_URL, LOGIN_URL, REGISTER_URL, RESET_PASSWORD_URL } from "@/lib/apiEndPoints"
import axios, { AxiosError } from "axios"
;

export async function registerAction(prevState:any, formData:FormData){
  console.log("The form data is", formData);

  try {
   const {data} = await axios.post(REGISTER_URL, {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    conform_password: formData.get('conform_password')
   })
    return{
      status: 200,
      message:data?.message ??  "Registration successful. Please check your email.",
      errors: {}
    }
  } catch (error) {

    if(error instanceof AxiosError){
      if(error.response?.status === 422){
        return{
          status: 422,
          message: error.response?.data?.message,
          errors:error.response?.data?.errors,
        }
      }
    }
    return{
      status: 500,
      message: "Server error",
      errors:{}
    };
  }
  
}

export async function loginAction(prevState:any, formData:FormData){

  try {
   const {data} = await axios.post(CHECK_CERDENTIALS_URL, {
    email: formData.get('email'),
    password: formData.get('password'),
   })
    return{
      status: 200,
      message:data?.message ??  "Login successful. Lets Kaleshh ",
      errors: {},
      data:{
        email: formData.get('email'),
        password: formData.get('password'),
      }
    }
  } catch (error) {

    if(error instanceof AxiosError){
      if(error.response?.status === 422){
        return{
          status: 422,
          message: error.response?.data?.message,
          errors:error.response?.data?.errors,
          data:{}
        }
      }
    }
    return{
      status: 500,
      message: "Server error",
      errors:{},
      data:{}
    };
  }
  
}

export async function forgetPasswordAction(prevState:any, formData:FormData){

  try {
   const {data} = await axios.post(FORGET_PASSWORD_URL, {
    email: formData.get('email'),
   })
    return{
      status: 200,
      message:data?.message ??  "We have emailed you the password reset link. Please check ",
      errors: {},
    }
  } catch (error) {

    if(error instanceof AxiosError){
      if(error.response?.status === 422){
        return{
          status: 422,
          message: error.response?.data?.message,
          errors:error.response?.data?.errors,
        }
      }
    }
    return{
      status: 500,
      message: "Server error",
      errors:{},
      data:{}
    };
  }
  
}

export async function resetPasswordAction(prevState:any, formData:FormData){
  console.log("The form data is", formData);

  try {
   const {data} = await axios.post(RESET_PASSWORD_URL, {
    email: formData.get('email'),
    password: formData.get('password'),
    conform_password: formData.get('conform_password'),
    token : formData.get('token'),
   })
    return{
      status: 200,
      message:data?.message ??  "Password reset successfully. Please Login bro!",
      errors: {}
    }
  } catch (error) {

    if(error instanceof AxiosError){
      if(error.response?.status === 422){
        return{
          status: 422,
          message: error.response?.data?.message,
          errors:error.response?.data?.errors,
        }
      }
    }
    return{
      status: 500,
      message: "Server error",
      errors:{}
    };
  }
  
}