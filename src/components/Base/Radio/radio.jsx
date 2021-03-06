import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './index.scss';

export default class Radio extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    className: '',
  }

  handleClick = () => {
    this.props.onChange(this.props.value);
  }

  render() {
    const { className, checked, children } = this.props;
    const classNames = classnames(styles.radio, className, { [styles.checked]: checked });

    return (
      <label className={classNames} onClick={this.handleClick}>
        <span className={styles.circle}></span>
        <span className={styles.text}>{children}</span>
      </label>
    );
  }
}
