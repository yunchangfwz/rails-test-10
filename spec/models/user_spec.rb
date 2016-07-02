require 'rails_helper'

describe User, type: :model do
  context 'association' do
    it { is_expected.to have_many :comments }
  end
end
