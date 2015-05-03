require 'active_model_serializers'
require 'slim-rails'

# TODO: Isolate?
ActiveModel::Serializer.setup do |config|
  config.embed = :ids
  config.embed_in_root = true
end

module Neo4j
  module MetaModel
    class Engine < ::Rails::Engine
      isolate_namespace MetaModel

      initializer :assets do |config|
        Rails.application.config.assets.precompile += %w( meta_model.js meta_model/app.js meta_model/vendor.js
                                                          meta_model.css )

        Rails.application.config.assets.paths << "#{Rails.root}/vendor/assets/fonts #{Rails.root}/public/meta_model/assets"
      end
      initializer "static assets" do |app|
        app.middleware.use ::ActionDispatch::Static, "#{root}/public"
      end
    end
  end
end
