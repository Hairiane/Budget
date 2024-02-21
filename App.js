import React from "react";
import {StatusBar} from "expo-status-bar";
import {SQLiteProvider} from "expo-sqlite/next";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ViewComponent,
} from "react-native";
import {Home} from "./components/Home";
import {Asset} from "expo-asset";
import * as FileSystem from "expo-file-system";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const loadDatabase = async () => {
  const dbName = "mySQLiteDB.db";
  const dbAsset = require("./assets/mySQLiteDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}/SQLite${dbName}`;
  console.log(dbFilePath, dbUri);
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      {
        intermediates: true,
      },
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
  console.log(fileInfo);
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
          <SQLiteProvider databaseName="mySQLiteDB.db" useSuspense>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerTitle: "Распределение бюджета",
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

export default App;
