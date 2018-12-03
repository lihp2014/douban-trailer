import React from 'react'
import { render } from 'react-dom'
import App from './app'

class AppContainer extends React.Component {
  state = {
    name: 'Parcel 打包'
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ name: 'Parcel 大包包'})
    })
  }

  render () {
    return <App name={this.state.name} />
  }
}

render(
  <AppContainer />,
  document.getElementById('app')
)