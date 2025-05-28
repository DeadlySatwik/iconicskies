# IconicSkies a Weather App

A beautiful and intuitive weather application that provides real-time weather information and forecasts with dynamic visual effects.

## Features

- 🌡️ Real-time weather data
- 🌅 Dynamic background gradients based on temperature
- 🕒 Local time display for searched cities
- 📅 5-day weather forecast
- 🌍 Global city search
- 💨 Wind speed and humidity information
- 🎨 Beautiful UI with animated transitions
- 📱 Fully responsive design

## Setup

1. Clone the repository:
```bash
git clone https://github.com/DeadlySatwik/iconicskies.git

```

2. Set up the configuration:
   - Copy `config.example.js` to `config.js`
   - Replace the API key with your OpenWeather API key

```javascript
const config = {
    WEATHER_API_KEY: "your_api_key_here"
};
```

3. Get an API key:
   - Sign up at [OpenWeather](https://openweathermap.org/api)
   - Generate an API key
   - Add it to your `config.js`

## Technologies Used

- HTML5
- CSS3
- JavaScript
- OpenWeather API
- Google Material Icons

## Project Structure

```
IconicSkies/
├── assets/
│   ├── weather/     # Weather icons
│   ├── message/     # UI message images
│   └── icon.png     # Favicon
├── style.css        # Styles
├── script.js        # Main JavaScript
├── config.js        # API configuration
└── index.html       # Main HTML
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Author

DeadlyS

## Acknowledgments

- OpenWeather API for weather data
- Google Material Icons for UI elements