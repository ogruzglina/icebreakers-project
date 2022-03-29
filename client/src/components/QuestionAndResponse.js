import React from 'react';

function QuestionAndResponse({ questionObject }) {
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
                const radioButtons = answerChoicesArray.map( answerChoice =>
                    <div key = { answerChoice }> 
                        <input  
                            type="radio" 
                            name="answer-choice" 
                            value={ answerChoice } 
                        /> { answerChoice } 
                    </div>
                );
                return <div> { radioButtons } </div> ;
            }
        }
    }

    return (<>
        <div id="question">Question: { questionObject.question }</div> 
        { answerReponse() }
    </>);
}

export default QuestionAndResponse