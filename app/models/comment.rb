class Comment < ActiveRecord::Base
  default_scope { order(id: :asc) }

  belongs_to :user
  belongs_to :parent,       inverse_of: :replies,  class_name: Comment

  has_many :replies, class_name: Comment, foreign_key: :parent_id, inverse_of: :parent
  
  validates :user_id,         presence: true 
  validates :message,         presence: true 

  def self.root
    where(parent_id: nil)
  end
end
