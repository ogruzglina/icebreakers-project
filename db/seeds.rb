# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🌱 Seeding data..."

n_users = 10
domains = ["gmail.com", "hotmail.com", "i.ua", "yahoo.com", "outlook.com"]

n_users.times do
    gender = ['men', 'women'].sample
    name = gender == 'men' ? Faker::Name.male_first_name : Faker::Name.female_first_name
    last_name = Faker::Name.last_name
    username = name.first.downcase + last_name.downcase
    password = Faker::Internet.password(min_length: 6, max_length: 8, mix_case: true, special_characters: true)
    picture = ["https://randomuser.me/api/portraits/thumb/#{ gender }/#{ rand(1..70) }.jpg", nil].sample
    address = "#{Faker::Address.city}, #{Faker::Address.country}"
    bd = Faker::Date.birthday(min_age: 18, max_age: 70)
    email = username + "@" + domains.sample

    User.create(first_name: name, last_name: last_name, username: username, password_digest: password, avatar: picture, hometown: address, birthdate: bd, email: email)
end 

n_questions = 10
i = -5
questions = [
    ["What is your favorite color?", nil],
    ["What is your favorite holiday?", nil],
    ["Which super power do you want?", "Mind Reading|Teleportation|Invisibility|Self-Duplication"],
    ["If you were a potato, how you be cooked?", "Mashed|Baked|Boild|Fried"],
    ["What animal would you be?", "Dog|Cat|Whale|Bird"],
    ["What is your favorite flavors of ice cream?", "Vanilla|Chocolate|Coockie Dough|Matcha"],
    ["Would you let aliens beam you up if they came to Earth?", nil],
    ["What’s your caffeinated beverage of choice?", "Coffee|Cola|Tea|Red Bull"],
    ["What is your favorite month and why?", nil],
    ["What is your hobby?", nil]
]

n_questions.times do
    question = questions.sample
    questions = questions.select {|q| q != question}
    date = Date.today + i
    i += 1

    Question.create(question: question[0], answer_choices: question[1], question_date: date)
end

n_answers = 20
all_answers = [
    [1, "Green"],
    [1, "Black"],
    [1, "Blue"],
    [1, "Yellow"],
    [2, "Thanksgiving"],
    [3, "Teleportation"],
    [3, "Invisibility"],
    [3, "Mind Reading"],
    [3, "Self-Duplication"],
    [4, "Fried"],
    [4, "Mashed"],
    [4, "Baked"],
    [4, "Boiled"],
    [5, "Dog"],
    [5, "Cat"],
    [5, "Bird"],
    [5, "Whale"],
    [6, "Chocolate"],
    [6, "Matcha"],
    [6, "Vanilla"],
    [6, "Coockie Dough"]
]
   
n_answers.times do
    answer = all_answers.sample
    user_id = rand(1..n_users)
    date = Question.find(answer[0]).question_date

    if UserAnswer.count == 0 
        UserAnswer.create(answer: answer[1], user_id: user_id, question_id: answer[0], created_at: date)
    else 
        duplicate = UserAnswer.select {|a| a.user_id = user_id && a.answer == answer[1]}
        duplicate == [] ? UserAnswer.create(answer: answer[1], user_id: user_id, question_id: answer[0], created_at: date) : nil
    end
end

puts "🌱 Done seeding!"