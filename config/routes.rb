Rails.application.routes.draw do
  
  
  get 'user_answers/:question_date', to: 'user_answers#index'
  get 'questions/:question_date', to: 'questions#show'
  resources :users
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
