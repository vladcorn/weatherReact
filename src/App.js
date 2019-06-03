import React from 'react';
import Info from './components/info';
import Weather from './components/weather';
import Form from './components/form';


const API_KEY = "9774c2f5a696054eec0c5631cb81665a";

class App extends React.Component {

  state = {
      temp:undefined,
      city:undefined,
      country:undefined,
      pressure:undefined,
      sunrise:undefined,
      sunset:undefined,
      error: undefined
 };


  gettingWeather = async (e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await api_url.json();
    console.log(data);
        if(data.cod =='404'){
          this.setState({
              temp:undefined,
              city:undefined,
              country:undefined,
              pressure: undefined,
              sunrise:undefined,
              sunset:undefined,
              error: "Wrong city name"
          });
      }
    else if(city) {
          var sunset = data.sys.sunset;
          var sunrise = data.sys.sunrise;
          const time = ms => {
              var date = new Date(ms * 1000);
              var hours = date.getHours();
              // Minutes part from the timestamp
              var minutes = "0" + date.getMinutes();
              // Seconds part from the timestamp
              var seconds = "0" + date.getSeconds();
              return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          };

          var sunset_date = time(sunset);
          var sunrise_date = time(sunrise);
          var background_wrapper = document.querySelector(".background");
          this.setState({
              temp: data.main.temp,
              city: data.name,
              country: data.sys.country,
              pressure: data.main.pressure,
              sunrise: sunrise_date,
              sunset: sunset_date,
              error: undefined,

          });


          if (data.main.temp > 18) {

              background_wrapper.style.background = 'linear-gradient(to right, rgb(255, 126, 95), rgb(254, 180, 123))';
              background_wrapper.style.animation = 'opacity 1s ease-in-out,background3 5s infinite';
              background_wrapper.style.boxShadow = '0 -200px 100px -120px rgb(255,126,95) inset';
          }
          else if (data.main.temp < 10) {
              background_wrapper.style.background = 'linear-gradient(to right, rgb(44, 62, 80), rgb(76, 161, 175))';
              background_wrapper.style.animation = 'opacity 1s ease-in-out, background2 5s infinite';
              background_wrapper.style.boxShadow = '0 -200px 100px -120px rgb(44,62,80) inset';
          }
          else {
              background_wrapper.style.background = 'linear-gradient(to right, rgb(252, 0, 255), rgb(0, 219, 222))';
              background_wrapper.style.animation = 'opacity 1s ease-in-out, background1 5s infinite';
              background_wrapper.style.boxShadow = '0 -200px 100px -120px rgb(252,0,255) inset';
          }

    }
    else{
          this.setState({
              temp:undefined,
              city:undefined,
              country:undefined,
              pressure: undefined,
              sunrise:undefined,
              sunset:undefined,
              error: "Put city name"
          });
      }

  };

  render(){
   return(
       <div className="wrapper">
           <div className={'background'}/>
           <div className={"container"}>
               <div className={"left"}>
                   <Info/>
               </div>
               <div className={'right'}>
                   <Form weatherMethod={this.gettingWeather}/>
                   <Weather
                       temp = {this.state.temp}
                       city = {this.state.city}
                       country = {this.state.country}
                       pressure = {this.state.pressure}
                       sunrise = {this.state.sunrise}
                       sunset = {this.state.sunset}
                       error = {this.state.error}
                   />
               </div>
           </div>
       </div>
   );
  }
}
export default App

