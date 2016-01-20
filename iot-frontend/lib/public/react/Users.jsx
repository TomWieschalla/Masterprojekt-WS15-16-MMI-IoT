var React = require('react')
  , TopBar = require('./shared/TopBar');

var Users = React.createClass({

  propTypes: {
    user: React.PropTypes.object,
    users: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      users: this.props.users,
      listClass: 'row column list'
    };
  },

  componentDidMount: function() {
    setTimeout(function() {
      this.setState({listClass: 'row column list done'});
    }.bind(this), 0);
  },

  handleSearchChange: function() {
    var input = this.refs.search.value.toLowerCase();
    var checkUserName = input.indexOf('username:') > -1
      , checkFirstName = input.indexOf('firstname:') > -1
      , checkLastName = input.indexOf('lastname:') > -1;

    var users = [];
    if (checkUserName || checkFirstName || checkLastName) {
      var filterList = [
        'username',
        'firstname',
        'lastname'
      ];
      var dic = {};
      var splittedInput = input.split(';');
      splittedInput.forEach(function(inputPiece) {
        inputPiece = inputPiece.trim();
        if (inputPiece.indexOf(':') > -1) {
          var pieceName = inputPiece.split(':')[0].trim().toLowerCase();
          var pieceValue = inputPiece.split(':')[1].trim().toLowerCase();
          var isCorrect = filterList.some(function(filterName) {
                            return filterName === pieceName;
                          });
          if (isCorrect) {
            dic[pieceName] = pieceValue;
          }
        }
      });
      users = this.props.users.filter(function(user) {
        if (!user.firstname) return true;
        var bool = true;
        var value;
        if (checkUserName) {
          value = dic.username;
          bool = user.username.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkFirstName) {
          value = dic.firstname;
          bool = user.firstname.toLowerCase().indexOf(value) > -1;
        }
        if (bool && checkLastName) {
          value = dic.lastname;
          bool = user.lastname.toLowerCase().indexOf(value) > -1;
        }
        return bool;
      });
      this.setState({users: users});
    } else {
      users = this.props.users.filter(function(user) {
        if (!user.firstname) return true;
        var bool = false;
        bool = user.username.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = user.firstname.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
        bool = user.lastname.toLowerCase().indexOf(input) > -1;
        if (bool) return true;
      });
      this.setState({users: users});
    }
  },

  renderUsers: function() {
    return (
      <div>
        <div className='row'>
          <div className='large-3 columns'>
            <b>username</b>
          </div>
          <div className='large-3 columns'>
            <b>firstname</b>
          </div>
          <div className='large-3 columns'>
            <b>lastname</b>
          </div>
          <div className='large-1 columns'>
            <b>sensorcount</b>
          </div>
          <div className='large-2 columns' style={{textAlign: 'end'}}>
            <b>Role</b>
          </div>
        </div>
        {this.state.users
        .sort(function(a, b) {
          if (a.username < b.username)
            return -1;
          if (a.username > b.username)
            return 1;
          return 0;
        })
        .map(function(user, i) {
          return this.renderUser(user, i)
        }.bind(this))}
      </div>
    );
  },

  renderUser: function(user, i) {
    return (
      <a href={'/user/' + user.username} key={'user #'+i}>
        <div className='row'>
          <div className='large-3 columns'>
            {user.username}
          </div>
          <div className='large-3 columns'>
            {user.firstname || 'missing'}
          </div>
          <div className='large-3 columns'>
            {user.lastname || 'missing'}
          </div>
          <div className='large-1 columns'>
            {user.sensorCount || 0}
          </div>
          <div className='large-2 columns' style={{textAlign: 'end'}}>
            { this.renderRole(user) }
          </div>
        </div>
      </a>
    );
  },

  renderRole: function(user) {
    var isAdmin = user.roles.indexOf('ROLE_ADMIN') > -1;
    var role = isAdmin ? 'Admin' : 'User';
    return (
      <span>{role}</span>
    );
  },

  render: function() {
    return (
      <div>
        <TopBar user={this.props.user} />
        <div className='row column'
          onChange={this.handleSearchChange}
          style={{float: 'none', width: '50%'}}>
          <label>Search
            <input type='text'
              ref='search'
              placeholder='username: Max; firstname: Max; lastname: Mustermann' />
          </label>
        </div>
        <div className={this.state.listClass} style={{float: 'none'}}>
          <div className='callout'>
            <h5>Userlist</h5>
            {this.renderUsers()}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Users;

