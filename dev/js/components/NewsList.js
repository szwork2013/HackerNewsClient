import React from 'react';

import getCustomDate from '../utils/getCustomDate';
import getHostName from '../utils/getHostName';

export default class NewsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.props.removeScrollEventHandler()
    }

    getContent(id) {
        this.props.getContentHandler(id);
    }

    render() {
        let listHtml = this.props.listData.map((obj) => {
            let linkHtml = obj.url ?
                <a href={obj.url} target='_blank'>{obj.title} ({getHostName(obj.url)})</a> :
                <a href='javascript:;' onClick={this.getContent.bind(this, obj.id)}>{obj.title}</a>;

            return <div className="news-item pure-g" key={obj.id}>
                <div className="pure-u-3-4">
                    <h5 className="news-name">{obj.by}</h5>
                    <h4 className="news-subject">
                        {linkHtml}
                    </h4>
                    <p className="news-desc">
                        {obj.score} points | {obj.kids ? obj.kids.length : '0'} comments | {getCustomDate(obj.time)}
                    </p>
                </div>
            </div>
        });

        return (
            <div className="content">
                {listHtml}
            </div>
        );
    }
}