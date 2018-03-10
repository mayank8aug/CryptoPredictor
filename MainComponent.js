class PredictedCryptoDataComponent extends React.Component {

    constructor(props) {
        super(props);
        this.loadingInidicatorEl = document.getElementById('loader');
        this.bodyEl = document.getElementsByTagName('body')[0];
        this.state = {
            cryptoItems: [],
            isError: false,
            isPredictionDataLoaded: false,
            predictionData: [],
            cryptoCode: '',
            errorMsg: ''
        }
    }

    showLoadingIndicator() {
        this.loadingInidicatorEl.style.display = 'block';
        this.bodyEl.classList.add('bodyOverlay');
    }

    hideLoadingIndicator() {
        this.loadingInidicatorEl.style.display = 'none';
        this.bodyEl.classList.remove('bodyOverlay');
    }

    validateEnteredCode() {
        this.showLoadingIndicator();
        fetch("https://infinite-depths.herokuapp.com/coins")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        cryptoItems: result.coins
                    });
                    if(result.coins.hasOwnProperty(this.state.cryptoCode.trim())) {
                        this.setState({
                            isError: false
                        });
                        this.fetchPredictionData();
                    } else {
                        this.hideLoadingIndicator();
                        this.setState({
                            isPredictionDataLoaded: false,
                            isError: true,
                            errorMsg: 'Invalid Crypto Currency Code.'
                        });
                        this.destroyChartWidget();
                    }
                },
                (error) => {
                    this.hideLoadingIndicator();
                    this.setState({
                        isError: true,
                        errorMsg: 'Error occurred while fetching data.'
                    });
                    this.destroyChartWidget();
                }
            )
    }

    fetchPredictionData() {
        fetch("https://infinite-depths.herokuapp.com/forecast?code="+this.state.cryptoCode.trim())
            .then(res => res.json())
            .then(
                (result) => {
                    this.hideLoadingIndicator();
                    this.setState({
                        isPredictionDataLoaded: true,
                        predictionData: result.forecast,
                        isError: false
                    });
                    renderChart(result.forecast);
                },
                (error) => {
                    this.hideLoadingIndicator();
                    this.setState({
                        isPredictionDataLoaded: true,
                        isError: true,
                        errorMsg: 'Error occurred while fetching data.'
                    });
                    this.destroyChartWidget();
                }
            )
    }

    destroyChartWidget() {
        destroyChart();
    }

    componentDidMount() {
        document.getElementsByClassName('cryptoCurInput')[0].focus();
    }

    handleEnter(e) {
        if (e.keyCode === 13)
            this.handleClick();
    }

    handleClick() {
        this.validateEnteredCode();
    }

    handleChange(e) {
        this.setState({ cryptoCode: e.target.value });
    }

    render() {
        const { isPredictionDataLoaded, isError, errorMsg } = this.state;
        return (
            <div>
                <div id={'inputContainerId'}>
                    <input className={'cryptoCurInput'} type="text" value={this.state.cryptoCode} placeholder="Crypto Currency Code" onChange={ this.handleChange.bind(this) } onKeyDown={ this.handleEnter.bind(this)} />
                    <button className="predictData" onClick={this.handleClick.bind(this)}>Predict</button>
                </div>
                {!isError && isPredictionDataLoaded ? <GridComponent cryptData={this.state.predictionData} /> : <span className={'errorContainer'}>{errorMsg}</span>}
            </div>
        );
    }
}

ReactDOM.render(
    <PredictedCryptoDataComponent/>, document.getElementById('gridId')
);

