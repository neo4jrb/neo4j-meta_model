module MetaModel
  class HasAssociationSerializer < ActiveModel::Serializer
    attributes :id, :join_type, :name, :opposite_name, :relationship_type, :from_model, :to_model

    def from_model
      object.from_node.id
    end

    def to_model
      object.to_node.id
    end
  end
end
