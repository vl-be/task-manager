import { Card, Row, Col, Select, DatePicker, Typography } from 'antd';

const { Text } = Typography;

const TaskFilters = ({ 
  categories, 
  filterCategory, 
  setFilterCategory, 
  filterDeadline, 
  setFilterDeadline 
}) => {
  return (
    <Card style={{ marginBottom: 24 }} size="small">
      <Row align="middle" gutter={[16, 16]}>
        <Col><Text strong>Filter:</Text></Col>
        <Col>
           <Select 
             value={filterCategory} 
             onChange={setFilterCategory} 
             style={{ width: 200 }}
             options={[{ value: 'all', label: 'All categories' }, { value: 'none', label: 'None' }, ...categories.map(category => ({ value: category, label: category }))] }
           />
        </Col>
        <Col>
          
          <DatePicker 
            showTime
            placeholder="Due Before Date"
            value={filterDeadline} 
            onChange={setFilterDeadline} 
            allowClear 
          />
        </Col>
      </Row>
    </Card>
  );
};

export default TaskFilters;