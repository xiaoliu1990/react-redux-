import React, { Component } from 'react';
import common from 'common/common';
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        component: null
      }
    }
    async componentDidMount() {
      const { default: component } = await importComponent();
      this.setState({
        component: component
      })
    }
    render() {
      common.setTitle(this.props.route.meta.title || '加载中...');
      const C = this.state.component
      return C ? <C {...this.props} /> : null
    }
  }
  return AsyncComponent;
}