import { Text, View } from 'react-native';
import { firebaseApp } from '../src/config/firebase';

void firebaseApp;

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Prosper Racquet League Platform</Text>
    </View>
  );
}
