require 'meta_models.rb'
create_models

module Neo4j
  module MetaModel
    class ApplicationController < ::ApplicationController
      protect_from_forgery with: :exception

      helper Neo4j::MetaModel::Engine.helpers

      layout 'layouts/meta_model'
    end
  end
end
