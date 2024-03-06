import { Link } from "expo-router";
import { View } from "react-native";

export default function EditProfile() {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Link
        href="../"
        style={{
          backgroundColor: "dodgerblue",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
          color: "white",
          fontSize: 12,
        }}
      >
        Save
      </Link>
    </View>
  );
}
