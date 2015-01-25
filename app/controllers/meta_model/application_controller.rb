require 'meta_models.rb'
create_models

module MetaModel
  class ApplicationController < ::ApplicationController
    protect_from_forgery with: :exception

    helper MetaModel::Engine.helpers

    layout 'layouts/meta_model'
  end
end
