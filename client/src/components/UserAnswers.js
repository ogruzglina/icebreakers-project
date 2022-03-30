import React from 'react';

function UserAnswers({ uAnswers, errorFound }) {

    function showAllAnswers() {
        if (errorFound === 200) {
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
            if (answers.length === 0) {
                return (<>
                    <h2>All answers for this question:</h2>
                    <p>No Answers Yet... </p>
                </>);
            } else {
                return (<>
                    <h2>All answers for this question:</h2>
                    { answers } 
                </>);
            } 
        } else 
            return null;
    }    
    return ( <div> { showAllAnswers() } </div> );
}

export default UserAnswers