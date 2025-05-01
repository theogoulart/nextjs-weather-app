import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout/index';
import Weather from '../components/Weather/index';
import Select from 'react-select';
import React from 'react'


const options = [
    { value: '3448439', label: 'São Paulo, BR' },
    { value: '3451190', label: 'Rio de Janeiro, BR' },
    { value: '6322752', label: 'Curitiba, BR' },
    { value: '3394023', label: 'Natal, BR' },
];

class App extends React.Component {

    static async getInitialProps () {
        const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?id=3448439&units=metric&appid=' + process.env.weatherApiKey);
        const data = await res.json();

        return {
            forecasts: data.list, 
            city: data.city.name, 
            country: data.city.country, 
            cityId: data.city.id 
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            forecasts: props.forecasts,
            city: props.city, 
            country: props.country,
            cityId: props.cityId
        };
    }

    handleChange = async (selectedOption) => {
        const res = await fetch('https://api.openweathermap.org/data/2.5/forecast?id=' + selectedOption.value + '&units=metric&appid=' + process.env.weatherApiKey);
        const data = await res.json();

        this.setState((state) => {
            return {
                forecasts: data.list, 
                city: data.city.name, 
                country: data.city.country, 
                cityId: data.city.id
            };
        });
    };

    render () {
        return (
            <Layout>
                <div className="heading">
                    <h1>
                        <small>Weather in</small> <strong>{`${this.state.city}, ${this.state.country}`}</strong>
                    </h1>
                    <div style={{width: '200px'}}>
                        <Select
                            width="200px"
                            value={this.state.cityId}
                            onChange={this.handleChange}
                            options={options}
                            placeholder="Select a city"
                        />
                    </div>
                </div>
                <div className="weather__container">
                    {this.state.forecasts.map((v,i,a) => {
                        const itemTime = new Date(v.dt * 1000).getHours();

                        if (i !== 0 && itemTime !== 12) {
                            return;
                        }

                        return <Weather id={this.state.cityId} key={i} info={v}></Weather>;
                    })}
                </div>
                <style jsx>{`
                .heading {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 81px;
                    width: 100%;
                }

                .weather__container {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }
                `}</style>
            </Layout>
        );
    }
}

export default App;