import apiFetch from './api';

// GET Routes
export const getEmployees = () => apiFetch('/api/hr/employees');
export const getDepartments = () => apiFetch('/api/hr/departments');
export const getAttendance = () => apiFetch('/api/hr/attendance');
export const getLeaveRequests = () => apiFetch('/api/hr/leave-requests');
export const getStats = () => apiFetch('/api/hr/stats');

// POST Routes for Leave Approvals
// These perfectly match the routes we added to hr.py in the last step
export async function approveLeaveRequest(id) {
    return apiFetch(`/api/hr/leave-requests/${id}/approve`, { 
        method: 'POST' 
    });
}

export async function rejectLeaveRequest(id) {
    return apiFetch(`/api/hr/leave-requests/${id}/reject`, { 
        method: 'POST' 
    });
}