import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './App.css';

function App() {
  const [itemName, setItemName] = useState("");
  const [numItem, setNumItem] = useState(0);
  const [newItemCount, setNewItemCount] = useState(0);
  const [newItemType, setNewItemType] = useState("Office Supply");
  const [itemList, setItemList] = useState([]);
  const [itemDesc, setItemDesc] = useState("");
  const [itemType, setItemType] = useState("Office Supply");
  const [typeFilter, setTypeFilter] = useState("All");

  const showInventory = (type, count) => {
    Axios.get(`http://localhost:4000/read/${type}`).then((res) => {
      setItemList(res.data)
    })
  }

  const addToInventory = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:4000/add", {itemName: itemName, numItem: numItem, itemDesc: itemDesc, itemType: itemType});
  };

  const updateItem = (id) => {
    Axios.put("http://localhost:4000/update", {id: id, newItemCount: newItemCount, newItemType: newItemType});
  }

  const deleteItem = (id) => {
    Axios.delete(`http://localhost:4000/delete/${id}`);
  }

  return (
    <div className="App">
      <h1>
        Inventory Tracking Web Application
      </h1>
      <form>
        <label>
          Item Name:
          <input type = "text" onChange = {event => {
            setItemName(event.target.value);
          }}/>
        </label>
        <label>
          Number of Item:
          <input type = "number" onChange = {event => {
            setNumItem(event.target.value);
          }} />
        </label>
        <label>
          Description of Item:
          <input type = "text" onChange = {event => {
            setItemDesc(event.target.value);
          }} />
        </label>
        <label>Item Type:</label>
        <select value={itemType} onChange = {event => {
          setItemType(event.target.value)
        }}>
          <option value="Office Supply">Office Supply</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Other">Other</option>
        </select>
        <button onClick = {addToInventory}>Add Item</button>
      </form>
      <label>Filter by item type:</label>
      <select value={typeFilter} onChange = {event => {
        setTypeFilter(event.target.value)
      }}>
        <option value="All">All</option>
        <option value="Office Supply">Office Supply</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Other">Other</option>
      </select>
      <button onClick = {() => showInventory(typeFilter)}>Show Inventory</button>
      {itemList.map((value, key) => {
        return (
          <div key = {key}>
            <h1>{value.itemName}</h1>
            <h1>{value.itemCount}</h1>
            <h1>Type: {value.itemType}</h1>
            <h1>Description: {value.itemDescription}</h1>
            <input type="number" min = "0" placeholder="New Number of Item" onChange = {event => {
              setNewItemCount(event.target.value);
            }}/>
            <select value={newItemType} onChange = {event => {
              setNewItemType(event.target.value)
            }}>
              <option value="Office Supply">Office Supply</option>
              <option value="Food">Food</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
            <button onClick = {() => updateItem(value._id)}>Update</button>
            <button onClick = {() => deleteItem(value._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
