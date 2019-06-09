import React from 'react';

export default function withProgress(Component, modelName) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {progress: props[modelName].progress}
    }
    _updateProgress = () => {
      this.setState({progress: this.props[modelName].progress});
    }
    componentDidMount() {
      this.props[modelName].subscribe(this._updateProgress);
    }
  
    componentWillUnmount() {
      this.props[modelName].unsubscribe(this._updateProgress);
    }
    render() {
      return <Component {...this.props} progress={this.state.progress} />;
    }
  };
}
