import React from 'react';

import NewsNav from './NewsNav.js';
import NewsMain from './NewsMain.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: 'index',
            type: 'LIST',
            id: null
        };
    }

    changeCategory(category) {
        this.setState({
            category: category,
            type: 'LIST',
            id: null
        });
    }

    getContent(id) {
        this.setState({
            category: this.state.category,
            type: 'CONTENT',
            id: id
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
                    getContentHandler={this.getContent.bind(this)}
                    id={this.state.id}/>
            </div>
        );
    }
}

App.defaultProps = {
    categories: ['index', 'new', 'show', 'ask', 'jobs']
};