import { Card, Row, Col, Typography, Image, Space, Tag, Tooltip, Flex } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const HourCard = ({ hour }) => {
  const isCurrentHour = dayjs(hour.time).isSame(dayjs(), 'hour');

  return (
    <Col style={{ flex: '0 0 150px' }}> 
      <Card
        size="small"
        hoverable
        title={<Text  style={{ color: isCurrentHour ? 'var(--custom-main-accent-color)' : '#333' }}>{dayjs(hour.time).format('HH:mm')}</Text>}
        style={{ border: isCurrentHour ? '2px solid var(--custom-main-accent-color)' : '1px solid #f0f0f0' }}
      >
        <Space direction="vertical" size={5} style={{ width: '100%' }}>
          
          <Flex justify="space-between" align="center">
            <Text style={{ fontSize: 20, fontWeight: 600 }}>
              {hour.temp_c}°C
            </Text>
            <Tooltip title={hour.condition.text}>
                <Image 
                    src={hour.condition.icon.startsWith('//') ? `https:${hour.condition.icon}` : hour.condition.icon}
                    preview={false} 
                    width={32}
                    height={32}
                />
            </Tooltip>
          </Flex>

          <Text type="secondary" style={{ fontSize: 12 }}>
            {hour.condition.text}
          </Text>

          <Space size="small" wrap>
             <Tag icon={<SendOutlined />} color="blue">
                {hour.wind_kph} km/h
             </Tag>
             <Tag>
                H: {hour.humidity}%
             </Tag>
             <Tag>
                C: {hour.cloud}%
             </Tag>
          </Space>

        </Space>
      </Card>
    </Col>
  );
};

const HourlyForecast = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) {
    return <Text type="secondary">No hourly forecast data available.</Text>;
  }
  
  const groupedData = hourlyData.reduce((acc, hour) => {
    const date = dayjs(hour.time).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(hour);
    return acc;
  }, {});

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 10 }}>
      {Object.keys(groupedData).map(date => (
        <div key={date} style={{ marginBottom: 20 }}>
          <Title level={5} style={{ marginTop: 0, marginBottom: 15 }}>
            {dayjs(date).format('dddd, D MMMM')}
          </Title>
          <Row gutter={[16, 0]} wrap={false} style={{ flexWrap: 'nowrap' }}>
            {groupedData[date].map((hour) => (
              <HourCard key={hour.time_epoch} hour={hour} />
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;