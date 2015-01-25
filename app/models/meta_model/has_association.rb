module MetaModel
  class HasAssociation
    include Neo4j::ActiveRel

    from_class 'MetaModel::Model'
    to_class 'MetaModel::Model'
    type 'has_association_to'


    # one_to_many refers to from_class has_many to_classes
    # many_to_one refers to from_class has_one  to_class
    property :join_type, type: String
    validates_inclusion_of :join_type, :in => %w( many_to_one one_to_many many_to_many )

    # Name of associations on each side
    property :name, type: String
    property :opposite_name, type: String

    property :relationship_type, type: String

    def from_model
      from_node
    end

    def to_model
      to_node
    end

    def from_model=(other)
      self.from_node = other
    end

    def to_model=(other)
      self.to_node = other
    end

    def from_model_id=(id)
      self.from_model = Model.find(id)
    end

    def to_model_id=(id)
      self.to_model = Model.find(id)
    end

  end
end
