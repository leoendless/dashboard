import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import isFunction from 'lodash/isFunction';

import styles from './index.scss';

export default class Select extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  state = {
    isOpen: false,
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
  }

  handleOutsideClick(e) {
    if (this.wrapper && !this.wrapper.contains(e.target)) {
      this.setState({ isOpen: false });
    }
  }

  handleOptionClick = (e) => {
    const value = e.currentTarget.getAttribute('value');
    isFunction(this.props.onChange) && this.props.onChange(value);
    this.setState({ isOpen: false });
  }

  handleControlClick = () => {
    const { isOpen } = this.state;

    if (isOpen) {
      document.removeEventListener('click', this.handleOutsideClick.bind(this));
    } else {
      document.addEventListener('click', this.handleOutsideClick.bind(this));
    }

    this.setState({ isOpen: !isOpen });
  }

  renderControl() {
    const { value } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={styles.control} onClick={this.handleControlClick}>
        <div className={styles.controlLabel}>{value}</div>
        <i className={`fa fa-caret-${isOpen ? 'up' : 'down'}`}/>
      </div>
    );
  }

  renderOptions() {
    const { children, value } = this.props;
    const { isOpen } = this.state;

    const nodes = React.Children.map(children, (child) => React.cloneElement(child, {
      ...child.props,
      onClick: this.handleOptionClick,
      isSelected: String(value) === child.props.value,
    }));

    return (
      <div className={classnames(styles.options, { [styles.show]: isOpen })}>
        {nodes}
      </div>
    );
  }

  render() {
    const { className, children, ...rest } = this.props;

    return (
      <div
        className={classnames(styles.select, className)}
        {...rest}
        ref={ref => { this.wrapper = ref; }}
      >
        {this.renderControl()}
        {this.renderOptions()}
      </div>
    );
  }
}
