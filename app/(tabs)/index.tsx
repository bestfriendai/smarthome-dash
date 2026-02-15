import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, fontSize } from '../../src/theme';
import { mockSensors, mockRooms, getStatusColor, getSensorIcon, Sensor } from '../../src/data/sensors';

export default function DashboardScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [sensors] = useState<Sensor[]>(mockSensors);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const criticalSensors = sensors.filter(s => s.status === 'critical');
  const warningSensors = sensors.filter(s => s.status === 'warning');
  const normalSensors = sensors.filter(s => s.status === 'normal');

  const avgTemp = sensors
    .filter(s => s.type === 'temperature')
    .reduce((acc, s) => acc + s.value, 0) / sensors.filter(s => s.type === 'temperature').length || 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.brand} />}
    >
      {/* Status Overview */}
      <View style={styles.statusRow}>
        <View style={[styles.statusCard, { backgroundColor: colors.destructive + '15' }]}>
          <Text style={[styles.statusNumber, { color: colors.destructive }]}>{criticalSensors.length}</Text>
          <Text style={styles.statusLabel}>Critical</Text>
        </View>
        <View style={[styles.statusCard, { backgroundColor: colors.warning + '15' }]}>
          <Text style={[styles.statusNumber, { color: colors.warning }]}>{warningSensors.length}</Text>
          <Text style={styles.statusLabel}>Warning</Text>
        </View>
        <View style={[styles.statusCard, { backgroundColor: colors.success + '15' }]}>
          <Text style={[styles.statusNumber, { color: colors.success }]}>{normalSensors.length}</Text>
          <Text style={styles.statusLabel}>Normal</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{Math.round(avgTemp)}°</Text>
            <Text style={styles.statLabel}>Avg Temp</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{sensors.length}</Text>
            <Text style={styles.statLabel}>Total Sensors</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{mockRooms.length}</Text>
            <Text style={styles.statLabel}>Rooms</Text>
          </View>
        </View>
      </View>

      {/* Alerts Section */}
      {(criticalSensors.length > 0 || warningSensors.length > 0) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alerts</Text>
          {(criticalSensors.length > 0 && (
            <View style={styles.alertCard}>
              <View style={styles.alertHeader}>
                <Text style={styles.alertIcon}>⚠️</Text>
                <Text style={[styles.alertTitle, { color: colors.destructive }]}>
                  {criticalSensors.length} Critical {criticalSensors.length === 1 ? 'Alert' : 'Alerts'}
                </Text>
              </View>
              {criticalSensors.map(sensor => (
                <TouchableOpacity 
                  key={sensor.id} 
                  style={styles.alertItem}
                  onPress={() => router.push('/sensors')}
                >
                  <Text style={styles.alertSensorIcon}>{getSensorIcon(sensor.type)}</Text>
                  <View style={styles.alertItemContent}>
                    <Text style={styles.alertSensorName}>{sensor.name}</Text>
                    <Text style={styles.alertSensorValue}>
                      {sensor.value}{sensor.unit} • {sensor.room}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          {warningSensors.length > 0 && (
            <View style={[styles.alertCard, { borderColor: colors.warning }]}>
              <View style={styles.alertHeader}>
                <Text style={styles.alertIcon}>🔔</Text>
                <Text style={[styles.alertTitle, { color: colors.warning }]}>
                  {warningSensors.length} Warning {warningSensors.length === 1 ? 'Alert' : 'Alerts'}
                </Text>
              </View>
              {warningSensors.map(sensor => (
                <TouchableOpacity 
                  key={sensor.id} 
                  style={styles.alertItem}
                  onPress={() => router.push('/sensors')}
                >
                  <Text style={styles.alertSensorIcon}>{getSensorIcon(sensor.type)}</Text>
                  <View style={styles.alertItemContent}>
                    <Text style={styles.alertSensorName}>{sensor.name}</Text>
                    <Text style={styles.alertSensorValue}>
                      {sensor.value}{sensor.unit} • {sensor.room}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Quick Access */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => router.push('/sensors')}
        >
          <Text style={styles.quickActionIcon}>◉</Text>
          <View style={styles.quickActionContent}>
            <Text style={styles.quickActionTitle}>All Sensors</Text>
            <Text style={styles.quickActionSubtitle}>View all {sensors.length} sensors</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.quickActionCard}
          onPress={() => router.push('/rooms')}
        >
          <Text style={styles.quickActionIcon}>▦</Text>
          <View style={styles.quickActionContent}>
            <Text style={styles.quickActionTitle}>Rooms</Text>
            <Text style={styles.quickActionSubtitle}>Browse by room</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  statusRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statusCard: {
    flex: 1,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  statusNumber: {
    fontSize: 28,
    fontWeight: '700',
  },
  statusLabel: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.title3,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  alertCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.destructive,
    overflow: 'hidden',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  alertIcon: {
    fontSize: 18,
  },
  alertTitle: {
    fontSize: fontSize.body,
    fontWeight: '600',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  alertSensorIcon: {
    fontSize: 20,
  },
  alertItemContent: {
    flex: 1,
  },
  alertSensorName: {
    fontSize: fontSize.body,
    color: colors.text,
    fontWeight: '500',
  },
  alertSensorValue: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  quickActionIcon: {
    fontSize: 24,
    color: colors.brand,
  },
  quickActionContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  quickActionTitle: {
    fontSize: fontSize.body,
    fontWeight: '500',
    color: colors.text,
  },
  quickActionSubtitle: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: colors.textSecondary,
  },
});
