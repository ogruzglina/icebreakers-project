import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Homepage() {
  const [errorFound, setErrorFound] = useState(200);
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
    try {
      const fetchQuestionURL = "/questions/" + questionDate.toISOString().slice(0, 10);
      const res = await axios.get(fetchQuestionURL);
      const todayQuestionObject = await res.data;
      setQuestionObject(todayQuestionObject);
      setErrorFound(200);
    } catch (e) {
      setErrorFound(e.response.status);
    }
  };

  function questionAnswerErrorCheck() {

    if (errorFound === 200) {
      return (
        <>
          <div id="question">Question: {questionObject.question}</div> 
          { answerReponse() }
        </>
      )
    } else {
      return (
        <div id="no-question-found">
          No Question Found. Please Select a New Date!
        </div>
      )
    }
  }

  return (
    <div id="homepage-container">
      
      <div id="question-and-response" className="question-answer-box">
        { questionAnswerErrorCheck() }
      </div>
      
      <div id="date-picker">
        Select Question Date:
        <DatePicker selected={questionDate} onChange={(date) => setQuestionDate(date)} maxDate={moment().toDate()} />
      </div>

    </div>
  )
}

export default Homepage