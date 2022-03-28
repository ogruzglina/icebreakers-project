import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Homepage() {
  const [questionObject, setQuestionObject] = useState({});
  
  useEffect(() => {
    getData();
  },[])

  async function getData() {
    const todayDate = new Date().toISOString().slice(0, 10);
    const fetchTodaysQuestionURL = "/questions/" + todayDate;

    const res = await axios(fetchTodaysQuestionURL);
    
    const todayQuestionObject = await res.data;
    setQuestionObject(todayQuestionObject);
  };

  // function isMultipleChoice() {
  //   if (questionObject.answerChoices == nil) {
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }

  return (
    <div className="homepage-container">
      <div id="question-and-response" className="question-answer-box">
        <div id="question">Question: {questionObject.question}</div>
        
        <form id="answer-response">
          Response: <input type="text" name="response" />
          <input type="button" onclick="myFunction()" value="Submit Response" />
        </form>

      </div>
      <div className="date-picker">
        
      </div>
    </div>
  )
}

export default Homepage