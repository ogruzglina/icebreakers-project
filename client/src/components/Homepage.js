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
  const [ hasAnswered, setHasAnswered ] = useState(false);
  const [ minDate, setMinDate ] = useState(new Date())
  const userId = 5;

  useEffect(async () => {
    try {
      const date = moment(questionDate).format("YYYY-MM-DD");
      const fetchQuestionURL = "/user_answers/" + date;
      const res = await axios.get(fetchQuestionURL);
      const answers = await res.data;

      if (answers[0] === undefined) {
        setQuestionObject(answers);
        setUserAnswers([]);
        setHasAnswered(false);
      } else {
        let userIds = answers.map( answer => answer.user.id);
        userIds.includes(userId) ? setHasAnswered(true) : setHasAnswered(false); 

        setUserAnswers(answers);
        setQuestionObject(answers[0].question);
        setErrorFound(200);
      }
    } catch (e) {
      setErrorFound(e.response);
      console.log(e.response.data.errors)
    }
  }, [questionDate]);

  useEffect(async () => {
    try {
      const res = await axios.get("/questions/");
      const minQuestionDate = await res.data;

      setMinDate(moment(minQuestionDate).toDate());
    } catch (e) {
      console.log(e.response.data.errors)
    }
  }, []);

  function questionAnswerErrorCheck() {
    if (errorFound === 200) {
      return ( 
        <QuestionAndResponse 
          questionObject = { questionObject } 
          onAddAnswer = { handleAddAnswer } 
          hasAnswered = { hasAnswered }
          setHasAnswered = { setHasAnswered } 
          userId = { userId } 
        /> );
    } else {
      return (
        <div id="no-question-found">
          No Question Found. Please Select a New Date!
        </div>
      )
    }
  }

  function handleAddAnswer(newAnswer) {
    setUserAnswers(prevAnswers => {
      return ([...prevAnswers, newAnswer])
    });
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
            minDate = { minDate }
            maxDate={ moment().toDate() } 
          /> 
        </div>
      </div>

      <UserAnswers uAnswers = { userAnswers } errorFound = { errorFound }/>
    </div>
  );
}

export default Homepage