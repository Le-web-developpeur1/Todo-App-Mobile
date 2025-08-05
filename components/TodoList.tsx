import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import { Todo } from "@/app/(tabs)/index";
import TodoItem from "./TodoItem";
import TodoHistoryItem from "./TodoHistoryItem";

interface TodoListProps {
  activeTab: "encours" | "terminée" | "supprimée";
  todos: Todo[];
  history: Todo[];
  updateStatus: (id: string, status: Todo["status"]) => void;
  deleteTodo: (id: string) => void;
  restoreTodo: (id: string) => void;
  selectedFilterCategory: string;
}

export default function TodoList({
  activeTab,
  todos,
  history,
  updateStatus,
  deleteTodo,
  restoreTodo,
  selectedFilterCategory,
}: TodoListProps) {
  const isFiltering = selectedFilterCategory !== "toutes";

  const filteredTodosByStatus =
    activeTab === "encours"
      ? todos.filter(todo => todo.status === "encours")
      : activeTab === "terminée"
      ? todos.filter(todo => todo.status === "terminée")
      : [];

  const filteredTodos = isFiltering
    ? filteredTodosByStatus.filter(todo => todo.category === selectedFilterCategory)
    : filteredTodosByStatus;

  const filteredHistory = isFiltering
    ? history.filter(todo => todo.category === selectedFilterCategory)
    : history;

  return activeTab === "supprimée" ? (
    <FlatList
      data={filteredHistory}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoHistoryItem item={item} restoreTodo={restoreTodo} />
      )}
      ListEmptyComponent={<Text style={styles.emptyText}>Aucune tâche supprimée.</Text>}
    />
  ) : (
    <FlatList
      data={filteredTodos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TodoItem item={item} updateStatus={updateStatus} deleteTodo={deleteTodo} />
      )}
      ListEmptyComponent={<Text style={styles.emptyText}>Aucune tâche ici.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  emptyText: {
    textAlign: "center",
    fontStyle: "italic",
    color: "#999",
    marginBottom: 10,
  },
});
