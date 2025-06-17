/*
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [oldTodos, setOldTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("my-todo");
        if (todos !== null) {
          setTodos(JSON.parse(todos));
          setOldTodos(JSON.parse(todos));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    try {
      const newTodo = {
        id: Math.random(),
        title: todoText,
        isDone: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setOldTodos(updatedTodos);
      await AsyncStorage.setItem("my-todo", JSON.stringify(updatedTodos));
      setTodoText("");
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async (id) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (query) => {
    if (query === "") {
      setTodos(oldTodos);
    } else {
      const filteredTodos = oldTodos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filteredTodos);
    }
  };

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={"#333"} />
        <TextInput
          placeholder="Pesquisar"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          clearButtonMode="always"
        />
      </View>

      <FlatList
        data={[...todos].reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ToDoItem
            todo={item}
            deleteTodo={deleteTodo}
            handleDone={handleDone}
          />
        )}
      />

      <KeyboardAvoidingView
        style={styles.footer}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <TextInput
          placeholder="Adicionar Tarefa"
          value={todoText}
          onChangeText={setTodoText}
          style={styles.newTodoInput}
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Ionicons name="add" size={34} color={"#fff"} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ToDoItem = ({ todo, deleteTodo, handleDone }) => (
  <View style={styles.todoContainer}>
    <View style={styles.todoInfoContainer}>
      <Checkbox
        value={todo.isDone}
        onValueChange={() => handleDone(todo.id)}
        color={todo.isDone ? "#4630EB" : undefined}
      />
      <Text
        style={[
          styles.todoText,
          todo.isDone && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
    </View>
    <TouchableOpacity
      onPress={() => {
        deleteTodo(todo.id);
        alert("Deleted " + todo.id);
      }}
    >
      <Ionicons name="trash" size={24} color={"red"} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: "#f5f5f5",
    backgroundColor: "#FFFBEA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 50,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 16 : 8,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
    marginTop: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 20,
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    // backgroundColor: "#4630EB",
    backgroundColor: "#10B981",
    padding: 8,
    borderRadius: 30,
    marginLeft: 20,
  },
});
*/

//======================DIVISAAAAAAO==========================

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";
import RNPickerSelect from "react-native-picker-select";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const getTodos = async () => {
      const data = await AsyncStorage.getItem("my-todo");
      if (data) setTodos(JSON.parse(data));
    };
    getTodos();
  }, []);

  const saveTodos = async (newTodos) => {
    setTodos(newTodos);
    await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
  };

  const addOrEditTodo = async () => {
    if (!todoText.trim()) return;

    const newTodo = {
      id: editingTodo ? editingTodo.id : uuid.v4(),
      title: todoText,
      isDone: false,
      category,
      dueDate,
      createdAt: new Date().toISOString(),
    };

    let updatedTodos = [];
    if (editingTodo) {
      updatedTodos = todos.map((t) => (t.id === editingTodo.id ? newTodo : t));
    } else {
      updatedTodos = [...todos, newTodo];
    }

    await saveTodos(updatedTodos);
    setTodoText("");
    setCategory(null);
    setDueDate(null);
    setEditingTodo(null);
    Keyboard.dismiss();
  };

  const deleteTodo = (id) => {
    Alert.alert("Excluir", "Deseja excluir esta tarefa?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: async () => {
          const updated = todos.filter((t) => t.id !== id);
          await saveTodos(updated);
        },
      },
    ]);
  };

  const handleDone = async (id) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, isDone: !t.isDone } : t
    );
    await saveTodos(updated);
  };

  const filteredTodos = todos
    .filter((t) =>
      filter === "done"
        ? t.isDone
        : filter === "pending"
        ? !t.isDone
        : true
    )
    .filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchFilterRow}>
        <TextInput
          placeholder="Pesquisar"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        <RNPickerSelect
          placeholder={{ label: "Filtro", value: null }}
          onValueChange={setFilter}
          items={[
            { label: "Todos", value: "all" },
            { label: "Concluídos", value: "done" },
            { label: "Pendentes", value: "pending" },
          ]}
        />
      </View>

      <FlatList
        data={filteredTodos.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={styles.todoLeft}>
              <Checkbox value={item.isDone} onValueChange={() => handleDone(item.id)} />
              <View>
                <Text style={[styles.todoText, item.isDone && styles.todoDone]}>
                  {item.title}
                </Text>
                {item.dueDate && (
                  <Text style={styles.todoDueDate}>
                    até {new Date(item.dueDate).toLocaleDateString()}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.todoActions}>
              <TouchableOpacity onPress={() => setEditingTodo(item) || setTodoText(item.title)}>
                <Ionicons name="pencil" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
        <View style={styles.addRow}>
          <TextInput
            placeholder="Adicionar tarefa"
            value={todoText}
            onChangeText={setTodoText}
            style={styles.addInput}
          />
          <TouchableOpacity style={styles.addButton} onPress={addOrEditTodo}>
            <Ionicons name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.optionRow}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.optionText}>📅 Definir data</Text>
          </TouchableOpacity>
          <RNPickerSelect
            placeholder={{ label: "Categoria", value: null }}
            onValueChange={setCategory}
            items={[
              { label: "Trabalho", value: "trabalho" },
              { label: "Estudos", value: "estudos" },
              { label: "Pessoal", value: "pessoal" },
            ]}
          />
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate ? new Date(dueDate) : new Date()}
            mode="date"
            display="default"
            onChange={(_, date) => {
              setShowDatePicker(false);
              if (date) setDueDate(date.toISOString());
            }}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFBEA",
  },
  searchFilterRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  todoItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  todoText: {
    fontSize: 16,
  },
  todoDone: {
    textDecorationLine: "line-through",
  },
  todoDueDate: {
    fontSize: 12,
    color: "#999",
  },
  todoActions: {
    flexDirection: "row",
    gap: 10,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  addInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 30,
    marginLeft: 10,
  },
  optionRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  optionText: {
    color: "#333",
  },
});
