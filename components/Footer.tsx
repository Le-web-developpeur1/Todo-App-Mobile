import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <View style={styles.footer}>
            <Text style={styles.text}>Bouba Car | Tous droits réservés &copy; {currentYear}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
      marginTop: 5,
      padding: 5,
      backgroundColor: '#eee',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 1,
      borderTopColor: '#ccc'
    },
    text: {
      fontSize: 12,
      color: '#444',
    },
  });
  
  export default Footer;