import React, { useState } from 'react';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useRef } from 'react';

const Todo: React.FC = () => {
  const actionRef = useRef<ActionType>();
  interface TodoType {
    id: number;
    name: string;
    task: string;
    date: string;
    status: string;
  }

  const [editFlag, setEditFlag] = useState<boolean>(false);

  const st = ['in progress', 'completed', 'blocked'];

  const data = [
    {
      id: 1,
      name: 'Parth',
      task: 'Make Slack Clone',
      date: new Date().getDate() + '/' + (new Date().getMonth() + 1),
      status: st[0],
    },
    {
      id: 2,
      name: 'Vishw',
      task: 'Make Insta Clone',
      date: new Date().getDate() + '/' + (new Date().getMonth() + 1),
      status: st[1],
    },
    {
      id: 3,
      name: 'Drij',
      task: 'Make fb clone',
      date: new Date().getDate() + '/' + (new Date().getMonth() + 1),
      status: st[2],
    },
  ];

  const [todo, setTodo] = useState<TodoType[]>(data);
  const [name, setName] = useState<string>('');
  const [task, setTask] = useState<string>('');
  const [id, setId] = useState<number>(4);
  const [store, setStore] = useState();

  const loadData = () => {
    return todo;
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    setId(id + 1);
    const newVar = {
      id,
      name,
      task,
      date: new Date().getDate() + '/' + (new Date().getMonth() + 1),
      status: st[0],
    };

    setTodo((state) => state.concat(newVar));
    actionRef.current?.reload();
  };

  const handleEdit = (valId = 0, newStatus = '', flag = 0) => {
    flag === 1
      ? todo?.filter((item) => item.id === valId).map((item) => (item.status = newStatus))
      : todo?.filter((item) => item.id === store.id).map((item) => (item.task = task));

    setEditFlag(false);
    actionRef.current?.reload();
  };

  const handleRemove = (id: number) => {
    const filterdTodo = todo?.filter((item) => item.id !== id);
    setTodo(filterdTodo);
    actionRef.current?.reload();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Task',
      dataIndex: 'task',
    },
    {
      title: 'Created At',
      dataIndex: 'date',
    },
    {
      title: 'Status',
      render: (val: any) => {
        return (
          <select
            name="status"
            id="status"
            value={val.status}
            onChange={(e) => {
              handleEdit(val.id, e.target.value, 1);
            }}
          >
            {st?.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        );
      },
    },
    {
      title: 'Remove',
      render: (val: any) => {
        return (
          <Button type="danger" onClick={() => handleRemove(val.id)}>
            Remove
          </Button>
        );
      },
    },
    {
      title: 'Edit',
      render: (val: any) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              setName(val.name);
              setTask(val.task);
              setStore(val);
              setEditFlag(true);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 1, marginRight: '1rem' }}
          placeholder="Enter your name here"
          value={name}
        />
        <input
          type="text"
          onChange={(e) => setTask(e.target.value)}
          style={{ flex: 1, marginRight: '1rem' }}
          placeholder="Enter your task here"
          value={task}
        />

        <Button type="primary" onClick={(e) => (editFlag === true ? handleEdit() : handleAdd(e))}>
          {editFlag === true ? 'Edit' : 'Add'}
        </Button>
      </div>
      <ProTable
        headerTitle="Todo List"
        rowKey="name"
        actionRef={actionRef}
        request={() => {
          return Promise.resolve({
            data: loadData(),
          });
        }}
        columns={columns}
        search={false}
      />
    </>
  );
};

export default Todo;
