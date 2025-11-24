import { useState } from 'react';
import { Layout, Menu, Typography, Flex } from 'antd';
import { 
  CheckSquareOutlined, 
  CloudOutlined,
  ScheduleOutlined
} from '@ant-design/icons';

import TaskManager from './components/TaskManager';
import WeatherPage from './components/WeatherForecast';
import Clock from './components/Clock'

const { Header, Content, Footer } = Layout;
const { Text } = Typography;



const MENU_ITEMS = [
  { key: 'task-manager', label: 'Task Manager', icon: <CheckSquareOutlined /> },
  
  { key: 'weather', label: 'Weather', icon: <CloudOutlined /> },
];

const App = () => {
  const [currentView, setCurrentView] = useState('task-manager');

  const renderContent = () => {
    switch (currentView) {
      case 'task-manager': return <TaskManager />;
      // case 'note-maker': return <NoteMaker />;
      case 'weather': return <WeatherPage />;
      default: return <TaskManager />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', }}>
      
      <Header style={{ 
        padding: '0 24px', 
        position: 'sticky', top: 0, zIndex: 10, width: '100%',
        display: 'flex', alignItems: 'center' 
      }}>
          
          <Flex align="center" style={{ flex: 1 }}>
            <div style={{ marginRight: 40, display: 'flex', alignItems: 'center', gap: 10 }}>
              <ScheduleOutlined style={{ fontSize: 24, color: 'var(--custom-main-accent-color)' }} />
              <Text strong style={{ color: 'white', fontSize: 18 }}>Dashboard</Text>
            </div>
            
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['task-manager']}
              items={MENU_ITEMS}
              onClick={(e) => setCurrentView(e.key)}
              style={{ flex: 1, minWidth: 0 }}
            />
          </Flex>

          <Clock />

      </Header>

      <Content style={{ padding: '24px 48px' }}>
        <div
          style={{
            background: 'var(--white)',
            minHeight: '80vh',
            padding: 24,
            boxShadow: '0 2px 8px var(--white)'
          }}
        >
          {renderContent()}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        <Text type="secondary">Dashboard created with Ant Design. There are most certainly some rights supposed to be here. 2025 ©</Text>
      </Footer>

    </Layout>
  );
};

export default App;