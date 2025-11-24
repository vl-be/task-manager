import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { Card, Select, Typography, Alert, Spin, Row, Col, Divider, Flex, Tag } from 'antd';
import { CloudOutlined, EnvironmentOutlined } from '@ant-design/icons';

import HourlyForecast from './HourlyForecast'; 

const { Title, Text } = Typography;

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

const fetchWeather = async ({ queryKey }) => {
  const [, city] = queryKey;
  if (!city) return null;

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`;
  
  const response = await axios.get(url);

  console.log(response.data);
  
  const hourlyData = [
      ...response.data.forecast.forecastday[0].hour,
      ...response.data.forecast.forecastday[1].hour,
      ...response.data.forecast.forecastday[2].hour
  ].slice(0, 72); 
  
  return { 
      location: response.data.location, 
      hourly: hourlyData 
  };
};

const CITIES = [
    { value: 'Kyiv', label: 'Kyiv, UA' },
    // { value: 'Mykolayiv', label: 'Mykolayiv, UA' }, city somewhere near Lviv instead of Mykolayiv regional center
    { value: 'Kherson', label: 'Kherson, UA' },
    { value: 'Warsaw', label: 'Warsaw, PL' },
    { value: 'London', label: 'London, UK' },
    { value: 'New York', label: 'New York, US' },
    { value: 'Odesa', label: 'Odesa, UA' },
    { value: 'Lviv', label: 'Lviv, UA' },
    { value: 'Ivano-Frankivsk', label: 'Ivano-Frankivsk, UA' },
    { value: 'MMM43217', label: 'Intentional-failure' },
];

const WeatherPage = () => {
  const [selectedCity, setSelectedCity] = useState('Kyiv'); 

  const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
    
    queryKey: ['weather', selectedCity], 
    queryFn: fetchWeather,
    staleTime: 60 * 60 * 1000, 
    placeholderData: true, 
    enabled: !!selectedCity, 
  });

  const locationName = data?.location?.name || selectedCity;

  const errorDescription = error?.response?.data?.error?.message || error?.message || 'Failure during fetching.';

  
  return (
    <Card 
      title={<Title level={3} style={{ margin: 0 }}><CloudOutlined /> Hourly Weather Forecast</Title>}
      ghost
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
        <Row gutter={[16, 16]} style={{ marginBottom: 20 }} align="middle">
            <Col>
                <Text strong><EnvironmentOutlined /> Select Location:</Text>
            </Col>
            <Col>
                <Select
                    value={selectedCity}
                    onChange={setSelectedCity}
                    options={CITIES}
                    style={{ width: 150 }}
                />
            </Col>
        </Row>

        <Divider style={{ marginTop: 0 }} />

        {isError ? (<Alert message="Error fetching weather data" description={errorDescription} type="error" showIcon />) :
        isLoading ? (
            <Flex justify="center" align="center" style={{ minHeight: 300 }}>
                <Spin size="large" tip={`Loading forecast for ${locationName}...`} />
            </Flex>
        ) : (
            <>
                <Title level={4} style={{ marginTop: 0 }}>
                    Forecast for {locationName}
                    {isPlaceholderData && <Tag color="warning" style={{ marginLeft: 10 }}>Updating...</Tag>}
                </Title>
                
                <HourlyForecast hourlyData={data?.hourly} />
            </>
        )}
    </Card>
  );
};

export default WeatherPage;