import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
import {
  CHECKLIST,
  DRIVER,
  INITIAL_MESSAGES,
  PASSENGERS,
  ROUTE,
  STOPS,
  type ChatMessage,
  type DayNote,
  type DayNoteStage,
  type IncidentCategory,
  type Incident
} from '../data/seed';

export type StopStatus = 'upcoming' | 'current' | 'done' | 'missed';
export type CheckState = 'pass' | 'fail' | 'pending';

export type StopState = {
  id: string;
  status: StopStatus;
  completedAt?: string;
  notes?: string;
};

export type AdminOverride = { note: string; adminId: string; time: string };

type State = {
  shiftStarted: boolean;
  inspectionDone: boolean;
  inspectionItems: Record<string, CheckState>;
  inspectionFailNotes: Record<string, string>;
  signedName: string;
  routeStarted: boolean;
  routeCompleted: boolean;
  stops: StopState[];
  currentStopIndex: number;
  occupancy: number;
  incidents: Incident[];
  messages: ChatMessage[];
  dayNotes: DayNote[];
  adminOverride?: AdminOverride;
  startedAt?: string;
  endedAt?: string;
};

const initialChecklist = CHECKLIST.reduce<Record<string, CheckState>>((acc, c, i) => {
  acc[c.id] = i < 6 ? 'pass' : 'pending';
  return acc;
}, {});

const initial: State = {
  shiftStarted: false,
  inspectionDone: false,
  inspectionItems: initialChecklist,
  inspectionFailNotes: {},
  signedName: '',
  routeStarted: false,
  routeCompleted: false,
  stops: STOPS.map((s, i) => ({ id: s.id, status: i === 0 ? 'current' : 'upcoming' })),
  currentStopIndex: 0,
  occupancy: 0,
  incidents: [],
  messages: INITIAL_MESSAGES,
  dayNotes: []
};

type Action =
  | { type: 'setCheckState'; id: string; value: CheckState }
  | { type: 'setFailNote'; id: string; text: string }
  | { type: 'setSignedName'; name: string }
  | { type: 'completeInspection' }
  | { type: 'adminOverride'; note: string }
  | { type: 'startRoute' }
  | { type: 'boardPassenger'; stopId: string; passengerId?: string; notes?: string }
  | { type: 'noShow'; stopId: string }
  | { type: 'dropoff'; stopId: string; notes?: string }
  | { type: 'missedDropoff'; stopId: string }
  | { type: 'completeRoute' }
  | { type: 'reportIncident'; category: IncidentCategory; notes: string }
  | { type: 'sendMessage'; text: string }
  | { type: 'addDayNote'; text: string; stage: DayNoteStage }
  | { type: 'logout' };

const nowHHMM = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

