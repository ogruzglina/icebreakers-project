class QuestionsController < ApplicationController
    def show
        question = Question.find_by!(question_date: params[:question_date])
        render json: question
    end
end
