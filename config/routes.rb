Photobooth::Application.routes.draw do
  get "photos/show"
  root 'welcome#index'
  resources :users do
    resources :photos
  end

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy', as: 'logout'
end