function advance(
  stops: StopState[],
  stopId: string,
  status: StopStatus,
  completedAt: string,
  notes?: string
): { stops: StopState[]; nextIndex: number } {
  const idx = stops.findIndex(s => s.id === stopId);
  const updated = stops.map((s, i) => (i === idx ? { ...s, status, completedAt, notes } : s));
  let nextIndex = idx + 1;
  if (nextIndex < updated.length) {
    updated[nextIndex] = { ...updated[nextIndex], status: 'current' };
  } else {
    nextIndex = idx;
  }
  return { stops: updated, nextIndex };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setCheckState': {
      const items = { ...state.inspectionItems, [action.id]: action.value };
      const notes = { ...state.inspectionFailNotes };
      if (action.value !== 'fail') delete notes[action.id];
      return { ...state, inspectionItems: items, inspectionFailNotes: notes };
    }
    case 'setFailNote':
      return {
        ...state,
        inspectionFailNotes: { ...state.inspectionFailNotes, [action.id]: action.text }
      };
    case 'setSignedName':
      return { ...state, signedName: action.name };
    case 'completeInspection':
      return { ...state, inspectionDone: true, shiftStarted: true, startedAt: nowHHMM() };
    case 'adminOverride':
      return {
        ...state,
        adminOverride: { note: action.note, adminId: 'ADM-104', time: nowHHMM() },
        inspectionDone: true,
        shiftStarted: true,
        startedAt: nowHHMM()
      };
    case 'startRoute':
      return { ...state, routeStarted: true };
    case 'boardPassenger': {
      const { stops, nextIndex } = advance(state.stops, action.stopId, 'done', nowHHMM(), action.notes);
      return {
        ...state,
        stops,
        currentStopIndex: nextIndex,
        occupancy: Math.min(state.occupancy + 1, ROUTE.vehicleCapacity)
      };
    }
    case 'noShow': {
      const { stops, nextIndex } = advance(state.stops, action.stopId, 'missed', nowHHMM());
      return { ...state, stops, currentStopIndex: nextIndex };
    }
    case 'dropoff': {
      const { stops, nextIndex } = advance(state.stops, action.stopId, 'done', nowHHMM(), action.notes);
      const allDone = stops.every(s => s.status === 'done' || s.status === 'missed');
      return {
        ...state,
        stops,
        currentStopIndex: nextIndex,
        occupancy: 0,
        routeCompleted: allDone ? true : state.routeCompleted
      };
    }
    case 'missedDropoff': {
      const { stops, nextIndex } = advance(state.stops, action.stopId, 'missed', nowHHMM());
      const allDone = stops.every(s => s.status === 'done' || s.status === 'missed');
      return { ...state, stops, currentStopIndex: nextIndex, routeCompleted: allDone || state.routeCompleted };
    }
    case 'completeRoute':
      return { ...state, routeCompleted: true, endedAt: nowHHMM() };
    case 'reportIncident':
      return {
        ...state,
        incidents: [
          ...state.incidents,
          {
            id: `inc-${state.incidents.length + 1}`,
            category: action.category,
            notes: action.notes,
            reportedAt: nowHHMM()
          }
        ]
      };
    case 'sendMessage':
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: `m-${state.messages.length + 1}`, from: 'driver', text: action.text, time: nowHHMM() }
        ]
      };
    case 'addDayNote':
      return {
        ...state,
        dayNotes: [
          ...state.dayNotes,
          {
            id: `n-${state.dayNotes.length + 1}`,
            text: action.text,
            stage: action.stage,
            time: nowHHMM()
          }
        ]
      };
    case 'logout':
      return initial;
    default:
      return state;
  }
}

type Ctx = {
  state: State;
  dispatch: React.Dispatch<Action>;
  driver: typeof DRIVER;
  route: typeof ROUTE;
  passengers: typeof PASSENGERS;
  stops: typeof STOPS;
  checklist: typeof CHECKLIST;
  completedCount: number;
  percentComplete: number;
  currentStop: typeof STOPS[number] | undefined;
  inspectionPercent: number;
  inspectionEvaluated: number;
  failedCriticalIds: string[];
  failedNonCriticalIds: string[];
  failsMissingNote: string[];
  hasAnyFail: boolean;
  hasPending: boolean;
};

const RouteCtx = createContext<Ctx | null>(null);

export function RouteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);
  const value = useMemo<Ctx>(() => {
    const completedCount = state.stops.filter(s => s.status === 'done').length;
    const total = state.stops.length;
    const percentComplete = Math.round((completedCount / total) * 100);
    const currentStop = STOPS[state.currentStopIndex];
    const evaluatedItems = Object.values(state.inspectionItems).filter(v => v !== 'pending');
    const inspectionEvaluated = evaluatedItems.length;
    const inspectionPercent = Math.round((inspectionEvaluated / CHECKLIST.length) * 100);
    const failedCriticalIds = CHECKLIST.filter(
      c => c.critical && state.inspectionItems[c.id] === 'fail'
    ).map(c => c.id);
    const failedNonCriticalIds = CHECKLIST.filter(
      c => !c.critical && state.inspectionItems[c.id] === 'fail'
    ).map(c => c.id);
    const allFailedIds = [...failedCriticalIds, ...failedNonCriticalIds];
    const failsMissingNote = allFailedIds.filter(
      id => !(state.inspectionFailNotes[id] ?? '').trim()
    );
    const hasAnyFail = allFailedIds.length > 0;
    const hasPending = CHECKLIST.some(c => state.inspectionItems[c.id] === 'pending');
    return {
      state,
      dispatch,
      driver: DRIVER,
      route: ROUTE,
      passengers: PASSENGERS,
      stops: STOPS,
      checklist: CHECKLIST,
      completedCount,
      percentComplete,
      currentStop,
      inspectionEvaluated,
      inspectionPercent,
      failedCriticalIds,
      failedNonCriticalIds,
      failsMissingNote,
      hasAnyFail,
      hasPending
    };
  }, [state]);
  return <RouteCtx.Provider value={value}>{children}</RouteCtx.Provider>;
}

export function useRoute(): Ctx {
  const ctx = useContext(RouteCtx);
  if (!ctx) throw new Error('useRoute outside RouteProvider');
  return ctx;
}
