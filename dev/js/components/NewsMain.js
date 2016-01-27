import React from 'react';

import NewsList from './NewsList.js';
import NewsContent from './NewsContent.js';

export default class NewsMain extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let body = this.props.type === 'LIST' ?
            <NewsList
                currentCategory={this.props.currentCategory}
                handler={this.props.getContentHandler} /> :
            <NewsContent
                id={this.props.id}/>;

        return (
            <section>
                {body}
            </section>
        );
    }
}