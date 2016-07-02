class CommentsController < ApplicationController

  before_action :authenticate_user!, only: [:create]

  def index
    @comments = Comment.all
    # @comments = Comment.where('commentable_id = ? and commentable_type = ?', commentable_id, "#{commentable_type}").root.limit(limit)
    # render json: comment_respone.to_json(include: {replies: {methods: :user_name}}, methods: :user_name)
  end

  def create
    # comment = Comment.new(comment_params)
    # if comment.save
    #   render json: comment
    # else
    #   render json: comment.errors.full_messages, status: :unprocessable_entity 
    # end
  end

  def replies
    # @comments = Comment.where(parent_id: comment_id).includes(:user)
    # render json: comment_respone.to_json
  end

  protected

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
