import React from 'react';
import Firebase from 'firebase';

import getCustomDate from '../utils/getCustomDate';
import { api } from '../config';

export default class NewsContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    getContent() {
        this.props.toggleLoadingHandler();

        let url = api['item'] + this.props.id;
        new Firebase(url).once('value', (snapshot) => {
            this.setState({
                data: snapshot.val()
            });
            this.props.toggleLoadingHandler(false);
        })
    }

    componentDidMount() {
        this.getContent();
    }

    render() {
        let obj = this.state.data;

        return (
            obj ? <div className='content'>
                <h2>{obj.title}</h2>
                <p>{obj.score} points | {obj.kids ? obj.kids.length : '0'} comments | {getCustomDate(obj.time)}</p>
                <div dangerouslySetInnerHTML={{__html: obj.text}}></div>
            </div> : null
        );
    }
};