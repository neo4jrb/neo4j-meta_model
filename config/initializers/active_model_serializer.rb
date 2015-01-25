require 'active_model_serializers'

ActiveModel::Serializer.setup do |config|
  config.embed = :ids
  config.embed_in_root = true
end
