export type Passenger = {
  id: string;
  name: string;
  avatar: string;
  pickupAddress: string;
  dropoffAddress: string;
  scheduledAt: string;
  emergencyContact: { name: string; phone: string };
  wheelchair?: boolean;
  medicalNotes?: string;
  specialRequirements?: string;
};

export type Stop = {
  id: string;
  kind: 'pickup' | 'dropoff' | 'final';
  passengerId?: string;
  address: string;
  scheduledAt: string;
  label?: string;
};

export type ChecklistDef = { id: string; label: string; critical: boolean };

export type DayNoteStage = 'post-inspection' | 'mid-route' | 'post-route';
export type DayNote = {
  id: string;
  stage: DayNoteStage;
  text: string;
  time: string;
};

export type IncidentCategory =
  | 'breakdown'
  | 'passenger'
  | 'traffic'
  | 'accident'
  | 'medical'
  | 'other';

export type Incident = {
  id: string;
  category: IncidentCategory;
  notes: string;
  reportedAt: string;
};

export type ChatMessage = {
  id: string;
  from: 'driver' | 'dispatcher';
  text: string;
  time: string;
};

export const DRIVER = {
  id: 'SVS-2041',
  name: 'Dora Fenwick',
  email: 'dora.fenwick@svs.co',
  avatar: 'https://i.pravatar.cc/160?img=47',
  vehicle: 'MA21 KLP',
  shift: '08:00 – 17:00',
  rating: 4.9,
  trips: 1284,
  compliance: 92
};

export const ROUTE = {
  id: 'RT-104',
  name: 'Sunrise Care Home loop',
  destination: 'Sunrise Care Home',
  destinationAddress: '142 Hillcrest Lane, Bristol',
  startTime: '08:15',
  totalDistanceKm: 18,
  totalDurationLabel: '4h 30m',
  vehicleCapacity: 12
};

export const PASSENGERS: Passenger[] = [
  {
    id: 'pax-1',
    name: 'John Smith',
    avatar: 'https://i.pravatar.cc/120?img=12',
    pickupAddress: '24 Green Street',
    dropoffAddress: 'Sunrise Care Home',
    scheduledAt: '08:15 AM',
    emergencyContact: { name: 'Mary Smith', phone: '+44 7700 900812' }
  },
  {
    id: 'pax-2',
    name: 'Sarah Jones',
    avatar: 'https://i.pravatar.cc/120?img=45',
    pickupAddress: '17 Oak Avenue',
    dropoffAddress: 'Sunrise Care Home',
    scheduledAt: '08:27 AM',
    emergencyContact: { name: 'Daniel Jones', phone: '+44 7700 900113' },
    wheelchair: true,
    specialRequirements:
      'Wheelchair access required. Assist with ramp deployment. Allow extra boarding time.',
    medicalNotes: 'Mild mobility impairment. No known allergies. Carries personal inhaler.'
  },
  {
    id: 'pax-3',
    name: 'Michael Brown',
    avatar: 'https://i.pravatar.cc/120?img=33',
    pickupAddress: '42 Elm Close',
    dropoffAddress: 'Sunrise Care Home',
    scheduledAt: '08:40 AM',
    emergencyContact: { name: 'Helen Brown', phone: '+44 7700 900471' }
  },
  {
    id: 'pax-4',
    name: 'Linda Carter',
    avatar: 'https://i.pravatar.cc/120?img=20',
    pickupAddress: '6 Birch Way',
    dropoffAddress: 'Sunrise Care Home',
    scheduledAt: '08:55 AM',
    emergencyContact: { name: 'Paul Carter', phone: '+44 7700 900324' }
  },
  {
    id: 'pax-5',
    name: 'Robert King',
    avatar: 'https://i.pravatar.cc/120?img=53',
    pickupAddress: '88 Maple Road',
    dropoffAddress: 'Sunrise Care Home',
    scheduledAt: '09:08 AM',
    emergencyContact: { name: 'Anne King', phone: '+44 7700 900908' }
  },
  {
    id: 'pax-6',
    name: 'Patricia Hill',
    avatar: 'https://i.pravatar.cc/120?img=29',
    pickupAddress: '12 Cedar Lane',
    dropoffAddress: 'Sunrise Care Home',
    scheduledAt: '09:18 AM',
    emergencyContact: { name: 'James Hill', phone: '+44 7700 900662' }
  }
];

