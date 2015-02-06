module Neo4j
  module MetaModel
    class Property < MetaModelBase
      property :name, type: String
      property :type, type: String

      validates_inclusion_of :type, :in => %w( String DateTime Boolean Integer )

      validates :name, presence: true

      has_one :in, :model, origin: :properties, model_class: 'Neo4j::MetaModel::Model'

    end
  end
end
