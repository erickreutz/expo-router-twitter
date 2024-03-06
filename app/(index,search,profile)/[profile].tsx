import { Link, Stack, useLocalSearchParams } from "expo-router";
import Head from "expo-router/head";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Feed } from "@/components/feed";
import { posts, users } from "@/data";

// Run in Node.js environments at build time to generate a list of
// pages that should be statically generated.
export function generateStaticParams() {
  return users.map(({ user }) => ({ profile: user }));
}

export default function Profile() {
  const { profile } = useLocalSearchParams<{ profile: string }>();
  return <ProfileScreen profile={profile} />;
}

export function ProfileScreen({
  profile,
  canEdit = false,
}: {
  profile: string;
  canEdit?: boolean;
}) {
  const user = users.find((user) => user.user === profile);

  if (!user) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text>User not found: {profile}</Text>
      </ScrollView>
    );
  }

  return (
    <>
      <Head>
        <title>{user.name} | Profile | Expo Twitter</title>
        <meta name="description" content={user.bio} />
        <meta property="og:description" content={user.bio} />
        <meta property="og:image" content={user.image} />
      </Head>
      <Stack.Screen options={{ title: "Profile" }} />

      <Feed
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1 }}
        ListHeaderComponent={() => (
          <View
            style={{
              flex: 1,
              paddingHorizontal: 18,
              gap: 8,
              paddingTop: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: user.image }}
                style={{ width: 64, height: 64, borderRadius: 64 / 2 }}
              />
              {canEdit ? (
                <Link
                  href="/(profile)/profile/edit"
                  style={{
                    backgroundColor: "dodgerblue",
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 8,
                    color: "white",
                    fontSize: 12,
                  }}
                >
                  Edit profile
                </Link>
              ) : null}
            </View>
            <View>
              <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                {user.name}
              </Text>
              <Text style={{ fontSize: 16, opacity: 0.6 }}>@{user.user}</Text>
            </View>
            <Text style={{ fontSize: 16 }}>{user.bio}</Text>
            <Link
              style={{
                color: "dodgerblue",
              }}
              href={user.url as any}
            >
              {user.url.replace(/\/$/, "").replace(/^https?:\/\//, "")}
            </Link>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {user.followers} <Text style={{ opacity: 0.6 }}>Followers</Text>
            </Text>
          </View>
        )}
        data={posts.filter((post) => post.user.user === profile)}
      />
    </>
  );
}
