module Neo4j
  module MetaModel
    module ModelBase
      extend ActiveSupport::Concern

      LOADED_CLASSES = []
      included do |base|
        LOADED_CLASSES << self
      end

      module ClassMethods
        def inherited(base)
          LOADED_CLASSES << base
        end

        def meta_model_class
          name.gsub(/^Neo4j::MetaModel::/, '')
        end

        def naming_column
          # Probably want to allow the user to choose this
          Neo4j::MetaModel::Model.where(class_name: meta_model_class).first.properties.detect {|p| p.type == 'String' }.name
        end
      end

      def naming_column_value
        self.read_attribute(self.class.naming_column)
      end

      def meta_model_class
        self.class.meta_model_class
      end

      def association_values
        self.class.associations.each_with_object({}) do |(key, _), result|
          result[key] = self.send(key)
        end
      end

      def _description
        self.try(:name) || self.try(:title) || self.try(:description) || self.id
      end
    end
  end
end
