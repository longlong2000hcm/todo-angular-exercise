export interface Todo {
  id: number;
  name: string;
  complete: boolean;
  userUID: string | any;
  dbId?: string;
}

export function todoTypeCheck(item: any) {
  if (typeof item.id != 'number' || item.id == '') {
    return false;
  }
  if (typeof item.name != 'string' || item.name == '') {
    return false;
  }
  if (typeof item.complete != 'boolean') {
    return false;
  }
  if (typeof item.userUID != 'string' || item.userUID == '') {
    return false;
  }
  return true;
}
