import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

interface TodoTabsProps {
  activeTab: "encours" | "terminée" | "supprimée";
  setActiveTab: (tab: "encours" | "terminée" | "supprimée") => void;
}

export default function TodoTabs({ activeTab, setActiveTab }: TodoTabsProps) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabBtn, activeTab === "encours" && styles.activeTab]}
        onPress={() => setActiveTab("encours")}
      >
        <Text style={styles.tabText}>⌛ En cours</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabBtn, activeTab === "terminée" && styles.activeTab]}
        onPress={() => setActiveTab("terminée")}
      >
        <Text style={styles.tabText}>✅ Terminée</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabBtn, activeTab === "supprimée" && styles.activeTab]}
        onPress={() => setActiveTab("supprimée")}
      >
        <Text style={styles.tabText}>❌ Supprimées</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#e6e6e6",
    marginHorizontal: 8,
  },
  activeTab: {
    backgroundColor: "#4682B4",
  },
  tabText: {
    fontWeight: "600",
    color: "#fff",
  },
});
