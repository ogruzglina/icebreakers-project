import React, { useState } from 'react';
import axios from 'axios';

function QuestionAndResponse({ questionObject, onAddAnswer, hasAnswered, setHasAnswered, userId }) {
    const defaultFormData = {
        answer: "",
        user_id: userId,
        question_id: ""
    };
    const [formData, setFormData] = useState(defaultFormData);

    function answerReponse() {
        const answerChoices = questionObject.answer_choices;

        if (answerChoices !== undefined) {
            if (answerChoices === null) {
                return (<>
                    <textarea class="form-control text-area" placeholder="Please, write your answer here" onChange = { handleChange } required></textarea>
                </>);
            } else {
                const answerChoicesArray = answerChoices.split("|");
                const radioButtons = answerChoicesArray.map( answerChoice =>
                    <div key = { answerChoice } className = "form-check ans-input " >                     
                        <input  
                            id="flexRadioDisabled"
                            className = "form-check-input"
                            type = "radio" 
                            name = "answer-choice" 
                            value = { answerChoice } 
                            disabled={ hasAnswered }
                        /> { answerChoice } 
                    </div>
                );
                return <div onChange = { handleChange } className="text" style = {{margin: "10px 0 20px 0"}}> { radioButtons } </div>;
            }
        }
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            answer: e.target.value,
            question_id: questionObject.id
        });
    }
    
    function handleSubmit(e) {
        e.preventDefault();

        axios.post('/user_answers', formData)
            .then(res => { onAddAnswer(res.data) })
            .catch(function(error){
                if(error.response) {
                    console.log(error.response.data.errors);
                }
            });

        setHasAnswered(true);
        e.target.reset();
        setFormData(defaultFormData)
    }

    return (<>
        <div id="question" className="text">QUESTION: { questionObject.question }</div> 
        <form onSubmit = { handleSubmit } id = "answer-response">
            { answerReponse() }
            <button type="submit" className="btn" disabled = { hasAnswered }> Submit Your Answer </button>
        </form>
    </>);
}

export default QuestionAndResponse