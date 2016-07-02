var ReplyComment = React.createClass({
  
  render() {
  
    return (
      <div className="comment-wrap reply-wrap" data-id={this.props.cmt_id}>
        <div className="img-wrap">
          <div className="img">
            <img src={this.props.user_avatar} title={this.props.user_name} />
          </div>
        </div>
        <div className="info">
          <div className="advisor-name">
            <h6>{this.props.user_name}</h6>
          </div>
          <div className="content">{this.props.description}</div>
        </div>
        <div className="action">
          <div className="dropdown">
            <ul className="dropdown-menu">
              <li> edit</li>
              <li> delete</li>
            </ul>
          </div>
        </div>
        <div className="clearfix"></div>
        <ReplyBox comment_id={this.props.cmt_id} user_name={this.props.user_name} user_avatar={this.props.user_avatar}/>

      </div>
    )
  }
})

var ReplyList = React.createClass({
  addReplyFrom() {

  },
  render() {
    var replyNodes = this.props.data.map(function(reply) {
      return (
        <div key={reply.id} className="comments replies">
          <ReplyComment cmt_id={reply.id} replies={reply.replies} user_name={reply.user_name} user_avatar={reply.user_avatar}  description={reply.message} liked={reply.liked} reply={reply.reply}>
          {reply.message}
          </ReplyComment>
        </div>
      )
    });

    return (
      <div className="commentList replyList">
        {replyNodes}
      </div>
    )
  }
})

var ReplyForm = React.createClass({
  getInitialState() {
    return { message: '' };
  },
  handleMessageChange(e) {
    this.setState({message: e.target.value});
    
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.onReplySubmit({message: this.state.message, parent_id: this.props.comment_id});
    this.setState({ message: '' });
  },
  render() {
    return (
      <form className="commentForm replyForm" onSubmit={this.handleSubmit}>
        <div className="img">
          <img src={this.props.user_avatar} title={this.props.user_name} />
        </div>
        <div className="field message">
          <textarea 
            value={this.state.message}
            onChange={this.handleMessageChange}
            placeholder=""
          />
        </div>
        <div className="btn-wrap">
          <input className="comment-submit" type="submit" value="Reply"/>
        </div>
      </form>
    )
  }
})

var ReplyBox = React.createClass({
  getInitialState() {
    return {data: []}
  },
  loadData() {
    var url = `/comments/${this.props.comment_id}/replies`
    $.ajax({
      url: url,
      success: function(data) {
        this.setState({data: data});
        console.log(data)
      }.bind(this)
    })
  },
  handleReplySubmit(reply) {
    var url = `/comments`

    $.ajax({
      url: url,
      type: 'POST',
      data: {comment: reply},
      success: function(data) {
        this.loadData()
      }.bind(this),
      error: function(data) {
        alert(data.responseJSON.join(', '));
      }.bind(this)
    });
  },
  componentDidMount() {
    this.loadData();
    setInterval(this.loadData(), this.props.pollInterval);
  },
  render() {
    return (
      <div className="commentBox replybox">
        <ReplyForm onReplySubmit={this.handleReplySubmit} comment_id={this.props.comment_id} video_id={this.props.video_id} user_name={this.props.user_name} user_avatar={this.props.user_avatar} />
        <ReplyList data={this.state.data} />
      </div>
    )
  }
});
