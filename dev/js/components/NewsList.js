import React from 'react';
import Firebase from 'firebase';

import getCustomDate from '../utils/getCustomDate';
import getHostName from '../utils/getHostName';

export default class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
            pageSize: 20,
            ids: [],
            data: []
        }
    }

    getListIds() {
        this.props.toggleLoadingHandler();
        let url = this.props.api[this.props.currentCategory];
        new Firebase(url).startAt(null, this.state.pageIndex.toString()).limitToFirst(this.state.pageSize).once('value', (snapshot) => {
                this.getListContent(snapshot.val())
            }
        );
    }

    fireBaseWrapper(id) {
        return new Promise((resolve, reject) => {
            let url = this.props.api['item'] + id;
            new Firebase(url).once('value', (snapshot) => {
                resolve(snapshot.val())
            })
        })
    }

    getListContent(ids) {
        let promiseList = ids.map((id) => this.fireBaseWrapper(id));

        Promise.all(promiseList).then(data => {
            this.setState({data: data});
            this.props.toggleLoadingHandler(false);
        }, () => console.log('error'));
    }

    getContent(id) {
        this.props.handler(id);
    }

    componentDidUpdate(prevProps) {
        if (!this.props.currentCategory || this.props.currentCategory === prevProps.currentCategory) {
            return;
        }
        this.getListIds();
    }

    componentDidMount() {
        this.getListIds();
    }

    render() {
        let listHtml = this.state.data.map((obj) => {
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

NewsList.defaultProps = {
    api: {
        'index': 'https://hacker-news.firebaseio.com/v0/topstories',
        'new': 'https://hacker-news.firebaseio.com/v0/newstories',
        'show': 'https://hacker-news.firebaseio.com/v0/showstories',
        'ask': 'https://hacker-news.firebaseio.com/v0/askstories',
        'jobs': 'https://hacker-news.firebaseio.com/v0/jobstories',
        'item': 'https://hacker-news.firebaseio.com/v0/item/'
    }
};