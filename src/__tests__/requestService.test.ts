import requestService from '@/lib/requestService';
import { RequestStatus } from '@/types';

describe('requestService', () => {
  beforeEach(() => {
    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => (key in store ? store[key] : null),
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        removeItem: (key: string) => {
          delete store[key];
        },
        clear: () => {
          store = {};
        }
      };
    })();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    requestService.clear();
  });

  test('creates and retrieves a request', () => {
    const req = requestService.createRequest('access', 'John Doe', 'john@example.com', 'details', true);
    const stored = requestService.getRequest(req.id);
    expect(stored).not.toBeNull();
    expect(stored?.requestType).toBe('access');
    expect(stored?.status).toBe('pending');
  });

  test('updates request status', () => {
    const req = requestService.createRequest('erasure', 'Jane', 'jane@example.com', 'erase', true);
    const updated = requestService.updateStatus(req.id, 'completed');
    expect(updated?.status).toBe('completed');
    const stored = requestService.getRequest(req.id);
    expect(stored?.status).toBe('completed');
  });
});
