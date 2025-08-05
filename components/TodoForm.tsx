import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { showToast } from "../utils/feedback"; 

interface TodoFormProps {
  task: string;
  selectedCategory: string;
  onChangeText: (text: string) => void;
  onCategoryChange: (category: string) => void;
  onAdd: () => void;
}

export default function TodoForm({
  task,
  selectedCategory,
  onChangeText,
  onCategoryChange,
  onAdd,
}: TodoFormProps) {
  const handleAddPress = () => {
    if (task.trim() === "") {
      showToast("La tâche ne peut pas être vide 😅");
      return;
    }

    onAdd();
    showToast("Tâche ajoutée avec succès 🙌");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Ajouter une tâche"
        value={task}
        onChangeText={onChangeText}
        placeholderTextColor="#888"
      />

      <Picker
        selectedValue={selectedCategory}
        onValueChange={onCategoryChange}
        style={styles.picker}
      >
        <Picker.Item label="🚨 Urgente" value="urgente" />
        <Picker.Item label="🏠 Personnelle" value="personnelle" />
        <Picker.Item label="💼 Travail" value="travail" />
        <Picker.Item label="📚 Révision" value="révision" />
      </Picker>

      <TouchableOpacity style={styles.addBtn} onPress={handleAddPress}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Ajouter</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderColor: "#4682B4",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    height: 50,
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#4682B4",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
});
