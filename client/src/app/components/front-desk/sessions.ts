type Session = { [key: number]: string };

function createSession(sessionNumber: number, drivers: string[]): Session {
  const session: Session = { 0: `Session ${sessionNumber}` }; // Session title
  drivers.forEach((driver, index) => {
    session[index + 1] = driver; // Assigning driver numbers 1-8
  });
  return session;
}

// Example usage:
const drivers1 = ["Driver A", "Driver B", "Driver C", "Driver D", "Driver E", "Driver F", "Driver G", "Driver H"];
const session1 = createSession(1, drivers1);

console.log(session1);
