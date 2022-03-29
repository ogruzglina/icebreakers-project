class Question < ApplicationRecord
    has_many :user_answers
    has_many :users, through: :user_answers
end
