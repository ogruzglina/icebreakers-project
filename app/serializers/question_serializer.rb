class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :question, :answer_choices, :question_date
end
