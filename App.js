import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
//https://www.freepik.com/search?format=search&last_filter=type&last_value=icon&query=vintage+hand+drawn+icons&type=icon

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    if (task) {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, task]);
      }
      setTask('');
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <Feather name="check-circle" color="black" />
      <Text style={styles.itemList}>{item}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>"Find out who you are and do it on purpose." -Dolly Parton</Text>
      <Text style={styles.title}>To Do List</Text>
      <TextInput style={styles.input} placeholder='Enter Task' value={task} onChangeText={(text) => setTask(text)} />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>{editIndex !== -1 ? 'Update Task' : 'Add Task'}</Text>
      </TouchableOpacity>
      <FlatList data={tasks} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fffcf5',
    flex: 1,
    padding: 40,
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7,
    color: '#98AEE5'
  },
  input: {
    borderWidth: 3,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18
  },
  addButton: {
    backgroundColor: '#98AEE5',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    fontSize: 18
  },
  itemList: {
    fontSize: 19
  },
  taskButtons: {
    flexDirection: 'row'
  },
  editButton: {
    marginRight: 10,
    color: '#b0ccb5',
    fontWeight: 'bold',
    fontSize: 18
  },
  deleteButton: {
    color: '#aaa8a3',
    fontWeight: 'bold',
    fontSize: 18
  }
});
