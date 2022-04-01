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
    picture = ["https://randomuser.me/api/portraits/thumb/#{ gender }/#{ rand(1..70) }.jpg", "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0="].sample
    address = "#{Faker::Address.city}, #{Faker::Address.country}"
    bd = Faker::Date.birthday(min_age: 18, max_age: 70)
    email = username + "@" + domains.sample

    User.create(first_name: name, last_name: last_name, username: username, password_digest: password, avatar: picture, hometown: address, birthdate: bd, email: email)
end 

n_questions = 11
i = -8
questions = [
    ["What is your favorite color and why?", nil],
    ["What is your favorite holiday and why?", nil],
    ["Which of the following superpowers would you prefer to have?", "Mind Reading|Teleportation|Invisibility|Self-Replication"],
    ["If you were a potato, how you be cooked?", "Mashed|Baked|Boiled|Fried"],
    ["Would you let aliens beam you up if they came to Earth?", nil],
    ["If you were one of these animals, which would you be?", "Dog|Cat|Whale|Bird"],
    ["Which of the following flavors of ice cream do you prefer?", "Vanilla|Chocolate|Strawberry|None of the above"],
    ["What is your favorite hobby and why?", nil],
    ["What is your favorite season?", "Winter|Spring|Summer|Fall"],
    ["What is your favorite month and why?", nil],
    ["What’s your caffeinated beverage of choice?", "Coffee|Cola|Tea|Red Bull"],
]

n_questions.times do
    question = questions[0]
    questions = questions.drop(1)
    date = Date.today + i
    i += 1

    Question.create(question: question[0], answer_choices: question[1], question_date: date)
end

n_answers = 20
all_answers = [
    [1, "Green"],
    [2, "Thanksgiving"],
    [2, "Christmas Eve"],
    [2, "Halloween"],
    [2, "Easter"],
    [2, "July 4th"],
    [2, "New Year"],
    [2, "Valentine's Day"],
    [3, "Teleportation"],
    [3, "Invisibility"],
    [3, "Mind Reading"],
    [3, "Self-Duplication"],
    [4, "Fried"],
    [4, "Mashed"],
    [4, "Baked"],
    [4, "Boiled"],
    [6, "Dog"],
    [6, "Cat"],
    [6, "Bird"],
    [6, "Whale"],
    [7, "Chocolate"],
    [7, "Strawberry"],
    [7, "Vanilla"],
    [7, "Chocolate"],
    [9, "Fall"],
    [9, "Spring"],
    [9, "Summer"],
    [9, "Fall"],
    [9, "Summer"]
]
   
n_answers.times do
    answer = all_answers.sample
    user_id = rand(1..n_users)
    date = Question.find(answer[0]).question_date

    if UserAnswer.count == 0 
        UserAnswer.create(answer: answer[1], user_id: user_id, question_id: answer[0], created_at: date)
    else 
        duplicate = UserAnswer.select {|a| a.user_id == user_id && a.question_id == answer[0]}
        duplicate == [] ? UserAnswer.create(answer: answer[1], user_id: user_id, question_id: answer[0], created_at: date) : nil
    end
end

puts "🌱 Done seeding!"