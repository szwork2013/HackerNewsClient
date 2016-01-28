import React from 'react';
import classNames from 'classNames';

import NewsNav from './NewsNav.js';
import NewsMain from './NewsMain.js';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: 'index',
            type: 'LIST',
            id: null,
            showMenu: false,
            loading: false
        };
    }

    changeCategory(category) {
        this.setState({
            category: category,
            type: 'LIST',
            id: null,
            showMenu: this.state.showMenu,
            loading: this.state.loading
        });
    }

    getContent(id) {
        this.setState({
            category: this.state.category,
            type: 'CONTENT',
            id: id,
            showMenu: this.state.showMenu,
            loading: this.state.loading
        });
    }

    toggleMenu() {
        this.setState({
            category: this.state.category,
            type: this.state.type,
            id: this.state.id,
            showMenu: !this.state.showMenu,
            loading: this.state.loading
        });
    }

    toggleLoading(show) {
        show = Object.prototype.toString.call(show) === '[object Boolean]' ? show : true;
        this.setState({
            category: this.state.category,
            type: this.state.type,
            id: this.state.id,
            showMenu: this.state.showMenu,
            loading: show
        });
    }

    render() {
        let classes = classNames({
            '': !this.state.showMenu,
            'active': this.state.showMenu
        });

        let loadingClass = classNames({
            'loading': this.state.loading,
            'loading loading-end': !this.state.loading
        });

        return (
            <div className={classes}>
                <a href="javascript:;" className="menu-link" onClick={this.toggleMenu.bind(this)}>
                    <span></span>
                </a>
                <div className={loadingClass}>加载中...</div>
                <NewsNav
                    categories={this.props.categories}
                    currentCategory={this.state.category}
                    changeCategoryHandler={this.changeCategory.bind(this)}/>
                <NewsMain
                    type={this.state.type}
                    currentCategory={this.state.category}
                    getContentHandler={this.getContent.bind(this)}
                    toggleLoadingHandler={this.toggleLoading.bind(this)}
                    id={this.state.id}/>
            </div>
        );
    }
}

App.defaultProps = {
    categories: ['index', 'new', 'show', 'ask', 'jobs']
};