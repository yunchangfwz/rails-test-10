Rails.application.routes.draw do
  devise_for :users
 
  resources :comments, only: [:index, :create] do
    member do
      get :replies
    end
    collection do
      get :all
    end
  end

  root "comments#index"
end
