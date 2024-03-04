import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Category, Transaction} from "./types";
import {AutoSizeText, ResizeTextMode} from "react-native-auto-size-text";
import {categoryColors, categoryEmojies} from "./constant";
import {AntDesign} from "@expo/vector-icons";

interface ListItemProps extends Transaction {
  tramsaction?: Transaction;
  categoryInfo?: Category | undefined;
  deleteTransaction?(id: number): Promise<void>;
}

export const ListItem: React.FC<ListItemProps> = ({
  amount,
  date,
  description,
  id,
  type,
  categoryInfo,
  deleteTransaction,
}) => {
  const iconName = type === "Expense" ? "minuscircle" : "pluscircle";
  const color = type === "Expense" ? "red" : "green";
  const categoryColor = categoryColors[categoryInfo?.name ?? "Default"];
  const emoji = categoryEmojies[categoryInfo?.name ?? "Default"];

  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
  };

  return (
    <View
      style={{
        paddingLeft: 15,
        paddingTop: 30,
        borderRadius: 15,
        backgroundColor: "white",
        elevation: 8,
        shadowColor: "#000",
        shadowRadius: 8,
        shadowOffset: {height: 6, width: 0},
        shadowOpacity: 0.15,
      }}
    >
      <View style={{width: "80%", gap: 3}}>
        <Amount amount={amount} color={color} iconName={iconName} key={id} />
        <CategoryItem
          categoryColor={categoryColor}
          categoryInfo={categoryInfo}
          emoji={emoji}
        />
      </View>
      <TransactionInfo date={date} description={description} id={id} />
      <AntDesign
        name="minuscircle"
        size={35}
        color="red"
        onPress={() => handleDelete(id)}
        style={{position: "absolute", left: 340, top: 50}}
      />
    </View>
  );
};

const TransactionInfo = ({
  id,
  date,
  description,
}: {
  id: number;
  date: number;
  description: string;
}) => {
  return (
    <View style={{flexGrow: 1, gap: 6, flexShrink: 1}}>
      <Text style={{fontSize: 16, fontWeight: "bold"}}>{description}</Text>
      <Text>Номер транзакции {id}</Text>
      <Text style={{fontSize: 12, color: "gray"}}>
        {new Date(date * 1000).toLocaleString("ru", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        })}
      </Text>
    </View>
  );
};

const CategoryItem = ({
  categoryColor,
  categoryInfo,
  emoji,
}: {
  categoryColor: string;
  categoryInfo: Category | undefined;
  emoji: string;
}) => {
  return (
    <View
      style={[
        styles.categoryContainer,
        {backgroundColor: categoryColor + "40"},
      ]}
    >
      <Text style={styles.categoryText}>
        {emoji} {categoryInfo?.name}
      </Text>
    </View>
  );
};

export type AmountType = {
  iconName: "minuscircle" | "pluscircle";
  color: string;
  amount: number;
};

const Amount: React.FC<AmountType> = ({iconName, color, amount}) => {
  return (
    <View style={styles.row}>
      <AntDesign name={iconName} size={18} color={color} />
      <AutoSizeText
        fontSize={32}
        mode={ResizeTextMode.max_lines}
        numberOfLines={1}
        style={[styles.amount, {maxWidth: "80%"}]}
      >
        ${amount}
      </AutoSizeText>
    </View>
  );
};

const styles = StyleSheet.create({
  amount: {
    fontSize: 32,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
  },
});
