class QuestionsController < ApplicationController
    def minDate
        minDate = Question.minimum(:question_date)
        render json: minDate
    end
end
