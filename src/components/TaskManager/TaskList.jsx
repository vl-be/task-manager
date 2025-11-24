import { Row, Col, Flex, Typography, Badge, Collapse, Empty, Space, Checkbox, Tag, Button, Divider } from 'antd';
import { DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const getCategoryColor = (category) => {
    const colors = { 'Work': 'blue', 'Education': 'cyan', 'Health': 'green', 'Other': 'default' };
    return colors[category] || 'geekblue';
};

const formatDisplayDate = (d) => d ? dayjs(d).format('D MMM HH:mm') : '';

const TaskColumn = ({ title, status, tasks, bg, onToggle, onDelete }) => {
  
  const getItems = (taskList) => taskList.map(task => ({
    key: task.id,
    label: (
      <Flex justify="space-between" align="center" style={{ width: '100%' }}>
        <Space onClick={(e) => e.stopPropagation()}>
            <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
            <Text delete={task.completed} type={task.completed ? 'secondary' : ''} strong>
                {task.text}
            </Text>
        </Space>
        {task.category && <Tag color={getCategoryColor(task.category)}>{task.category}</Tag>}
      </Flex>
    ),
    children: (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
                <Tag>Created: {formatDisplayDate(task.createdAt)}</Tag>
                {task.deadline && <Tag color="red">Deadline: {formatDisplayDate(task.deadline)}</Tag>}
            </Space>
            {task.note && (
                <>
                    <Divider style={{ margin: '8px 0' }} dashed />
                    <Space align="start">
                        <FileTextOutlined style={{ color: '#888', marginTop: 4 }} />
                        <Paragraph style={{ margin: 0, color: '#678' }}>{task.note}</Paragraph>
                    </Space>
                </>
            )}
        </Space>
    ),
    extra: (
        <Button 
            type="text" danger icon={<DeleteOutlined />} 
            onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} 
        />
    )
  }));

  return (
    <Col xs={24} lg={12}>
        <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
            <Title level={4} style={{ margin: 0 }}>{title}</Title>
            <Badge count={tasks.length} style={{ backgroundColor: status === 'success' ? 'var(--custom-success-color)' :'var(--custom-processing-color)' }} />
        </Flex>
        <div style={{ background: bg, padding: 16, borderRadius: 12, minHeight: 300 }}>
            {tasks.length > 0 ? (
                <Collapse ghost items={getItems(tasks)} expandIconPosition="end" />
            ) : (
                <Empty description="Empty" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </div>
    </Col>
  );
};

const TaskList = ({ activeTasks, completedTasks, onToggle, onDelete }) => {
  return (
    <Row gutter={24}>
      <TaskColumn 
        title="Active" 
        status="processing" 
        tasks={activeTasks} 
        bg="var(--white)" 
        onToggle={onToggle} 
        onDelete={onDelete} 
      />
      
      <TaskColumn 
        title="Complete" 
        status="success" 
        tasks={completedTasks} 
        bg="#f9f9f9" 
        onToggle={onToggle} 
        onDelete={onDelete} 
      />
    </Row>
  );
};

export default TaskList;