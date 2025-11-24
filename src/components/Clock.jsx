import { useState, useEffect } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { GlobalOutlined, DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONES = [
  { label: 'Kyiv', value: 'Europe/Kyiv', icon: '🇺🇦' },

  { label: 'Warsaw', value: 'Europe/Warsaw', icon: '🇵🇱' },
  { label: 'London', value: 'Europe/London', icon: '🇬🇧' },
  { label: 'New York', value: 'America/New_York', icon: '🇺🇸' },
  { label: 'Tokyo', value: 'Asia/Tokyo', icon: '🇯🇵' },
];

const Clock = () => {
  const [currentZone, setCurrentZone] = useState('Europe/Kyiv');
  const [time, setTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => setTime(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = TIMEZONES.map((zone) => ({
    key: zone.value,
    label: `${zone.icon} ${zone.label}`,
    onClick: () => setCurrentZone(zone.value),
  }));

  const activeZoneObj = TIMEZONES.find(zone => zone.value === currentZone);

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
      <Button 
        type="text"
        style={{ 
          color: 'var(--white)', 
        }}
      >
        <Space>
          <GlobalOutlined style={{ fontSize: 24 }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
            <span style={{ fontWeight: 'bold', fontSize: 16 }}>
              {time.tz(currentZone).format('HH:mm:ss')}
            </span>
            <span style={{ fontSize: 10}}>
              {activeZoneObj?.icon} {activeZoneObj?.label}
            </span>
          </div>
          <DownOutlined style={{ fontSize: 12, marginLeft: 4 }} />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default Clock;