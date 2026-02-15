import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, radius, fontSize } from '../src/theme';
import { mockSensors, getStatusColor, getSensorIcon, Sensor } from '../src/data/sensors';

type FilterType = 'all' | 'temperature' | 'humidity' | 'co2' | 'motion';

export default function SensorsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sensors] = useState<Sensor[]>(mockSensors);

  const filteredSensors = filter === 'all' 
    ? sensors 
    : sensors.filter(s => s.type === filter);

  const renderSensor = ({ item }: { item: Sensor }) => (
    <TouchableOpacity 
      style={styles.sensorCard}
      onPress={() => {}}
    >
      <View style={styles.sensorLeft}>
        <View style={[styles.iconBadge, { backgroundColor: colors.brand + '15' }]}>
          <Text style={styles.sensorIcon}>{getSensorIcon(item.type)}</Text>
        </View>
        <View style={styles.sensorInfo}>
          <Text style={styles.sensorName}>{item.name}</Text>
          <Text style={styles.sensorRoom}>{item.room}</Text>
        </View>
      </View>
      <View style={styles.sensorRight}>
        <Text style={[styles.sensorValue, { color: item.status === 'critical' ? colors.destructive : colors.text }]}>
          {item.value}{item.unit}
        </Text>
        <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
      </View>
    </TouchableOpacity>
  );

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'temperature', label: 'Temp' },
    { key: 'humidity', label: 'Humidity' },
    { key: 'co2', label: 'CO₂' },
    { key: 'motion', label: 'Motion' },
  ];

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          data={filters}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                filter === item.key && styles.filterChipActive,
              ]}
              onPress={() => setFilter(item.key)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filter === item.key && styles.filterChipTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Sensor List */}
      <FlatList
        data={filteredSensors}
        keyExtractor={(item) => item.id}
        renderItem={renderSensor}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>◉</Text>
            <Text style={styles.emptyTitle}>No sensors found</Text>
            <Text style={styles.emptySubtitle}>No sensors match this filter</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterList: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.surfaceSecondary,
    marginRight: spacing.sm,
  },
  filterChipActive: {
    backgroundColor: colors.brand,
  },
  filterChipText: {
    fontSize: fontSize.caption,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: spacing.md,
  },
  sensorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sensorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sensorIcon: {
    fontSize: 20,
  },
  sensorInfo: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  sensorName: {
    fontSize: fontSize.body,
    fontWeight: '500',
    color: colors.text,
  },
  sensorRoom: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sensorRight: {
    alignItems: 'flex-end',
  },
  sensorValue: {
    fontSize: fontSize.title3,
    fontWeight: '600',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyIcon: {
    fontSize: 48,
    color: colors.textSecondary,
  },
  emptyTitle: {
    fontSize: fontSize.title3,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.md,
  },
  emptySubtitle: {
    fontSize: fontSize.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
