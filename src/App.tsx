import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PhoneFrame } from './components/PhoneFrame';
import { Login } from './screens/Login';
import { TodaysAssignment } from './screens/TodaysAssignment';
import { PreTripChecklist } from './screens/PreTripChecklist';
import { RouteOverview } from './screens/RouteOverview';
import { ActiveRoute } from './screens/ActiveRoute';
import { ArrivedAtPickup } from './screens/ArrivedAtPickup';
import { PassengerBoarded } from './screens/PassengerBoarded';
import { MultiStopTimeline } from './screens/MultiStopTimeline';
import { PassengerDetails } from './screens/PassengerDetails';
import { LiveNavigation } from './screens/LiveNavigation';
import { DropoffConfirmation } from './screens/DropoffConfirmation';
import { IncidentReporting } from './screens/IncidentReporting';
import { ComplianceAlerts } from './screens/ComplianceAlerts';
import { Documents } from './screens/Documents';
import { Messages } from './screens/Messages';
import { EndRouteSummary } from './screens/EndRouteSummary';
import { ShiftComplete } from './screens/ShiftComplete';
import { Profile } from './screens/Profile';
import { RouteBlocked } from './screens/RouteBlocked';
import { DayNotes } from './screens/DayNotes';
import { AwaitingApproval } from './screens/AwaitingApproval';
import { HistoryScreen } from './screens/HistoryScreen';

export default function App() {
  const loc = useLocation();
  return (
    <PhoneFrame>
      <div key={loc.pathname} className="route-fade-enter route-fade-active" style={{ display: 'contents' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/today" element={<TodaysAssignment />} />
          <Route path="/checklist" element={<PreTripChecklist />} />
          <Route path="/overview" element={<RouteOverview />} />
          <Route path="/active" element={<ActiveRoute />} />
          <Route path="/pickup/:stopId" element={<ArrivedAtPickup />} />
          <Route path="/boarded/:stopId" element={<PassengerBoarded />} />
          <Route path="/timeline" element={<MultiStopTimeline />} />
          <Route path="/passenger/:passengerId" element={<PassengerDetails />} />
          <Route path="/navigate/:stopId" element={<LiveNavigation />} />
          <Route path="/dropoff/:stopId" element={<DropoffConfirmation />} />
          <Route path="/incident" element={<IncidentReporting />} />
          <Route path="/compliance" element={<ComplianceAlerts />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/summary" element={<EndRouteSummary />} />
          <Route path="/shift-complete" element={<ShiftComplete />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/route-blocked" element={<RouteBlocked />} />
          <Route path="/awaiting-approval" element={<AwaitingApproval />} />
          <Route path="/history" element={<HistoryScreen />} />
          <Route path="/notes" element={<DayNotes />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </PhoneFrame>
  );
}
