import React from 'react';
import Firebase from 'firebase';

import NewsList from './NewsList';
import NewsContent from './NewsContent';
import { api } from '../config';

export default class NewsMain extends React.Component {
    constructor(props) {
        super(props);

        this.timer = null;
        this.finish = false;
        this.interval = 1000;
        this.pageIndex = 0;
        this.pageSize = 20;

        this.state = {
            listData: []
        }
    }

    getListIds() {
        this.props.toggleLoadingHandler();
        let url = api[this.props.currentCategory];
        let start = this.pageIndex * this.pageSize;
        let data, dataArray = [];

        new Firebase(url)
            .startAt(null, start.toString())
            .limitToFirst(this.pageSize)
            .once('value', (snapshot) => {
                data = snapshot.val();

                if (!data) {
                    this.finish = true;
                    this.props.toggleLoadingHandler(false);
                    return;
                }

                if (Object.prototype.toString.call(snapshot.val()) === '[object Object]') {
                    Object.keys(data).forEach(key => {
                        data[key] && dataArray.push(data[key]);
                    });
                } else {
                    data.forEach(value => {
                        value && dataArray.push(value);
                    });
                }

                this.getListContent(dataArray);
            }
        );

        this.pageIndex++;
    }

    fireBaseWrapper(id) {
        return new Promise((resolve, reject) => {
            let url = api['item'] + id;
            new Firebase(url).once('value', (snapshot) => {
                resolve(snapshot.val())
            })
        });
    }

    getListContent(ids) {
        let promiseList = ids.map((id) => this.fireBaseWrapper(id));

        Promise.all(promiseList).then(data => {
            this.setState({
                listData: this.state.listData.concat(data)
            });
            this.props.toggleLoadingHandler(false);
            this.bindScrollEvent();
        }, () => console.error('firebase error: please try it later.'));
    }

    getContent(id) {
        this.props.getContentHandler(id);
        this.removeScrollEvent();
    }

    bindScrollEvent() {
        if (this.finish) {
            return;
        }
        if (this.timer) {
            this.removeScrollEvent();
        }
        this.timer = setInterval(() => {
            if (document.getElementById('main').clientHeight === 0 ||
                (document.body.offsetHeight - window.innerHeight - window.scrollY >= 30)) {
                return;
            }
            this.getListIds();
            this.removeScrollEvent();
        }, this.interval);
    }

    removeScrollEvent() {
        clearInterval(this.timer);
        this.timer = null;
    }

    componentWillMount() {
        if (this.props.type === 'LIST') {
            this.getListIds();
        }
    }

    componentWillUnmount() {
        this.removeScrollEvent();
    }

    render() {
        let body = this.props.type === 'LIST' ?
            <NewsList
                listData={this.state.listData}
                removeScrollEventHandler={this.removeScrollEvent.bind(this)}
                getContentHandler={this.getContent.bind(this)}/> :
            <NewsContent
                toggleLoadingHandler={this.props.toggleLoadingHandler}
                id={this.props.id}/>;

        return (
            <div id='main'>
                {body}
            </div>
        );
    }
}