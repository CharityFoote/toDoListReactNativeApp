import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function App() {

  const [currentTask, setCurrentTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    if (currentTask.name) {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = currentTask;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else if (tasks.some((task) => task.name === currentTask.name)) {
        Alert.alert(
          'Rename Task',
          'You already have a task by this name, ' + currentTask.name + '. Please rename your task.',
          [{
            text: 'OK',
            style: 'cancel'
          }],
          { cancelable: false }
        )
      } else {
        setTasks([...tasks, currentTask]);
      }
      setCurrentTask({ name: "" });
    }
  };

  const handleIconClick = (index) => {
    tasks[index].clicked = !tasks[index].clicked;
    setTasks([...tasks]);
  };

  const handleDropDown = (index) => {
    tasks[index].expanded = !tasks[index].expanded;
    setTasks([...tasks]);
  };

  const handleAddNotes = (index, text) => {
    tasks[index].notes = text;
    setTasks([...tasks]);
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setCurrentTask(taskToEdit);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }) => (
    <View>
      <View style={styles.task}>
        <Feather name={item.clicked ? "check-circle" : "circle"} style={styles.icon} onPress={() => handleIconClick(index)} />
        <Text style={item.clicked ? styles.strikeThroughItem : styles.itemList}>{item.name}</Text>
        <View style={styles.taskButtons}>
          <TouchableOpacity onPress={() => handleDropDown(index)}>
            <Feather name={'plus'} style={styles.addNotesButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEditTask(index)}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteTask(index)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
      {item.expanded && (
        <View>
          <TextInput style={styles.notesBox} placeholder='Add notes' value={item.notes} onChangeText={(text) => handleAddNotes(index, text)} />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>"Find out who you are and do it on purpose." -Dolly Parton</Text>
      <Text style={styles.title}>To Do List</Text>
      <TextInput style={styles.input} placeholder='Enter Task' value={currentTask.name} onChangeText={(text) => setCurrentTask({ ...currentTask, name: text })} />
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
  icon: {
    fontSize: 19
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
  strikeThroughItem: {
    fontSize: 19,
    textDecorationLine: 'line-through'
  },
  taskButtons: {
    flexDirection: 'row'
  },
  addNotesButton: {
    marginRight: 10,
    color: '#b0ccb5',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 2
  },
  notesBox: {
    borderWidth: 2,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 14,
    marginHorizontal: 20,
    overflow: 'wrap'
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
