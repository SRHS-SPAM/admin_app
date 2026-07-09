// 관리자용 백엔드 API 레이어 (무인증)
const API_BASE = import.meta.env.VITE_API_BASE || '';

async function request(path, { method = 'GET' } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* 본문 없음 */
  }
  if (!res.ok) {
    const message = (data && data.detail) || `요청 실패 (${res.status})`;
    throw new Error(message);
  }
  return data;
}

// 프린터 목록 (status/current_user/reservation 포함)
export const fetchPrinters = () => request('/api/printers/');

// 관리자 상태 설정 (팝업 3옵션)
export const setAvailable = (id) => request(`/api/printers/${id}/set-available/`, { method: 'POST' });
export const setUnavailable = (id) => request(`/api/printers/${id}/set-unavailable/`, { method: 'POST' });
// 예약만 취소 (사용중 상태 유지)
export const cancelReservation = (id) => request(`/api/printers/${id}/cancel-reservation/`, { method: 'POST' });

// 전체 사용 기록 (최근 7일)
export const fetchPrintLogs = () => request('/api/printer-logs/');

// 관리자 화면 표시 상태: 예약이 있으면(대기/우선권 모두) 노란 '예약'
export function statusForAdmin(printer) {
  if (printer.status === 'UNAVAILABLE') return 'unavailable';
  if (printer.reservation) return 'reserved';
  if (printer.status === 'IN_USE') return 'using';
  return 'available';
}
