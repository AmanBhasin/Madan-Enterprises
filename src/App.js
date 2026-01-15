import React, {useState,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import MainSection from './components/MainSection'; 
import Orders from './components/Orders'; // Add your pages here
import Contractors from './components/Contractors';
import Suppliers from './components/Suppliers';
import Employees from './components/Employees';
import Analytics from './components/Analytics';
import RightSideOrders from "./components/RightSideOrders";
import axios from "axios";
import { use } from "react";
// import React, {useState, useEffect} from "react";

function App() {

  const [Table, setTable] = useState([]);
  const handleFormSubmit = (formData) => {
    // setTable([...Table, formData]);
    // save formdata to backend
    saveKalamData(formData);  
    fetchTodayData();
    
  }

  

  const saveKalamData = async (formData) => {
    try{
      const res = await axios.post("http://localhost:5000/api/kalam/", formData);
      console.log("✅ User created:", res.data);
    }
    catch (error) {
      console.error("❌ Error creating user:", error);
      // alert("Error creating user");
    }
  }


    useEffect(() => {
      fetchTodayData();
    }, []); 

    const fetchTodayData = async () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      axios.get(`http://localhost:5000/api/kalam/${day}/${month}`).then((res) => {
        setTable(res.data);
      }
      ).catch((err) => {
        console.error("Error fetching data:", err);
      });
    };

  return (
    <Router>
    <div className="app-container">

      <Header />
      <div className="content-container">
        <LeftSide />
       {/* Main Content will change based on the route */}
       <Routes>
            <Route path="/" element={<><MainSection Table={Table} setTable={setTable}  /> <RightSide onFormSubmit={handleFormSubmit}/> </>} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/contractors" element={<Contractors />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/analytics" element={<Analytics />} />
        </Routes>
        

      </div>
      <Footer />
    </div>
    </Router>
  );
} 
export default App;