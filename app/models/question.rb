class Question < ApplicationRecord
    has_many :user_answers
    has_many :users, through: :user_answers

    def self.question_id(date)
        question = Question.find_by!(question_date: date)
        question.id
    end

end
