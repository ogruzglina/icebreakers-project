class UserAnswerSerializer < ActiveModel::Serializer
  attributes :id, :answer
  
  has_one :user
  has_one :question
end
