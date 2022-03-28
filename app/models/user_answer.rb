class UserAnswer < ApplicationRecord
  belongs_to :user
  belongs_to :question

  validates :answer, presence: true
  validates :user_id, presence: true, uniqueness: { scope: :question_id, message: "should have one answer per question" }
  validates :question_id, presence: true
end
