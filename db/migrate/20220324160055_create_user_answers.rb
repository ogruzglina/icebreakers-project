class CreateUserAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :user_answers do |t|
      t.text :answer
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :question, null: false, foreign_key: true

      t.timestamps
    end
  end
end
