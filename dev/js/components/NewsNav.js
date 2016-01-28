import React from 'react';

export default class NewsNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false
        }
    }

    changeCategory(category) {
        this.props.changeCategoryHandler(category);
    }

    render() {
        let categoryHtml = this.props.categories.map((item) =>
                <li className='pure-menu-item' key={item}>
                    <a href='javascript:;'
                       className={this.props.currentCategory===item ? 'pure-menu-link pure-menu-disabled' : 'pure-menu-link'}
                       onClick={this.changeCategory.bind(this, item)}>
                        {item}
                    </a>
                </li>
        );

        return (
            <div id='menu'>
                <div className='pure-menu'>
                    <a className='pure-menu-heading' href='javascript:;'>Hacker News</a>
                    <ul className='pure-menu-list'>
                        {categoryHtml}
                    </ul>
                </div>
            </div>
        );
    }
}