// Smart Home Data Service
// Provides unified interface for both mock data and Home Assistant real data

import { Sensor, Room, mockSensors as defaultMockSensors, mockRooms as defaultMockRooms, SensorReading } from '../data/sensors';
import * as HA from './homeAssistant';

export type DataSource = 'mock' | 'homeassistant';

let currentDataSource: DataSource = 'mock';

// Get current data source
export const getDataSource = (): DataSource => currentDataSource;

// Set data source
export const setDataSource = (source: DataSource): void => {
  currentDataSource = source;
};

// Get all sensors (from mock or Home Assistant)
export const getSensors = async (): Promise<Sensor[]> => {
  if (currentDataSource === 'homeassistant') {
    try {
      const haSensors = await HA.fetchSensors();
      return haSensors.map(HA.convertHASensorToAppSensor);
    } catch (error) {
      console.warn('Failed to fetch from Home Assistant, falling back to mock:', error);
      return defaultMockSensors;
    }
  }
  return defaultMockSensors;
};

// Get all rooms (from mock or Home Assistant)
export const getRooms = async (): Promise<Room[]> => {
  if (currentDataSource === 'homeassistant') {
    // Group sensors by domain/area for Home Assistant
    try {
      const haSensors = await HA.fetchSensors();
      const roomMap = new Map<string, string[]>();
      
      haSensors.forEach(sensor => {
        const domain = sensor.entity_id.split('.')[0];
        if (!roomMap.has(domain)) {
          roomMap.set(domain, []);
        }
        roomMap.get(domain)!.push(sensor.entity_id);
      });
      
      return Array.from(roomMap.entries()).map(([domain, sensors], index) => ({
        id: domain,
        name: domain.charAt(0).toUpperCase() + domain.slice(1),
        icon: getIconForDomain(domain),
        sensors,
      }));
    } catch (error) {
      console.warn('Failed to fetch rooms from Home Assistant, falling back to mock:', error);
      return defaultMockRooms;
    }
  }
  return defaultMockRooms;
};

// Helper to get icon for Home Assistant domain
const getIconForDomain = (domain: string): string => {
  const icons: Record<string, string> = {
    sensor: '📊',
    binary_sensor: '◉',
    climate: '🌡️',
    weather: '🌤️',
    light: '💡',
    switch: '🔌',
    fan: '💨',
    cover: '🪟',
    lock: '🔒',
    camera: '📷',
  };
  return icons[domain] || '🏠';
};

// Get sensor history (for future charts)
export const getSensorHistory = async (sensorId: string, hours: number = 24): Promise<SensorReading[]> => {
  // This would require HA history API - placeholder for now
  if (currentDataSource === 'homeassistant') {
    console.warn('History not yet implemented for Home Assistant');
  }
  return [];
};

// Call Home Assistant service (e.g., turn on light)
export const controlDevice = async (
  entityId: string,
  action: 'on' | 'off' | 'toggle'
): Promise<void> => {
  if (currentDataSource !== 'homeassistant') {
    throw new Error('Device control requires Home Assistant data source');
  }
  
  const domain = entityId.split('.')[0];
  let service: string = action;
  
  if (action === 'toggle') {
    service = 'toggle';
  } else if (domain === 'light' || domain === 'switch') {
    service = action === 'on' ? 'turn_on' : 'turn_off';
  } else if (domain === 'fan') {
    service = action === 'on' ? 'turn_on' : 'turn_off';
  } else if (domain === 'climate') {
    service = action === 'on' ? 'turn_on' : 'turn_off';
  }
  
  await HA.callService(domain, service, { entity_id: entityId });
};

// Check if Home Assistant is available
export const isHAConnected = async (): Promise<boolean> => {
  return HA.isConnectedToHA();
};

// Configure Home Assistant
export const configureHA = async (url: string, token: string): Promise<void> => {
  await HA.setHAConfig(url, token);
  const connected = await HA.isConnectedToHA();
  if (!connected) {
    throw new Error('Could not connect to Home Assistant with provided credentials');
  }
  setDataSource('homeassistant');
};

// Disconnect from Home Assistant
export const disconnectHA = async (): Promise<void> => {
  await HA.clearHAConfig();
  setDataSource('mock');
};
