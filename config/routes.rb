Photobooth::Application.routes.draw do
  root 'users#index'

  resources :users do
    resources :photos do
    end
  end

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy', as: 'logout'
end
