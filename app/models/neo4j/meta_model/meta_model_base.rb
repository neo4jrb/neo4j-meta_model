module Neo4j
  module MetaModel
    class MetaModelBase
      include Neo4j::ActiveNode
      include ActiveModel::Serialization

    end
  end
end
