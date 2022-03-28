class UserAnswersController < ApplicationController
    def index 
        q_id = Question.question_id(params[:question_date])
        answers = UserAnswer.where(question_id: q_id)
        
        render json: answers
    end

    def create
        answer = UserAnswer.create!(user_answer_params)
        render json: answer, status: :created
    end

    private
    def user_answer_params
        params.permit(:answer, :user_id, :question_id)
    end
end
