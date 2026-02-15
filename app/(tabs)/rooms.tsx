import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, fontSize } from '../../src/theme';
import { mockRooms, mockSensors, getSensorIcon, Room, Sensor } from '../../src/data/sensors';

export default function RoomsScreen() {
  const [rooms] = useState<Room[]>(mockRooms);

  const getRoomSensors = (room: Room): Sensor[] => {
    return mockSensors.filter(s => room.sensors.includes(s.id));
  };

  const getRoomStats = (room: Room) => {
    const roomSensors = getRoomSensors(room);
    const temp = roomSensors.find(s => s.type === 'temperature');
    const hum = roomSensors.find(s => s.type === 'humidity');
    const co2 = roomSensors.find(s => s.type === 'co2');
    return { temp, hum, co2, count: roomSensors.length };
  };

  const renderRoom = ({ item }: { item: Room }) => {
    const stats = getRoomStats(item);
    
    return (
      <TouchableOpacity style={styles.roomCard}>
        <View style={styles.roomHeader}>
          <Text style={styles.roomIcon}>{item.icon}</Text>
          <View style={styles.roomInfo}>
            <Text style={styles.roomName}>{item.name}</Text>
            <Text style={styles.roomSensorCount}>{stats.count} sensors</Text>
          </View>
        </View>
        
        <View style={styles.roomStats}>
          {stats.temp && (
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🌡️</Text>
              <Text style={styles.statValue}>{stats.temp.value}°F</Text>
            </View>
          )}
          {stats.hum && (
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>💧</Text>
              <Text style={styles.statValue}>{stats.hum.value}%</Text>
            </View>
          )}
          {stats.co2 && (
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>🫧</Text>
              <Text style={styles.statValue}>{stats.co2.value}</Text>
            </View>
          )}
        </View>

        <View style={styles.sensorList}>
          {getRoomSensors(item).map(sensor => (
            <View key={sensor.id} style={styles.sensorPill}>
              <Text style={styles.sensorPillIcon}>{getSensorIcon(sensor.type)}</Text>
              <Text style={styles.sensorPillText}>{sensor.name.split(' ')[0]}</Text>
            </View>
          ))}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        renderItem={renderRoom}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏠</Text>
            <Text style={styles.emptyTitle}>No rooms yet</Text>
            <Text style={styles.emptySubtitle}>Add your first room to get started</Text>
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
  listContent: {
    padding: spacing.md,
  },
  roomCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  roomIcon: {
    fontSize: 32,
  },
  roomInfo: {
    marginLeft: spacing.sm,
  },
  roomName: {
    fontSize: fontSize.title3,
    fontWeight: '600',
    color: colors.text,
  },
  roomSensorCount: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  roomStats: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statIcon: {
    fontSize: 14,
  },
  statValue: {
    fontSize: fontSize.body,
    fontWeight: '600',
    color: colors.text,
  },
  sensorList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  sensorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    gap: 4,
  },
  sensorPillIcon: {
    fontSize: 12,
  },
  sensorPillText: {
    fontSize: fontSize.caption,
    color: colors.textSecondary,
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
