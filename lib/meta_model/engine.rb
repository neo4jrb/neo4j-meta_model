require 'active_model_serializers'
require 'slim-rails'
require 'ember-rails'
require 'emblem/rails'

# TODO: Isolate?
ActiveModel::Serializer.setup do |config|
  config.embed = :ids
  config.embed_in_root = true
end

module MetaModel
  class Engine < ::Rails::Engine
    isolate_namespace MetaModel

    initializer :assets do |config|
      Rails.application.config.assets.precompile += %w( admin/models.js meta_model.js
                                                        meta_model.css )

      Rails.application.config.assets.paths << "#{Rails.root}/vendor/assets/fonts"
    end
  end
end
