import React from 'react';
import classNames from 'classNames';

import NewsNav from './NewsNav.js';
import NewsMain from './NewsMain.js';
import { categories } from '../config';

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
            id: null,
            category: category,
            type: 'LIST'
        });
    }

    getContent(id) {
        this.setState({
            id: id,
            type: 'CONTENT'
        });
    }

    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        });
    }

    toggleLoading(show) {
        show = Object.prototype.toString.call(show) === '[object Boolean]' ? show : true;
        this.setState({
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
                    categories={categories}
                    currentCategory={this.state.category}
                    changeCategoryHandler={this.changeCategory.bind(this)}/>
                <NewsMain
                    key={this.state.category + this.state.type + this.state.id}
                    type={this.state.type}
                    currentCategory={this.state.category}
                    getContentHandler={this.getContent.bind(this)}
                    toggleLoadingHandler={this.toggleLoading.bind(this)}
                    id={this.state.id}/>
            </div>
        );
    }
}