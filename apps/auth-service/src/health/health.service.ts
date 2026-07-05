export class HealthService {
  getHealth() {
    return {
      success: true,
      service: "auth",
      status: "healthy",
      timestamp: new Date().toISOString(),
    };
  }
}