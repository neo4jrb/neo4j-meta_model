module Neo4j
  module MetaModel
    class ModelSerializer < ActiveModel::Serializer
      attributes :id, :class_name

  #    embed :ids, include: true

      has_many :properties
      has_many :has_associations
    #  has_one :superclass_model
    end
  end
end
