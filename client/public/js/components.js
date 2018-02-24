var Comment = React.createClass({
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <div className="timeline-centered">
           <article className="timeline-entry">
             <div className="timeline-entry-inner">
               <div className="timeline-icon bg-success">
               </div>
               <div className="timeline-label" id="comment">
      <h4>{this.props.author}</h4>
      <p>{this.props.text}</p>
      </div>
      </div>
    </article>
      </div>
      </div>
      </div>

    )
  }
})

var CommentList = React.createClass({
  render: function(){
    var commentNodes = this.props.data.map(function(comment){
      return(<Comment key={comment.id} author={comment.author} text={comment.text} />)
    })
    return(
      <div className="container">
        <div className="row">
          <div className="timeline-centered">
           <article className="timeline-entry">
               <div className="timeline-label" id="CommentList">
      <div>{commentNodes}</div>
      </div>

    </article>
      </div>
      </div>
      </div>
    )
  }
})

var CommentForm = React.createClass({
  getInitialState: function(){
    return {author: '', text: ''}
  },
  handleAuthorChange: function(e){
    this.setState({author: e.target.value})
  },
  handleTextChange: function(e){
    this.setState({text: e.target.value})
  },
  handleSubmit: function(e){
    e.preventDefault()
    var author = this.state.author.trim()
    var text = this.state.text.trim()
    if(!text || !author){
      return;
    }
    this.props.onCommentSubmit({author: author, text: text})
    this.setState({author: '', text: ''})
  },
  render: function(){
    return(
      <form onSubmit={this.handleSubmit}>
      <div className="container">
        <div className="row">
          <div className="timeline-centered">
           <article className="timeline-entry begin">
             <div className="timeline-entry-inner">
           <div className="timeline-icon plus">
             <i className="entypo-flight"></i> +
           </div>
           <div className="timeline-label" id="comment-input">
        <input type="text" id="user" placeholder="Your Name" value={this.state.author} onChange={this.handleAuthorChange}/>
        <input type="text" id="chat" placeholder="Say Something..." value={this.state.text} onChange={this.handleTextChange}/>
        <button type="submit" id="btn-post" className="btn btn-primary">Post</button>
        </div>

        </div>
        </article>
        </div>
        </div>
        </div>
      </form>
    )
  }
})

var CommentBox = React.createClass({
  getInitialState: function(){
    return {data: []}
  },
  loadComments: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(response){
        this.setState({data: response})
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  handleCommentSubmit: function(comment){
    var comments = this.state.data;
    comment.id = Date.now()
    var newComments = comments.concat([comment]);
    this.setState({data: newComments})
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(response){
        this.setState({data: response})
      }.bind(this),
      error: function(xhr, status, err){
        //this.setState({data: comments});
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  componentDidMount: function(){
    this.loadComments()
  },
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <div className="timeline-centered">

               <div className="timeline-label" id="CommentBox">
      <CommentList data={this.state.data} />
      <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>

      </div>
      </div>
      </div>
    )
  }
})

ReactDOM.render(
  <CommentBox url="http://localhost:3000/api/comments"/>, document.getElementById('content')
)
