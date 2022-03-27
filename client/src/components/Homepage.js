import React from 'react'

function Homepage() {
  return (
    <div className="homepage-container">
      <div id="question-and-response" className="question-answer-box">
        <div id="question">Question: If you were a potato, how would you be cooked?</div>
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