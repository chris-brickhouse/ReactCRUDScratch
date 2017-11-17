
class UsersControl extends React.Component {  
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    render() {
        return (
            <div className="row">
                <UsersGrid data={this.state.data} />
                <UsersEdit />
            </div>
        );
    }
};

class UsersListItem extends React.Component {
    render() {       
        return (
            <li className="list-group-item">
                <div className="row">
                    <div className="col-8 col-md-auto">
                        <i className="glyphicon glyphicon-user"></i> {this.props.FirstName} {this.props.LastName}
                    </div>
                    <div className="col col-md-auto">
                        <button className="btn btn-primary btn-sm btn-pencil"><i className="fa fa-pencil"></i></button>
                        <button className="btn btn-danger btn-sm btn-trash"><i className="fa fa-trash"></i></button>
                    </div>               
                </div> 
            </li>
        );
    }
};

class UsersGrid extends React.Component {
    render() {

        var userNodes = this.props.data.map(function (item) {
            return (
                <UsersListItem key={item.UserId} FirstName={item.FirstName} LastName={item.LastName} />
            );
        });

        return (
            <div className="col">
                <div className="card">
                    <h3 className="card-header">Users</h3>
                    <div className="card-block">
                        <ul>
                            {userNodes}                            
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};

class UsersEdit extends React.Component {
    render() {
        return (
            <div className="col">
                <div className="card">
                    <h3 className="card-header">Edit User</h3>
                    <h3 className="card-header">Add User</h3>
                    <div className="card-block">
                        <input className="form-control" type="hidden" placeholder="user Id" />
                        <div className="form-group">
                            <input className="form-control" placeholder="First Name" />
                        </div>
                        <div className="form-group">
                            <input className="form-control" placeholder="Last Name" />
                        </div>
                        <button className="btn btn-primary"><i className="fa fa-floppy-o"></i> Submit</button>
                    </div>
                </div>
            </div>
        );
    }
};

ReactDOM.render(
    <UsersControl url="/GetUsers" />,
    document.getElementById('app')
);
