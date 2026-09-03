const SESSION_KEY = "estatehub-session";
const ACCOUNT_KEY = "estatehub-account";

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

export function saveAccount(account) {
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
}

export function getAccount() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNT_KEY)) || null;
  } catch {
    return null;
  }
}

export function startSession({ id, fullName, email, phone, role }) {
  const session = { id, fullName, email, phone, role };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function endSession() {
  localStorage.removeItem(SESSION_KEY);
}
