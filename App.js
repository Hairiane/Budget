import React from "react";
import {StatusBar} from "expo-status-bar";
import {SQLiteProvider} from "expo-sqlite/next";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {Home} from "./components/Home";
import {Asset} from "expo-asset";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";

const Stack = createNativeStackNavigator();

const loadDatabase = async () => {
  const dbName = "newDB.db";
  const dbAsset = require("./assets/newDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      {
        intermediates: true,
      },
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export const App = () => {
  const [dbLoaded, setDbLoaded] = React.useState(false);
  React.useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch(e => console.error(e));
  }, []);

  if (!dbLoaded)
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator size={"large"} />
        <Text>Loading Database...</Text>
      </View>
    );

  return (
    <>
      <NavigationContainer>
        <React.Suspense
          fallback={
            <View style={{flex: 1}}>
              <ActivityIndicator size={"large"} />
              <Text>Loading Database...</Text>
            </View>
          }
        >
          <SQLiteProvider databaseName="newDB.db" useSuspense>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerTitle: "Ваш бюджет",
                  headerLargeTitle: true,
                }}
              />
            </Stack.Navigator>
          </SQLiteProvider>
        </React.Suspense>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
