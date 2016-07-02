class CommentsController < ApplicationController

  before_action :authenticate_user!, only: [:create]

  def index;end

  def all
    @comments = Comment.all
    render json: @comments.to_json
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment
    else
      render json: comment.errors.full_messages, status: :unprocessable_entity 
    end
  end

  def replies
    @comments = Comment.where(parent_id: comment_id).includes(:user)
    render json: @comments.to_json
  end

  protected
  def comment_id
    params[:id]
  end
  
  def limit
    result = params[:limit] || 99
    return result
  end

  def comment_params
    data = params.require(:comment).permit(:message, :parent_id)
    data[:user_id] = current_user.id 
    data
  end
end
