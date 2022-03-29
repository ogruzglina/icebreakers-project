class UserAnswersController < ApplicationController
    def index 
        question = Question.find_by!(question_date: params[:question_date])
        answers = UserAnswer.where(question_id: question.id)
        if answers == []
            render json: question
        else
            render json: answers
        end
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
