class User < ApplicationRecord
    has_many :user_answers
    has_many :questions, through: :user_answers
end
