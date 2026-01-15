import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


function MainSection({ Table, setTable }) {
  const now = new Date();
  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();
  const [searchDate, setSearchDate] = useState({ day: '', month: '' });
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleDoubleClick = (index) => {
    setEditIndex(index);
    setInputValue("");
  };

  const handleInputKeyDown = (e, index) => {
    if (e.key === "Enter") {
      const updatedTable = [...Table];
      const newValue = parseFloat(inputValue);
      if (!isNaN(newValue)) {
        updatedTable[index].Paid = updatedTable[index].Paid +  newValue;
        setTable(updatedTable);
        setEditIndex(null);
      }
    }
    else if (e.key === "Escape") {
      setEditIndex(null);
    }
  };



  const handleSearch = async () => {
  try {
    const { day, month } = searchDate;
    const res = await axios.get(`http://localhost:5000/api/kalam/${day}/${month}`);
    setTable(res.data);
  } catch (err) {
    console.error("Search failed:", err);
  }
};

  return (
    <div className='main-section'>
      <main>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2>{day}/{month}/{year}</h2>
            <h3>Table of Submitted Data</h3>
          </div>

          <div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <h3 style={{marginRight: "5px"}}>Total Cash Flow In:    </h3>
              <h3 style={{ color: "green" }}>
              {Table.reduce((acc, row) => acc + (row.Paid), 0)}</h3>
              
              <h3 style={{marginRight: "5px", marginLeft: "25px"}}>Total Cash Dues:    </h3>
              <h3 style={{ color: "red" }}>
              {Table.reduce((acc, row) => acc + (row.Bill - row.Paid), 0)}</h3>
            </div>

            {/* <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "0px" }}>
             
            </div> */}


            <input
              placeholder="DD"
              maxLength={2}
              value={searchDate.day}
              onChange={(e) => setSearchDate({ ...searchDate, day: e.target.value })}
            />
            <input
              placeholder="MM"
              maxLength={2}
              value={searchDate.month}
              onChange={(e) => setSearchDate({ ...searchDate, month: e.target.value })}
            />
            <button onClick={handleSearch}>Search by Date</button>

          </div>
        </div>
        <table border="1">
          <thead>
            <tr>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Product</th>
              <th>Bill</th>
              <th>Amount Due</th>
              <th>Buyer's Name</th>
            </tr>
          </thead>
          <tbody>
            {Table.length > 0 ? (
              Table.map((row, index) => (
                <tr key={index}>
                  <td>{row.Quantity}</td>
                  <td>{row.Rate}</td>
                  <td>{row.Product}</td>
                  <td>{row.Bill}</td>
                  <td onDoubleClick={() => handleDoubleClick(index)}>
                    {editIndex === index ? (
                      <input
                      type = "number"
                      value = {inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => handleInputKeyDown(e, index)}
                      autoFocus
                      style={{ width: "60px" }}
                      />
                    )
                   : (row.Bill - row.Paid)}</td>
                  <td>{row.Name}</td>
                  <td>{row.Bill === row.Paid ? "✅": "" }</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data submitted yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>

  );
}

export default MainSection;