export const STOPS: Stop[] = [
  { id: 'stop-1', kind: 'pickup', passengerId: 'pax-1', address: '24 Green Street', scheduledAt: '08:15' },
  { id: 'stop-2', kind: 'pickup', passengerId: 'pax-2', address: '17 Oak Avenue', scheduledAt: '08:27' },
  { id: 'stop-3', kind: 'pickup', passengerId: 'pax-3', address: '42 Elm Close', scheduledAt: '08:40' },
  { id: 'stop-4', kind: 'pickup', passengerId: 'pax-4', address: '6 Birch Way', scheduledAt: '08:55' },
  { id: 'stop-5', kind: 'pickup', passengerId: 'pax-5', address: '88 Maple Road', scheduledAt: '09:08' },
  { id: 'stop-6', kind: 'pickup', passengerId: 'pax-6', address: '12 Cedar Lane', scheduledAt: '09:18' },
  { id: 'stop-7', kind: 'pickup', passengerId: 'pax-1', address: '5 Willow Bend', scheduledAt: '09:22', label: 'Group pickup' },
  { id: 'stop-8', kind: 'final', address: 'Sunrise Care Home', scheduledAt: '09:30', label: 'Sunrise Care Home' }
];

export const CHECKLIST: ChecklistDef[] = [
  { id: 'fuel', label: 'Fuel level checked', critical: false },
  { id: 'tires', label: 'Tires inspected', critical: true },
  { id: 'lights', label: 'Lights working', critical: true },
  { id: 'brakes', label: 'Brakes checked', critical: true },
  { id: 'mirrors', label: 'Mirrors clean', critical: false },
  { id: 'firstaid', label: 'First aid kit available', critical: true },
  { id: 'ramp', label: 'Wheelchair ramp checked', critical: true },
  { id: 'clean', label: 'Vehicle clean', critical: false }
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    from: 'dispatcher',
    text: 'Heads up — minor delay reported on Maple Road. Reroute suggested via Hill St.',
    time: '11:01'
  },
  {
    id: 'm2',
    from: 'driver',
    text: 'Copy that, rerouting now. ETA still good.',
    time: '11:02'
  }
];

export type HistoryEntry = {
  id: string;
  date: string;
  weekday: string;
  routeId: string;
  routeName: string;
  stopsDone: number;
  stopsTotal: number;
  passengers: number;
  distanceKm: number;
  duration: string;
  score: number;
  incidents: number;
};

export const HISTORY: HistoryEntry[] = [
  {
    id: 'h-1',
    date: '11 Mar',
    weekday: 'Tue',
    routeId: 'RT-098',
    routeName: 'Riverside Day Centre loop',
    stopsDone: 7,
    stopsTotal: 7,
    passengers: 11,
    distanceKm: 22,
    duration: '5h 05m',
    score: 96,
    incidents: 0
  },
  {
    id: 'h-2',
    date: '10 Mar',
    weekday: 'Mon',
    routeId: 'RT-091',
    routeName: 'Westside community link',
    stopsDone: 9,
    stopsTotal: 9,
    passengers: 14,
    distanceKm: 26,
    duration: '6h 10m',
    score: 100,
    incidents: 0
  },
  {
    id: 'h-3',
    date: '07 Mar',
    weekday: 'Fri',
    routeId: 'RT-085',
    routeName: 'Sunrise Care Home loop',
    stopsDone: 5,
    stopsTotal: 6,
    passengers: 9,
    distanceKm: 17,
    duration: '4h 12m',
    score: 88,
    incidents: 1
  },
  {
    id: 'h-4',
    date: '06 Mar',
    weekday: 'Thu',
    routeId: 'RT-082',
    routeName: 'East Bristol school run',
    stopsDone: 12,
    stopsTotal: 12,
    passengers: 18,
    distanceKm: 31,
    duration: '6h 48m',
    score: 99,
    incidents: 0
  },
  {
    id: 'h-5',
    date: '05 Mar',
    weekday: 'Wed',
    routeId: 'RT-078',
    routeName: 'Hospital outpatient loop',
    stopsDone: 8,
    stopsTotal: 8,
    passengers: 12,
    distanceKm: 19,
    duration: '4h 36m',
    score: 94,
    incidents: 0
  }
];

export const passengerById = (id?: string) => PASSENGERS.find(p => p.id === id);
