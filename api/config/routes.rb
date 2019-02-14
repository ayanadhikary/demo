Rails.application.routes.draw do
  namespace :api do
    post 'user/token' => 'user_token#create'
    get 'users/current' => 'users#current'
    get 'users/all' => 'users#all'
    resources :pages, only: %i(index show)
  end
end
