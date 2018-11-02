/* eslint-disable */
import * as React from 'react';
import { UDFCompatibleDatafeed } from './UDFCompatibleDatafeed/udf-compatible-datafeed';
import "./index.less";
function getLanguageFromURL() {
    const regex = new RegExp('[\\?&]lang=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export class TVChartContainer extends React.PureComponent {
    static defaultProps = {
        symbol: 'AAPL',
        interval: 'D',
        containerId: 'tv_chart_container',
        datafeedUrl: 'https://demo_feed.tradingview.com',
        libraryPath: '/charting_library/',
        chartsStorageUrl: 'https://saveload.tradingview.com',
        chartsStorageApiVersion: '1.1',
        clientId: 'tradingview.com',
        userId: 'public_user_id',
        fullscreen: false,
        autosize: true,
        studiesOverrides: {},
    };

    tvWidget = null;

    componentDidMount() {
        const widgetOptions = {
            symbol: this.props.symbol,
            // BEWARE: no trailing slash is expected in feed URL
            datafeed: new UDFCompatibleDatafeed(this.props.datafeedUrl),
            interval: this.props.interval,
            container_id: this.props.containerId,
            library_path: this.props.libraryPath,

            locale: getLanguageFromURL() || 'zh',
            disabled_features: ['use_localstorage_for_settings'],
            enabled_features: ['study_templates'],
            charts_storage_url: this.props.chartsStorageUrl,
            charts_storage_api_version: this.props.chartsStorageApiVersion,
            client_id: this.props.clientId,
            user_id: this.props.userId,
            fullscreen: this.props.fullscreen,
            autosize: this.props.autosize,
            studies_overrides: this.props.studiesOverrides,
        };
        const tvWidget = new window.TradingView.widget(widgetOptions);
        this.tvWidget = tvWidget;
    }

    componentWillUnmount() {
        if (this.tvWidget !== null) {
            this.tvWidget.remove();
            this.tvWidget = null;
        }
    }

    render() {
        return (
            <div
                id={this.props.containerId}
                className={'TVChartContainer'}
            />
        );
    }
}
