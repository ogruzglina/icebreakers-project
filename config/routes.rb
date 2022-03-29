Rails.application.routes.draw do
  
  resources :user_answers, only: [:create]
  get 'user_answers/:question_date', to: 'user_answers#index'
  resources :users
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
