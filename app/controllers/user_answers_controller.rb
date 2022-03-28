class UserAnswersController < ApplicationController
    def index 
        q_id = Question.question_id(params[:question_date])
        answers = UserAnswer.where(question_id: q_id)
        
        render json: answers
    end

end
