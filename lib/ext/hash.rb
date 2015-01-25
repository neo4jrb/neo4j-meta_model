class Hash
  def to_a_recursive
    self.to_a.map do |k, v|
      [k, v.try(:to_a_recursive)]
    end
  end
end
