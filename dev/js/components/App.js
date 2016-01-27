import React from 'react';

import NewsNav from './NewsNav.js';
import NewsMain from './NewsMain.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: 'index',
            type: 'LIST'
        };
    }

    changeCategory(category) {
        this.setState({
            category: category,
            type: this.state.type
        });
    }

    getContent() {
        this.setState({
            category: this.state.category,
            type: 'CONTENT'
        });
    }

    render() {
        return (
            <div>
                <NewsNav
                    categories={this.props.categories}
                    currentCategory={this.state.category}
                    changeCategoryHandler={this.changeCategory.bind(this)}/>
                <NewsMain
                    type={this.state.type}
                    currentCategory={this.state.category}
                    getContentHandler={this.getContent.bind(this)}/>
            </div>
        );
    }
}

App.defaultProps = {
    categories: ['index', 'new', 'show', 'ask', 'jobs']
};