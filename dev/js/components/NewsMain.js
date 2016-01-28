import React from 'react';
import Firebase from 'firebase';
import Modal from 'react-modal';
import { Promise } from 'es6-promise';

import NewsList from './NewsList';
import NewsContent from './NewsContent';
import { api, customStyles } from '../config';

export default class NewsMain extends React.Component {
    constructor(props) {
        super(props);

        this.timer = null;
        this.finish = false;
        this.interval = 1000;
        this.pageIndex = 0;
        this.pageSize = 20;

        this.state = {
            listData: [],
            isModalOpen: false,
            id: null
        };
    }

    getListIds() {
        this.refreshId();

        this.props.toggleLoadingHandler();
        let url = api[this.props.currentCategory];
        let start = this.pageIndex * this.pageSize;
        let _id = NewsMain._id;
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

                this.getListContent(dataArray, _id);
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

    getListContent(ids, _id) {
        let promiseList = ids.map((id) => this.fireBaseWrapper(id));

        Promise.all(promiseList).then(data => {
            if (_id !== NewsMain._id) {
                return;
            }
            this.setState({
                listData: this.state.listData.concat(data)
            });
            this.props.toggleLoadingHandler(false);
            this.bindScrollEvent();
        }, () => console.error('firebase error: please try it later.'));
    }

    getContent(id) {
        //this.props.getContentHandler(id);
        this.setState({
            id: id,
            isModalOpen: true
        });
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

    closeModal() {
        this.setState({
            id: null,
            isModalOpen: false
        });
        this.bindScrollEvent();
    }

    refreshId() {
        NewsMain._id = Date.now();
    }

    componentWillMount() {
        this.getListIds();
    }

    componentWillUnmount() {
        this.refreshId();
        this.removeScrollEvent();
    }

    render() {
        return (
            <div id='main'>
                <NewsList
                    listData={this.state.listData}
                    removeScrollEventHandler={this.removeScrollEvent.bind(this)}
                    getContentHandler={this.getContent.bind(this)}/>
                <Modal
                    isOpen={this.state.isModalOpen}
                    style={customStyles}>
                    <NewsContent
                        toggleLoadingHandler={this.props.toggleLoadingHandler}
                        closeModalHandler={this.closeModal.bind(this)}
                        id={this.state.id}/>
                </Modal>
            </div>
        );
    }
}

NewsMain._id = null;