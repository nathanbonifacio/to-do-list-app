import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
  StyleSheet,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [tagText, setTagText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [category, setCategory] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [editingTodo, setEditingTodo] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
      tag: tagText,
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
    setTagText("");
    setCategory(null);
    setDueDate(null);
    setEditingTodo(null);
    setModalVisible(false);
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

  const openEditModal = (item) => {
    setEditingTodo(item);
    setTodoText(item.title);
    setDueDate(item.dueDate);
    setTagText(item.tag || "");
    setModalVisible(true);
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
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.tag && t.tag.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (t.dueDate && new Date(t.dueDate).toLocaleDateString().includes(searchQuery))
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
                {item.tag && (
                  <View style={styles.tagContainer}>
                    {item.tag.split(',').map((tag, index) => (
                      <View key={index} style={[styles.tagView]}>
                        <Text style={styles.todoTag}>{tag.trim()}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
            <View style={styles.todoActions}>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <Ionicons name="pencil" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addTaskButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addTaskButtonText}>Adicionar Tarefa</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            placeholder="Digite a tarefa"
            value={todoText}
            onChangeText={setTodoText}
            style={styles.modalInput}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.optionText}>📅 Definir data</Text>
          </TouchableOpacity>
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
          <TextInput
            placeholder="Digite a tag (opcional)"
            value={tagText}
            onChangeText={setTagText}
            style={styles.modalInput}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={addOrEditTodo}>
              <Text style={styles.modalButtonText}>{editingTodo ? "Salvar" : "Adicionar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginTop: 30,
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
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  tagView: {
    borderRadius: 20,
    backgroundColor: '#C0C9EE',
    padding: 5,
    marginRight: 5,
  },
  todoTag: {
    fontSize: 12,
    color: "black",
  },
  todoActions: {
    flexDirection: "row",
    gap: 10,
  },
  addTaskButton: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 40,
    alignItems: "center",
  },
  addTaskButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalInput: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  modalButton: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
  },
  optionText: {
    color: "#333",
    marginBottom: 10,
  },
});
