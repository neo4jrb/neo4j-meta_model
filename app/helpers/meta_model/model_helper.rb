module MetaModel
  module ModelHelper
    def hierarchical_render(hierarchy, level = 0, &block)
      hierarchy.each do |object, sub_hierarchy|
        block.call object, level
        hierarchical_render(sub_hierarchy, level + 1, &block)
      end
    end
  end
end
