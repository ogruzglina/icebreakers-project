import React, { useEffect, useState } from 'react';
import UserAnswers from './UserAnswers';
import QuestionAndResponse from './QuestionAndResponse';
import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Homepage({ currentUser }) {
  const [ errorFound, setErrorFound ] = useState(200);
  const [ questionObject, setQuestionObject ] = useState({});
  const [ questionDate, setQuestionDate ] = useState(new Date());
  const [ userAnswers, setUserAnswers ] = useState([]);
  const [ hasAnswered, setHasAnswered ] = useState(false);
  const [ minDate, setMinDate ] = useState(new Date());
  const [ disablePrev, setDisablePrev ] = useState(false);
  const [ disableNext, setDisableNext ] = useState(true);

  const maxDateDay = moment().toDate().setHours(0, 0, 0, 0);

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
        userIds.includes(currentUser.id) ? setHasAnswered(true) : setHasAnswered(false); 
        
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

      const minQuestionDateDay = moment(minQuestionDate).toDate().setHours(0, 0, 0, 0);
      setMinDate(minQuestionDateDay);
      if (questionDate.setHours(0, 0, 0, 0) === minQuestionDateDay) setDisablePrev(true);
      if (questionDate.setHours(0, 0, 0, 0) === maxDateDay) setDisableNext(true);

    } catch (e) {
      console.log(e.response)
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
          userId = { currentUser.id } 
        /> );
    } else {
      return (
        <div id="no-question-found" className = "ans-input">
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

  function handlePrevNextClick(e) {
    const button = e.target.value;
    const dateOffset = 24*60*60*1000;
    
    const prevDate = new Date(questionDate.getTime()-(dateOffset));
    const prevDateDay = prevDate.setHours(0, 0, 0, 0);

    const nextDate = new Date(questionDate.getTime()+(dateOffset));
    const nextDateDay = nextDate.setHours(0, 0, 0, 0);

    if ((prevDateDay > minDate && prevDateDay <= maxDateDay) || (nextDateDay > minDate && nextDateDay <= maxDateDay)) {
      setDisablePrev(false);
      setDisableNext(false);
    }

    if(button === "Prev") {
      setQuestionDate(prevDate);
      if(prevDateDay === minDate) {
        setDisablePrev(true);
      }
    }

    if(button === "Next") {
      setQuestionDate(nextDate);
      if(nextDateDay === maxDateDay) {
        setDisableNext(true);
      }
    }
  }

  return (
    <div>
      <div id="homepage-container">
        <div id="question-and-response" className="question-answer-box" style = {{backgroundColor: "#262312"}}>
          { questionAnswerErrorCheck() }
        </div>
        <div id="date-container">
          <div id="date-picker">
            <div style = {{fontSize: "16px", color: "#fff"}}>Select Question Date:</div>
            <DatePicker 
              className="form-control"
              style = {{textAlign: "center" }}
              selected={ questionDate } 
              onChange={ e => setQuestionDate(e) } 
              minDate = { minDate }
              maxDate={ moment().toDate() } 
            /> 
          </div>
          <div className="date-button-container">
            <button className="btn btn-grow" value="Prev" onClick={handlePrevNextClick} disabled={disablePrev}>Prev</button>
            <button className="btn btn-grow" value="Next" onClick={handlePrevNextClick} disabled={disableNext}>Next</button>
          </div>
        </div>
      </div>

      <UserAnswers uAnswers = { userAnswers } errorFound = { errorFound } hasAnswered = { hasAnswered }/>
    </div>
  );
}

export default Homepage