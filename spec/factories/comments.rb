FactoryGirl.define do
  factory :comment do
    # user 
    message 'This is a great comment.'
    parent_id nil    
  end
end
