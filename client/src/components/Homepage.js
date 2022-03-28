import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Homepage() {
  const [questionObject, setQuestionObject] = useState({});
  const [questionDate, setQuestionDate] = useState(new Date());

  function answerReponse() {
    const answerChoices = questionObject.answer_choices;
    if (answerChoices !== undefined) {
      if (answerChoices === null) {
        return (
          <form id="answer-response">
            "Response:"
            <input type="text" name="response" />
            <input type="button" onclick="myFunction()" value="Submit Response" />
          </form>
        )
    } else {
      const answerChoicesArray = answerChoices.split("|");

      // const radioButtons = answerChoicesArray.map(answerChoices => {
      //   <input type="radio" name="answer-choice" value={answerChoices} /> 
      // })
      
        return (
          <div>
            <input type="radio" name="answer-choice" value={answerChoicesArray[0]} /> {answerChoicesArray[0]} <br/>
            <input type="radio" name="answer-choice" value={answerChoicesArray[1]} /> {answerChoicesArray[1]} <br/>
            <input type="radio" name="answer-choice" value={answerChoicesArray[2]} /> {answerChoicesArray[2]} <br/>
            <input type="radio" name="answer-choice" value={answerChoicesArray[3]} /> {answerChoicesArray[3]} <br/>
          </div>
        )
      }
    }
  }

  useEffect(() => {
    getData();
  },[questionDate])

  async function getData() {
    const fetchTodaysQuestionURL = "/questions/" + questionDate.toISOString().slice(0, 10);;

    const res = await axios(fetchTodaysQuestionURL);
    
    const todayQuestionObject = await res.data;
    setQuestionObject(todayQuestionObject);

    console.log('hi')
  };

  return (
    <div id="homepage-container">
      
      <div id="question-and-response" className="question-answer-box">
        <div id="question">Question: {questionObject.question}</div>
        
        { answerReponse() }

      </div>
      
      <div id="date-picker">
        Select Question Date:
        <DatePicker selected={questionDate} onChange={(date) => setQuestionDate(date)} maxDate={moment().toDate()} />
      </div>

    </div>
  )
}

export default Homepage