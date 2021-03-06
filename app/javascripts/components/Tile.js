var React = require('react')
var moment = require('moment')
var Value = require('./Value')

module.exports = React.createClass({
  getInitialState() {
    return {
      updatedAgo: ''
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      updatedAgo: moment(nextProps.updatedAt).fromNow()
    })
  },

  componentDidMount() {
    this.tick = setInterval(() => {
      this.setState({
        updatedAgo: moment(this.props.updatedAt).fromNow()
      })
    }, 1000)
  },

  componentWillUnmount() {
    clearInterval(this.tick)
  },

  render() {
    var tileClassNames = ['tile', this.props.color, `span-${this.props.span}`].join(' ')

    return (
      <div id={this.props.id} className={tileClassNames}>
        <h1>{this.props.title}</h1>
        <Value {...this.props} />

        <footer>
          <p className="more-info">{this.props.moreInfo || '\u00a0'}</p>
          <p className="updated-at">Updated {this.state.updatedAgo}</p>
        </footer>
      </div>
    )
  }
})
