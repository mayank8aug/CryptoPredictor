class GridComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { cryptData } = this.props;
        if(!cryptData) {
            return <div>No data fetched</div>
        } else {
            return (
                <div className={'grid'}>
                    <table className={"table table-bordered table-striped"}>
                        <thead className={'tableHead'}>
                        <tr>
                            <td className={"headerLabel"}>
                                <span>Prediction Date</span>
                            </td>
                            <td className={"headerLabel"}>
                                <span>Predicted Value (in USD)</span>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        {cryptData.sort((a, b) => (new Date(a.timestamp)) - (new Date(b.timestamp))).map(data => (<tr key={(new Date(data.timestamp)).toLocaleDateString()}><td>{(new Date(data.timestamp)).toLocaleDateString()}</td><td>{data.usd}</td></tr>))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

