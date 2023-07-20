// import logo from './logo.svg';
import './App.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { View } from './components/View';

// get data from local storage
const getdatafromLS = () => {
  const data = localStorage.getItem('dets');
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const App = () => {
  // main array of objects
  const [dets, setDets] = useState(getdatafromLS());
  const [Name, setName] = useState('');
  const [Id, setId] = useState('');
  const [College, setCollege] = useState('');
  const [Branch,setBranch]=useState('');

  const handledetails = (e) => {
    e.preventDefault();
    // creating object
    let Det = { Name, Id, College,Branch };
    setDets([...dets, Det]);
    setName('');
    setId('');
    setCollege('');
    setBranch('');
  };

  // saving data to local storage
  useEffect(() => {
    localStorage.setItem('dets', JSON.stringify(dets));
  }, []); 
  // Added an empty dependency array to run the effect only once

  const deleteDets = (Id) => {
    const filteredDets = dets.filter((element, index) => {
      return element.Id !== Id;
    });
    setDets(filteredDets);
  };

  return (
    <div className="wrapper">
      <h1>STUDENT REGISTRATION FORM</h1>
      <p>Enter your details to register</p>
      <div className="main">
        <div className="Entry-form">
          <form autoComplete="off" className="form-group" onSubmit={handledetails}>
            <div className='Entry-heading'>
                <b>Register here</b>
            </div>
            <br></br>
            <label><b>Name :</b> </label>
            <input type="text" className="form-control" required onChange={(e) => setName(e.target.value)} value={Name} /><br />
            <label><b>Id :</b></label>
            <input type="text" className="form-control" required onChange={(e) => setId(e.target.value)} value={Id} /><br />
            <label><b>College : </b></label>
            <input type="text" className="form-control" required onChange={(e) => setCollege(e.target.value)} value={College} /><br></br>
            <label><b>Branch : </b></label><br></br>
            <input type="text" className='form-control' required onChange={(e)=>setBranch(e.target.value)} value={Branch}></input>
            <button type="submit" className="btn btn-success btn-md"> Add</button>
          </form>
        </div>
        <div className="view-form">
          {dets.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Id</th>
                      <th>College</th>
                      <th>Branch</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <View dets={dets} deleteDets={deleteDets} />
                  </tbody>
                </table>
              </div>
              <button className="btn btn-danger btn-md" onClick={() => setDets([])}>Remove all</button>
            </>
          )}
          {dets.length < 1 && <div><b>No one added yet</b></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
