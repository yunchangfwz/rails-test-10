require 'rails_helper'

describe Comment, type: :model do
  context 'validations' do
    # it { is_expected.to validate_presence_of :user_id }
    it { is_expected.to validate_presence_of :message }
  end

  context 'association' do
    # it { is_expected.to belong_to :user }
    it { is_expected.to belong_to :parent }

    it { is_expected.to have_many :replies }
  end

  describe '#root' do
    let!(:comment)  { create(:comment) }
    let!(:comment_child) { create(:comment, parent_id: comment.id) }

    it 'should include video and not include video2' do
      expect( Comment.root ).to include(comment)
      expect( Comment.root ).not_to include(comment_child)
    end
  end
end
