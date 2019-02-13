export interface XxxEventConfig {
  eventId: string;
  eventActions: XxxEventAction[];
}

export interface XxxEventAction {
  action: string;
  actionData?: any;
  actionKey?: string;
}
