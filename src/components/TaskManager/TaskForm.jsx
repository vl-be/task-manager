import { useState } from 'react';
import { Input, Button, Card, DatePicker, Select, Row, Col, Typography, message, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

const TaskForm = ({ onAdd, categories }) => {
  const [text, setText] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState(null);
  const [deadline, setDeadline] = useState(null);

  const handleSubmit = () => {
    if (!text.trim()) {
      message.warning('Task name is required!');
      return;
    }
    
    onAdd({
      text,
      note,
      category,
      deadline: deadline ? deadline.toISOString() : null,
    });

    setText('');
    setNote('');
    setCategory(null);
    setDeadline(null);
  }; 

  return (
    <Card style={{ marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <Title level={4} style={{ marginTop: 0 }}>New Task</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Input 
            size="large" 
            placeholder="What to do?" 
            value={text} 
            onChange={e => setText(e.target.value)} 
            onPressEnter={handleSubmit} 
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select 
            size="large" style={{ width: '100%' }} placeholder="Category" 
            value={category} onChange={setCategory} allowClear
            options={categories.map(c => ({ label: c, value: c }))}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DatePicker size="large" showTime placeholder="Deadline" value={deadline} onChange={setDeadline} style={{ width: '100%' }} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }} align="middle">
        <Col xs={24} md={18}>
          <TextArea placeholder="Additional note" maxLength={1000} showCount value={note} onChange={e => setNote(e.target.value)} autoSize={{ minRows: 2, maxRows: 6 }} />
        </Col>
        <Col xs={12} md={6}>
          <Flex justify='center'>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleSubmit} size="middle" block>
              Create new task
            </Button>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

export default TaskForm;