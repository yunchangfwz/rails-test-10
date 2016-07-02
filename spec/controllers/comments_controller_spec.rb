require 'rails_helper'

describe CommentsController do 
  describe '#index' do 
    def do_request
      get :index
    end

    let!(:user)     { create(:user) }

    before { sign_in user }
    
    it 'returns a list of comments' do 
      do_request 
    end
  end

end
