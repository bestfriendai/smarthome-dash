import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, radius, fontSize } from '../src/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleRestorePurchases = () => {
    Alert.alert('Restore Purchases', 'Checking for previous purchases...');
  };

  const handleDeleteData = () => {
    Alert.alert(
      'Delete All Data',
      'This will remove all sensor data and settings. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>PREFERENCES</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Push Notifications</Text>
              <Text style={styles.rowSubtitle}>Get alerts for sensor warnings</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.brand }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Dark Mode</Text>
              <Text style={styles.rowSubtitle}>Use dark theme</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: colors.border, true: colors.brand }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>SUBSCRIPTION</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={() => router.push('/paywall')}>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Premium</Text>
              <Text style={styles.rowSubtitle}>Unlock unlimited sensors</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.row} onPress={handleRestorePurchases}>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Restore Purchases</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>DATA</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row} onPress={handleDeleteData}>
            <View style={styles.rowContent}>
              <Text style={[styles.rowTitle, { color: colors.destructive }]}>Delete All Data</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>ABOUT</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Privacy Policy</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Terms of Service</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.row}>
            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>Open Source Licenses</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>SmartHome Dash</Text>
        <Text style={styles.buildNumber}>Version 1.0.0 (1)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginLeft: spacing.md,
    marginBottom: spacing.sm,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 44,
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: fontSize.body,
    color: colors.text,
  },
  rowSubtitle: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: spacing.md,
  },
  chevron: {
    fontSize: 20,
    color: colors.textSecondary,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  version: {
    fontSize: fontSize.body,
    color: colors.text,
    fontWeight: '500',
  },
  buildNumber: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
