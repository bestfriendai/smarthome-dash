import { colors } from '../theme';

export interface Sensor {
  id: string;
  name: string;
  type: 'temperature' | 'humidity' | 'co2' | 'motion' | 'door' | 'light';
  value: number;
  unit: string;
  room: string;
  status: 'normal' | 'warning' | 'critical';
  lastUpdated: Date;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  sensors: string[];
}

export interface SensorReading {
  sensorId: string;
  value: number;
  timestamp: Date;
}

// Mock data for demonstration
export const mockSensors: Sensor[] = [
  {
    id: 'temp-1',
    name: 'Living Room Temp',
    type: 'temperature',
    value: 72,
    unit: '°F',
    room: 'Living Room',
    status: 'normal',
    lastUpdated: new Date(),
  },
  {
    id: 'hum-1',
    name: 'Living Room Humidity',
    type: 'humidity',
    value: 45,
    unit: '%',
    room: 'Living Room',
    status: 'normal',
    lastUpdated: new Date(),
  },
  {
    id: 'co2-1',
    name: 'Office CO₂',
    type: 'co2',
    value: 650,
    unit: 'ppm',
    room: 'Office',
    status: 'normal',
    lastUpdated: new Date(),
  },
  {
    id: 'temp-2',
    name: 'Bedroom Temp',
    type: 'temperature',
    value: 68,
    unit: '°F',
    room: 'Bedroom',
    status: 'normal',
    lastUpdated: new Date(),
  },
  {
    id: 'hum-2',
    name: 'Kitchen Humidity',
    type: 'humidity',
    value: 52,
    unit: '%',
    room: 'Kitchen',
    status: 'warning',
    lastUpdated: new Date(),
  },
  {
    id: 'co2-2',
    name: 'Living Room CO₂',
    type: 'co2',
    value: 1100,
    unit: 'ppm',
    room: 'Living Room',
    status: 'critical',
    lastUpdated: new Date(),
  },
];

export const mockRooms: Room[] = [
  { id: 'living', name: 'Living Room', icon: '🛋️', sensors: ['temp-1', 'hum-1', 'co2-1'] },
  { id: 'bedroom', name: 'Bedroom', icon: '🛏️', sensors: ['temp-2'] },
  { id: 'kitchen', name: 'Kitchen', icon: '🍳', sensors: ['hum-2'] },
  { id: 'office', name: 'Office', icon: '💼', sensors: ['co2-1'] },
];

export const getStatusColor = (status: Sensor['status']): string => {
  switch (status) {
    case 'normal': return colors.success;
    case 'warning': return colors.warning;
    case 'critical': return colors.destructive;
    default: return colors.textSecondary;
  }
};

export const getSensorIcon = (type: Sensor['type']): string => {
  switch (type) {
    case 'temperature': return '🌡️';
    case 'humidity': return '💧';
    case 'co2': return '🫧';
    case 'motion': return '👁️';
    case 'door': return '🚪';
    case 'light': return '💡';
    default: return '◉';
  }
};
