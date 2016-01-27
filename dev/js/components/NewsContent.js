import React from 'react';
import Firebase from 'firebase';

export default class NewsContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }
    }

    getContent() {
        let url = this.props.api['item'] + this.props.id;

        new Firebase(url).once('value', (snapshot) => {
            console.log(snapshot.val());
            this.setState({
                data: snapshot.val()
            });
        })
    }

    componentDidMount() {
        this.getContent();
    }

    render() {
        let text = this.state.data ? this.state.data.text : '加载中...';

        return (
            <div dangerouslySetInnerHTML={{__html: text}}>
            </div>
        );
    }
};

NewsContent.defaultProps = {
    api: {
        'index': 'https://hacker-news.firebaseio.com/v0/topstories',
        'new': 'https://hacker-news.firebaseio.com/v0/newstories',
        'show': 'https://hacker-news.firebaseio.com/v0/showstories',
        'ask': 'https://hacker-news.firebaseio.com/v0/askstories',
        'jobs': 'https://hacker-news.firebaseio.com/v0/jobstories',
        'item': 'https://hacker-news.firebaseio.com/v0/item/'
    }
};