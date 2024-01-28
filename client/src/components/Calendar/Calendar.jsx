import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Calendar, Button, DatePicker, List, Row, Col, Popover, Modal, Popconfirm, Form, Input, Typography, Tag } from 'antd';
import axios from 'axios';

import './calendrier.css';

const { Item } = Form;
const { Title, Text } = Typography;

const CombinedCalendar = () => {
  const [form] = Form.useForm();
  const [events, setEvents] = useState([]);
  const [userId] = useState(localStorage.getItem('userId'));
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);


const getAllEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:5625/calendar/getAllEvents/${userId}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };

  useEffect(() => {
    getAllEvents();

    // Set up an interval to refresh events every 5 minutes (adjust as needed)
    const refreshInterval = setInterval(() => {
      getAllEvents();
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup the interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [userId]);


  const handleAddEvent = async (values) => {
    try {
      await axios.post(`http://localhost:5625/calendar/addEvent/${userId}`, {
        eventName: values.eventName,
        eventDate: values.eventDate.format('YYYY-MM-DD'),
      });
      console.log('Event added successfully');
      form.resetFields();
      getAllEvents();
    } catch (error) {
      console.error('Error adding event:', error.message);
    }
  };

  const handleUpdateEvent = async (values) => {
    try {
      await axios.put(`http://localhost:5625/calendar/updateEvent/${editEventId}`, {
        eventName: values.eventName,
        eventDate: values.eventDate.format('YYYY-MM-DD'),
      });
      console.log('Event updated successfully');
      setEditModalVisible(false);
      getAllEvents();
    } catch (error) {
      console.error('Error updating event:', error.message);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:5625/calendar/deleteEvent/${editEventId}`);
      console.log('Event deleted successfully');
      setEditModalVisible(false);
      getAllEvents();
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };

   const dateCellRender = (value) => {
    const formattedDate = dayjs(value).format('YYYY-MM-DD');
    const eventsForDate = events.filter((event) => dayjs(event.EventDate).isSame(formattedDate, 'day'));

    const handleDoubleClick = (eventId) => {
      setEditEventId(eventId);
      setEditModalVisible(true);
    };

    const dayStyle = eventsForDate.length > 0 ? { backgroundColor: '#ff4d4f', color: '#fff' } : {};

    return (
      <Popover
        open={popoverVisible && dayjs(value).isSame(selectedDate, 'day')}
        content={
          <div>
            <Title level={4}>Events</Title>
            {eventsForDate.length > 0 ? (
              <List
                dataSource={eventsForDate}
                renderItem={(event) => (
                  <List.Item>
                    <Text strong>{event.EventName}</Text> - {dayjs(event.EventDate).format('YYYY-MM-DD')}
                    <Button type="primary" size="small" onClick={() => handleDoubleClick(event.EventID)}>
                      Edit
                    </Button>
                    <Popconfirm
                      title="Are you sure to delete this event?"
                      onConfirm={() => handleDeleteEvent(event.EventID)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="danger" size="small">
                        Delete
                      </Button>
                    </Popconfirm>
                  </List.Item>
                )}
              />
            ) : (
              <Text>No events</Text>
            )}
          </div>
        }
        title={`Events on ${dayjs(value).format('YYYY-MM-DD')}`}
        trigger="click"
        onOpenChange={(visible) => {
          setPopoverVisible(visible);
          setSelectedDate(dayjs(value).isSame(selectedDate, 'day') ? null : dayjs(value));
        }}
      >
        <div className="day-cell" onDoubleClick={() => handleDoubleClick()}>
          <span>{value.date()}</span>
          {eventsForDate.length > 0 && <Tag color="#ff4d4f">Events</Tag>}
        </div>
      </Popover>
    );
  };

  return (
    <Row justify="center" style={{ padding: '20px' }}>
      <Col span={12}>
        <Calendar cellRender={dateCellRender} className="custom-calendar" onPanelChange={onPanelChange} />
        <Form form={form} onFinish={handleAddEvent} style={{ marginTop: '16px' }}>
          <Row gutter={8}>
            <Col span={16}>
              <Item name="eventName" rules={[{ required: true, message: 'Event Name is required' }]}>
                <Input placeholder="Enter Event Name" />
              </Item>
            </Col>
            <Col span={6}>
              <Item name="eventDate" rules={[{ required: true, message: 'Event Date is required' }]}>
                <DatePicker style={{ width: '100%' }} placeholder="Select Event Date" />
              </Item>
            </Col>
            <Col span={2}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Col>
          </Row>
        </Form>

        <Modal
          title="Edit Event"
          open={editModalVisible}
          onCancel={() => setEditModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setEditModalVisible(false)}>
              Cancel
            </Button>,
            // <Button key="delete" type="danger" onClick={handleDeleteEvent}>
            //   Delete
            // </Button>,
            <Button key="update" type="primary" onClick={form.submit}>
              Update
            </Button>,
          ]}
        >
          <Form form={form} onFinish={handleUpdateEvent}>
            <Item name="eventName" rules={[{ required: true, message: 'Event Name is required' }]}>
              <Input placeholder="Enter Event Name" />
            </Item>
            <Item name="eventDate" rules={[{ required: true, message: 'Event Date is required' }]}>
              <DatePicker style={{ width: '100%' }} placeholder="Select Event Date" />
            </Item>
          </Form>
        </Modal>
      </Col>
    </Row>
  );
};

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

export default CombinedCalendar;


