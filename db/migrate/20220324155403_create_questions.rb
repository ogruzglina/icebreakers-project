class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :question
      t.string :answer_choices
      t.string :question_date

      t.timestamps
    end
  end
end
