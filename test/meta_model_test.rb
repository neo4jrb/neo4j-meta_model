require 'test_helper'

class MetaModelTest < ActiveSupport::TestCase
  test "truth" do
    assert_kind_of Module, MetaModel
  end
end
