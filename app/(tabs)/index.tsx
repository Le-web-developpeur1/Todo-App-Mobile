import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header";
import TodoForm from "@/components/TodoForm";
import TodoTabs from "@/components/TodoTabs";
import TodoList from "@/components/TodoList";
import CategoryFilter from "@/components/CategoryFilter";
import Footer from "@/components/Footer";

export interface Todo {
  id: string;
  text: string;
  timestamp: string;
  status: "encours" | "terminée";
  category: "urgente" | "personnelle" | "travail" | "révision";
}

export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [history, setHistory] = useState<Todo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Todo["category"]>("personnelle");
  const [activeTab, setActiveTab] = useState<"encours" | "terminée" | "supprimée">("encours");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("toutes");


  // ✅ Chargement initial depuis AsyncStorage
  useEffect(() => {
    const loadData = async () => {
      const storedTodos = await AsyncStorage.getItem("todos");
      const storedHistory = await AsyncStorage.getItem("history");
      if (storedTodos) setTodos(JSON.parse(storedTodos));
      if (storedHistory) setHistory(JSON.parse(storedHistory));
    };
    loadData();
  }, []);

  // 💾 Sauvegarde automatique
  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    AsyncStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // ➕ Ajouter une tâche
  const addTodo = () => {
    if (task.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: task,
        timestamp: new Date().toLocaleString(),
        status: "encours",
        category: selectedCategory,
      };
      setTodos([...todos, newTodo]);
      setTask("");
      setSelectedCategory("personnelle");
    }
  };

  // ✅ Changer le statut
  const updateStatus = (id: string, newStatus: Todo["status"]) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  // 🗑 Supprimer une tâche
  const deleteTodo = (id: string) => {
    const removed = todos.find(todo => todo.id === id);
    if (removed) setHistory([...history, removed]);
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // 🔁 Restaurer une tâche
  const restoreTodo = (id: string) => {
    const toRestore = history.find(todo => todo.id === id);
    if (toRestore) {
      setTodos([...todos, { ...toRestore, status: "encours" }]);
      setHistory(prev => prev.filter(todo => todo.id !== id));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />

      <TodoForm
        task={task}
        selectedCategory={selectedCategory}
        onChangeText={setTask}
        onCategoryChange={setSelectedCategory}
        onAdd={addTodo}
      />

      <TodoTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <CategoryFilter
        selected={selectedFilterCategory}
        onSelect={setSelectedFilterCategory}
      />

      <TodoList
        activeTab={activeTab}
        todos={todos}
        history={history}
        updateStatus={updateStatus}
        deleteTodo={deleteTodo}
        restoreTodo={restoreTodo}
        selectedFilterCategory={selectedFilterCategory}
      />
       <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop:11,
    backgroundColor: "#f0f8ff",
  },
});
