class User < ApplicationRecord
    has_many :user_answers
    has_many :questions, through: :user_answers

    has_secure_password

    validates :username, presence: true, uniqueness: true
    # validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP } 
    validates :first_name, presence: true
    validates :last_name, presence: true

end
