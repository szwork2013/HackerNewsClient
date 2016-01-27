import React from 'react';

export default class NewsNav extends React.Component {
    constructor(props) {
        super(props);
    }

    changeCategory(category) {
        this.props.changeCategoryHandler(category);
    }

    render() {
        let categoryHtml = this.props.categories.map((item) =>
            <li key={item}>
                <a href="javascript:;"
                   className={this.props.currentCategory===item?'active':''}
                   onClick={this.changeCategory.bind(this, item)}>
                    {item}
                </a>
            </li>
        );

        return (
            <nav>
                <ul>
                    {categoryHtml}
                </ul>
            </nav>
        );
    }
}