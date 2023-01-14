import { Component } from 'react'
import axios from 'axios'

export default class Weather extends Component {
  state = {
    zipcode: '',
    weather: {}
  }

  onChange = (e) => {
    this.setState({
      zipcode: e.target.value
    })
  }

  onSubmit = async (e) => {
    try {
      e.preventDefault()
      const country_code = 'us'
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zipcode},${country_code}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
      const response = await axios.get(url)
      console.log(response.data)
      this.setState({
        weather: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="zipcode">Zipcode</label>
          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            onChange={this.onChange}
            value={this.state.zipcode}
            required
          />
          <button>Get Weather</button>
        </form>
        <div>
          <h2>Weather</h2>
          <p>Temperature: {this.state.weather.main?.temp}</p>
          <p>High: {this.state.weather.main?.temp_max}</p>
          <p>Low: {this.state.weather.main?.temp_min}</p>
          <p>Current Weather: {this.state.weather.weather?.[0].description}</p>
          <p>City: {this.state.weather.name}</p>
          </div>
      </div>
    )
  }
}
