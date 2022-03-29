import React, { useEffect, useState } from 'react';
import UserAnswers from './UserAnswers';
import QuestionAndResponse from './QuestionAndResponse';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Homepage() {
  const [ errorFound, setErrorFound ] = useState(200);
  const [ questionObject, setQuestionObject ] = useState({});
  const [ questionDate, setQuestionDate ] = useState(new Date());
  const [ userAnswers, setUserAnswers ] = useState([]);

  useEffect(async () => {
    try {
      const date = moment(questionDate).format("YYYY-MM-DD");
      const fetchQuestionURL = "/user_answers/" + date;
      const res = await axios.get(fetchQuestionURL);
      const answers = await res.data;
      if (answers[0] == undefined) {
        setQuestionObject(answers);
        setUserAnswers([]);
      } else {
        setUserAnswers(answers);
        setQuestionObject(answers[0].question);
        setErrorFound(200);
      }
    } catch (e) {
      setErrorFound(e.response);
    }
  }, [questionDate]);

  function questionAnswerErrorCheck() {
    if (errorFound === 200) {
      return ( <QuestionAndResponse questionObject = { questionObject } /> );
    } else {
      return (
        <div id="no-question-found">
          No Question Found. Please Select a New Date!
        </div>
      )
    }
  }

  return (
    <div>
      <div id="homepage-container">
        <div id="question-and-response" className="question-answer-box">
          { questionAnswerErrorCheck() }
        </div>
        
        <div id="date-picker">
          Select Question Date:
          <DatePicker 
            selected={ questionDate } 
            onChange={ e => setQuestionDate(e) } 
            maxDate={ moment().toDate() } 
          /> 
        </div>
      </div>

      <UserAnswers uAnswers = { userAnswers } errorFound = { errorFound }/>
    </div>
  );
}

export default Homepage