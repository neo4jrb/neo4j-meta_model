Neo4j::MetaModel::Engine.routes.draw do
  namespace :meta do
    resources :models do
      collection do
        get :hierarchy
      end
    end
    resources :properties
    resources :has_associations#, path: '/associations'#, param: :asso
  end

  get '/meta' => 'meta#index'


  resources :models, path: '/:model'

  root 'models#meta_index'#, as: :meta_models
end

