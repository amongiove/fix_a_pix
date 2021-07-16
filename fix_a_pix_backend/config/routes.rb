Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
  namespace :api do
    namespace :v1 do
      resources :pictures, only: [:index, :create]
      get '/pictures/search/:keyword', to: 'pictures#search'
    end
  end

  namespace :api do
    namespace :v1 do
      resources :categories, only: [:index, :create]
    end
  end

end
