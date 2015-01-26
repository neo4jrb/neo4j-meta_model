require 'ext/hash.rb'

def create_models
  models = Neo4j::MetaModel::Model.hierarchically.to_a_recursive.flatten

  Neo4j::MetaModel::ModelBase::LOADED_CLASSES.each do |loaded_class|
    loaded_namespace, loaded_class = loaded_class.name.to_s.reverse.split('::', 2).reverse.map(&:reverse)

    namespace = loaded_namespace.blank? ? Object : loaded_namespace.constantize

    namespace.send(:remove_const, loaded_class.to_sym)
  end

  Neo4j::MetaModel::ModelBase::LOADED_CLASSES.clear

  models.each do |model|
    code = "module Neo4j\n"
    code << "module MetaModel\n"
    code << "class #{model.class_name}"
    code << " < Neo4j::MetaModel::#{model.superclass_model.class_name}" if model.superclass_model
    code << "\n"

    code << "  include Neo4j::ActiveNode\n"
    code << "  include ModelBase\n"

    code << "  self.mapped_label_name = '#{model.class_name}'\n"

    model.properties.each do |property|
      code << "  property :#{property.name}, type: #{property.type}\n"
    end

    model.assocs.each_with_rel do |other_model, rel|
      # Primary association
      if rel.from_node.class_name == model.class_name
        options = {type: rel.relationship_type, model_class: 'Neo4j::MetaModel::' + other_model.class_name}

        has_type = case rel.join_type
                    when 'many_to_many', 'many_to_one'
                      'many'
                    when 'one_to_many'
                      'one'
                    end

        code << "  has_#{has_type} :out, :#{rel.name}, #{options.inspect}\n"
      end

      # Reverse association
      if rel.to_node.class_name == model.class_name
        options = {model_class: 'Neo4j::MetaModel::' + other_model.class_name, origin: rel.name}

        has_type = case rel.join_type
                    when 'many_to_many', 'one_to_many'
                      'many'
                    when 'many_to_one'
                      'one'
                    end

        code << "  has_#{has_type} :in, :#{rel.opposite_name}, #{options.inspect}\n"
      end

    end

    code << "end\n"
    code << "end\n"
    code << "end"

    puts "code", code
    eval(code)
  end
end


