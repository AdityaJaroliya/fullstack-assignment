import logo from'./logo.png';
import './app.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios'



function App() {

  const[card, setCard]=useState([]);
  const[query, setQuery]=useState("");

  const handleChenge=(e)=>{
    setQuery(e.target.value);
  }

  const handleClick = async (e) => {
const qyery=e.target.value;

    try {
      const response = await axios.get(`http://localhost:8000/card?q=${query}`);
      setSearchResults(response.data);  // Assuming response.data is an array of results
      
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately
    }
  };

    useEffect(()=>
      {
        axios.get('http://localhost:8000/cards').
        then((res)=>{
          console.log(res.data);
          setCard(res.data);

        })

        .catch((err)=>{
          console.log(err)
        })
      },[])
 

  return (
    <>
      <div className="container">
        <div className='nevbar-container'>
        <div className="navbar"> 
          <div className="left">
            <img src={logo} />
            <span>Abstract</span>
            <hr/>
            <span>Help Center</span>
          </div>

          <div className="right">
            <button>Submit a Request</button>
          </div>
          </div>
        </div>
        <div className="search">
          <h1> How can we help ?
          </h1>
          <div className="input-container">
      <input type="text" placeholder=" Search" value={query} onChange={handleChenge}  />
      <FontAwesomeIcon icon={faArrowRight}  className="input-icon" />
    </div>

          </div>
          {card.length>0 &&(

          <div className="result">
          {card.map((result)=>(
            <div className="cards" key={result.id}>
              <div className="title">
                <h3>{result.title}</h3>
              </div>
              <div className="desc">
                <p>{result.description}</p>
              </div>

            </div>
          ))}

          </div>
          )}
          <div className="footer">
            <div className="info">
              <div><h3>Abstract
               
              </h3>
              <span>Branches</span>

              </div>
              <div><h3>Resourse</h3>
              <span>Blog</span>
              <span>Help Center</span>
              <span>Release Notes</span>
              <span>Status</span>
              </div>
        
              <div><h3>Community</h3>
              <span>About us</span>
              <span>Career</span>
              <span>Legal</span>


</div>
<div><h3>Company</h3>

</div>
            </div>
            <div className="copyright">
             
              <div className='logo'> 
                <img src={logo} alt="" />

                <span>&copy; Copyright 2022 <br /> Abstract Studio Design.Inc <br /> All rights resaved</span><br />

              </div>

             
             

          
              
              
            
            </div>
          </div>
      </div>
    </>
  )
}

export default App
