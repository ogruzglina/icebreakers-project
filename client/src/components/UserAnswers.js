import React from 'react';

function UserAnswers({ uAnswers, errorFound, hasAnswered }) {

    function showAllAnswers() {
        if (errorFound === 200) {
            if (hasAnswered === true) {
                const answers = uAnswers.map( a => 
                    <div key = { a.id }> 
                        <img 
                            src = { a.user.avatar } 
                            alt = "user-avatar" 
                            style = {{ height: "50px", width: "50px", borderRadius: "50px" }}
                        />  
                        <span style = {{ paddingLeft: "20px" }}>
                            <b>{a.user.first_name} {a.user.last_name} </b>
                        </span>
                        - {a.answer} 
                    </div>
                );
                return (<>
                    <h2 className="text-center">All Answers for this Question:</h2>
                        { answers } 
                </>);
            } else {
                return ( <h4 className = "ans-input">You will only see your peers' answers after you submit your own!</h4> );
            }
        } else 
            return null;
    }    
  return ( <div className="center-block text-color" style={{width: "40%"}}> { showAllAnswers() } </div> );
}

export default UserAnswers