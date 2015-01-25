module MetaModel
  class PropertySerializer < ActiveModel::Serializer
    attributes :id, :name, :type
  end
end

