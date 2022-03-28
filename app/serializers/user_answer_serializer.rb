class UserAnswerSerializer < ActiveModel::Serializer
  attributes :id, :answer, :user_id, :question_id
  
  has_one :user
  has_one :question
end
