import Footer from "components/footer/FooterAuthDefault";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import bmti from "./images/2.jpg";
import logo from "./images/loginpage.png";
import axios from "axios";
import ApiCall from "../../../config/index";

export default function Auth() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({ login: '', password: '' });

  // Handle changes in the form inputs
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  // Handle form submission
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear(); // Clear local storage before logging in

    try {
      // Post login data to the API
      const response = await axios.post('https://student.bmti.uz/rest/v1/auth/login', {
        login: studentData.login,
        password: studentData.password,
      });
      // Extract the token from the response
      const token = response?.data?.data?.token;
      if (token) {
        console.log(token)
        await localStorage.setItem('authToken', token);
        await sendData(token);
        navigate("/student");
      } else {
        console.error('Token not found in response data');
      }
    } catch (error) {
      // Improved error handling
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received from the server:', error.request);
      } else {
        console.error('Error in request setup:', error.message);
      }
    }
  };

  const sendData = async (token) => {
    try {
      console.log(token)
      const dataStudent = await ApiCall('/api/v1/student/account/'+token, "GET");
    } catch (error) {
      console.error('Error fetching student data or posting to server:', error);
    }
  };

  return (
      <div className="min-h-screen bg-white selection:bg-primary/10 selection:text-primary dark:bg-gray-900">
        <section className="pt-4 mt-0 sm:pt-8 md:pt-10 lg:pt-6">
          <div className="mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0">
            <div>
              <div
                  aria-hidden="true"
                  className="absolute inset-0 top-40 grid grid-cols-2 -space-x-52 opacity-50 dark:opacity-30"
              >
                <div className="h-60 bg-gradient-to-br from-primary to-purple-400 blur-[106px] dark:from-blue-700"></div>
                <div className="h-40 bg-gradient-to-r from-cyan-600 to-sky-500 blur-[106px] dark:to-indigo-600"></div>
              </div>
              <div className="items-center gap-12 lg:flex justify-center">
                <div className="md:mx-auto mt-0 lg:ml-0 lg:w-1/2">
                  <img
                      className="mt-2 md:mx-auto lg:mt-0 lg:ml-0 lg:w-full"
                      src={logo}
                      alt="tailus stats and login components"
                      width="1865"
                      height="1750"
                  />
                </div>
                <div className="relative lg:w-1/2 rounded-3xl border border-gray-100 bg-white p-4 shadow-2xl shadow-gray-600/10 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
                  <div className="flex m-auto text-center">
                    <img className="mt-4 w-44" src={bmti} alt="tailus stats and login components" />
                  </div>
                  <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">Tizimga kirish.</h2>
                  <form onSubmit={handleStudentSubmit} className="p-4 pt-0">
                    <div>
                      <div className="p-2 pt-2">
                        <p className="text-sm">
                          Buxoro muhandislik texnologiya insitituti HEMIS Student axborot tizimidagi login parolini kiriting
                        </p>
                      </div>
                      <label htmlFor="login" className="mb-2 block text-gray-600 dark:text-gray-300">
                        Talaba ID <span className="text-xl text-red-500 dark:text-red-400">*</span>
                      </label>
                      <input
                          type="text"
                          name="login"
                          id="login"
                          autoComplete="name"
                          value={studentData.login}
                          onChange={handleStudentChange}
                          className="peer block w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700"
                      />
                      <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block"></span>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="password" className="mb-2 block text-gray-600 dark:text-gray-300">
                        Parol <span className="text-xl text-red-500 dark:text-red-400">*</span>
                      </label>
                      <input
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="tel"
                          value={studentData.password}
                          onChange={handleStudentChange}
                          className="peer block w-full rounded-lg border border-gray-200 bg-transparent px-4 py-2 text-gray-600 transition-shadow duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 dark:border-gray-700"
                      />
                      <span className="mt-1 hidden text-sm text-red-500 peer-invalid:block"></span>
                    </div>

                    <button
                        type="submit"
                        className="relative mt-6 flex h-12 w-full items-center justify-center px-6 bg-blue-800 rounded-3xl hover:bg-black text-white text-xl font-semibold"
                    >
                      Kirish
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
  );
}
