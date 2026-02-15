// Home Assistant Service
// Connect to your Home Assistant instance for real smart home data
// Set HA_URL and HA_TOKEN in your environment or AsyncStorage

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HA_URL_KEY = 'ha_url';
const HA_TOKEN_KEY = 'ha_token';

export interface HAConfig {
  url: string;
  token: string;
}

export interface HAEntity {
  entity_id: string;
  state: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    device_class?: string;
    icon?: string;
    [key: string]: any;
  };
  last_changed: string;
  last_updated: string;
}

export interface HASensor extends HAEntity {
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    device_class?: string;
    icon?: string;
    entity_picture?: string;
  };
}

// Get stored configuration
export const getHAConfig = async (): Promise<HAConfig | null> => {
  try {
    const url = await AsyncStorage.getItem(HA_URL_KEY);
    const token = await AsyncStorage.getItem(HA_TOKEN_KEY);
    if (url && token) {
      return { url: url.replace(/\/$/, ''), token }; // Remove trailing slash
    }
    return null;
  } catch (error) {
    console.error('Error getting HA config:', error);
    return null;
  }
};

// Save configuration
export const setHAConfig = async (url: string, token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(HA_URL_KEY, url.replace(/\/$/, ''));
    await AsyncStorage.setItem(HA_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving HA config:', error);
    throw error;
  }
};

// Clear configuration
export const clearHAConfig = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([HA_URL_KEY, HA_TOKEN_KEY]);
  } catch (error) {
    console.error('Error clearing HA config:', error);
    throw error;
  }
};

// Check if connected to Home Assistant
export const isConnectedToHA = async (): Promise<boolean> => {
  const config = await getHAConfig();
  if (!config) return false;
  
  try {
    const response = await fetch(`${config.url}/api/config`, {
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch {
    return false;
  }
};

// Fetch all entities from Home Assistant
export const fetchEntities = async (): Promise<HAEntity[]> => {
  const config = await getHAConfig();
  if (!config) throw new Error('Home Assistant not configured');

  const response = await fetch(`${config.url}/api/states`, {
    headers: {
      'Authorization': `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch entities: ${response.status}`);
  }

  return response.json();
};

// Fetch specific sensor entities
export const fetchSensors = async (): Promise<HASensor[]> => {
  const entities = await fetchEntities();
  
  // Filter for sensor entities (including climate, weather, etc.)
  return entities.filter(entity => {
    const domain = entity.entity_id.split('.')[0];
    return ['sensor', 'binary_sensor', 'climate', 'weather', 'light', 'switch', 'fan'].includes(domain);
  }) as HASensor[];
};

// Fetch entity by ID
export const fetchEntity = async (entityId: string): Promise<HAEntity> => {
  const config = await getHAConfig();
  if (!config) throw new Error('Home Assistant not configured');

  const response = await fetch(`${config.url}/api/states/${entityId}`, {
    headers: {
      'Authorization': `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch entity: ${response.status}`);
  }

  return response.json();
};

// Call a service (e.g., turn on/off lights)
export const callService = async (
  domain: string,
  service: string,
  data?: Record<string, any>
): Promise<any> => {
  const config = await getHAConfig();
  if (!config) throw new Error('Home Assistant not configured');

  const response = await fetch(`${config.url}/api/services/${domain}/${service}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data || {}),
  });

  if (!response.ok) {
    throw new Error(`Failed to call service: ${response.status}`);
  }

  return response.json();
};

// Helper to convert HA sensor to our app's format
export const convertHASensorToAppSensor = (haSensor: HASensor) => {
  const domain = haSensor.entity_id.split('.')[0];
  const unit = haSensor.attributes?.unit_of_measurement || '';
  
  // Determine sensor type based on device_class or domain
  let type: 'temperature' | 'humidity' | 'co2' | 'motion' | 'door' | 'light' = 'light';
  const deviceClass = haSensor.attributes?.device_class;
  
  if (deviceClass === 'temperature' || unit === '°F' || unit === '°C') {
    type = 'temperature';
  } else if (deviceClass === 'humidity' || unit === '%') {
    type = 'humidity';
  } else if (deviceClass === 'carbon_dioxide' || unit === 'ppm') {
    type = 'co2';
  } else if (deviceClass === 'motion' || deviceClass === 'moving') {
    type = 'motion';
  } else if (deviceClass === 'door' || deviceClass === 'opening') {
    type = 'door';
  } else if (domain === 'light' || domain === 'switch') {
    type = 'light';
  }
  
  // Determine status based on state and thresholds
  let status: 'normal' | 'warning' | 'critical' = 'normal';
  const state = parseFloat(haSensor.state);
  
  if (!isNaN(state)) {
    if (type === 'temperature' && (state > 80 || state < 60)) status = 'warning';
    if (type === 'temperature' && (state > 85 || state < 55)) status = 'critical';
    if (type === 'humidity' && (state > 60 || state < 30)) status = 'warning';
    if (type === 'humidity' && (state > 70 || state < 20)) status = 'critical';
    if (type === 'co2' && state > 1000) status = 'critical';
    if (type === 'co2' && state > 800) status = 'warning';
  }
  
  if (haSensor.state === 'unavailable' || haSensor.state === 'unknown') {
    status = 'critical';
  }
  
  return {
    id: haSensor.entity_id,
    name: haSensor.attributes?.friendly_name || haSensor.entity_id,
    type,
    value: isNaN(state) ? 0 : state,
    unit,
    room: haSensor.entity_id.split('.')[0].charAt(0).toUpperCase() + haSensor.entity_id.split('.')[0].slice(1),
    status,
    lastUpdated: new Date(haSensor.last_updated),
  };
};
