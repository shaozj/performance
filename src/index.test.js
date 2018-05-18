'use strict';

import Performance from './index';

class Test extends React.Component {
  render() {
    return <div>我是测试页面</div>;
  }
}

ReactDOM.render(<Test />, document.getElementById('app'));
