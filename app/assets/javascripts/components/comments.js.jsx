var Reply = React.createClass({
  render() {
    var replyNodes;
    if(this.props.data) {
      replyNodes = this.props.data.map(function(reply) {
        return (
          <Comment key={reply.id} user_name={reply.user_name}>
            {reply.message}
          </Comment>
        )
      });
    }

    return (
      <div className="replies">
        {replyNodes}
      </div>
    )
  }
})

var Comment = React.createClass({
  addReplyFrom() {

  },
  render() {

    return (
      <div className="comment-wrap" data-id={this.props.comment_id}>
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
          <div className="reply-box">
            <span className="replay-btn" onclick={this.addReplyFrom()}>{this.props.reply}</span>
          </div>
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
        <ReplyBox comment_id={this.props.comment_id} user_name={this.props.user_name} user_avatar={this.props.user_avatar}/>
      </div>
    )
  }
})

var CommentList = React.createClass({
  addReplyFrom() {

  },
  render() {
    var self = this
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <div key={comment.id} className="comments">
          <Comment comment_id={comment.id} replies={comment.replies} user_name={comment.user_name} user_avatar={comment.user_avatar} description={comment.message} reply={comment.reply}>
          {comment.message}
          </Comment>
        </div>
      )
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    )
  }
})

var CommentForm = React.createClass({
  getInitialState() {
    return { message: ''};
  },
  handleMessageChange(e) {
    this.setState({message: e.target.value});
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.onCommentSubmit({message: this.state.message});
    this.setState({ message: '' });
  },
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <div className="img-wrap">
          <div className="img">
            <img src={this.props.user_avatar} title={this.props.user_name} />
          </div>
        </div>
        <div className="field">
          <textarea 
            value={this.state.message}
            onChange={this.handleMessageChange}
            placeholder=""
          />
        </div>
        <div className="btn-wrap">
          <input className="comment-submit" type="submit" value="submit"/>
        </div>
      </form>
    )
  }
})

var CommentBox = React.createClass({
  getInitialState() {
    return {data: []}
  },
  loadData() {
    $.ajax({
      url: `/comments/all`, 
      success: function(data) {
        console.log(data)
        this.setState({data: data});
      }.bind(this)
    })
  },
  handleCommentSubmit(comment) {
    $.ajax({
      url: `/comments`,
      type: 'POST',
      data: {comment: comment},
      success: function(data) {
        this.loadData()
      }.bind(this),
      error: function(data) {
        alert(data)
      }.bind(this)
    });
  },
  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, this.props.pollInterval);
  },
  render() {
    return (
      <div className="commentBox" data-limit={this.props.c_limit}>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} user_avatar={this.props.user_avatar} user_name={this.props.user_name} />
        <CommentList data={this.state.data} user_avatar={this.props.user_avatar} user_name={this.props.user_name}/>
      </div>
    )
  }
});
